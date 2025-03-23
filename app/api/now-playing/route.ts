import { type NextRequest, NextResponse } from 'next/server'
import type { NowPlayingType } from '@/types/now-playing'

const getSpotifyAccessToken = async (): Promise<string> => {
  const clientID = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientID || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify Client ID, Client Secret, or Refresh Token')
  }

  const body = new URLSearchParams()
  body.append('grant_type', 'refresh_token')
  body.append('refresh_token', refreshToken)

  const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  })

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()
  return json.access_token
}

export const GET = async (request: NextRequest) => {
  try {
    const referer = request.headers.get('referer')
    if (!referer || !referer.startsWith(process.env.APP_URL || '')) {
      return NextResponse.json({ message: 'Forbidden', data: null }, { status: 403 })
    }

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${await getSpotifyAccessToken()}`
      }
    })

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ message: 'Playing nothing', data: null })
    }

    const json = await response.json()

    const totalTime = json?.item?.duration_ms
    const elapsedTime = json?.progress_ms

    const percentage = Math.min((elapsedTime / totalTime) * 100, 100)

    const data: NowPlayingType = {
      link: json?.item?.external_urls?.spotify,

      title: json?.item?.name,
      artist: json?.item?.artists.map((artist: any) => artist.name).join(', '),

      albumCover: json?.item?.album?.images[0]?.url,

      totalTime,
      elapsedTime,

      percentage,

      isPlaying: json?.is_playing
    }

    return NextResponse.json({
      message: '',
      data
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to get song details',
        details: (error as Error).message,
        data: null
      },
      { status: 500 }
    )
  }
}
