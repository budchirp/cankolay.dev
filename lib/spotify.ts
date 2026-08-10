import type { Song } from '@/types/song'

let accessToken: string | null = null

const getAccessToken = async (): Promise<string> => {
  const clientID = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientID || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify Client ID, Client Secret, or Refresh Token')
  }

  const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).toString()
  })

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()
  return json.access_token
}

export const getNowPlaying = async (): Promise<Song | null> => {
  if (!accessToken) {
    accessToken = await getAccessToken()
  }

  let response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (response.status === 401) {
    accessToken = await getAccessToken()
    response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

  if (response.status === 204 || response.status > 400) {
    return null
  }

  const json = await response.json()
  if (!json || !json.item) return null

  const total = json.item.duration_ms
  const elapsed = json.progress_ms
  const percentage = total ? Math.min((elapsed / total) * 100, 100) : 0

  return {
    link: json.item.external_urls?.spotify || '',
    title: json.item.name || '',
    artist: json.item.artists?.map((artist: { name: string }) => artist.name).join(', ') || '',
    image: json.item.album?.images?.[0]?.url || '',
    playback: {
      total,
      elapsed,
      percentage,
      isPlaying: Boolean(json.is_playing)
    }
  }
}
