import type { NowPlayingType } from '@/types/now-playing'

export enum SpotifyResponse {
  TOKEN_EXPIRED = 0,
  PLAYING_NOTHING = 1,
  SUCCESS = 2
}

export class Spotify {
  public static getSpotifyAccessToken = async (
    clientID: string | null | undefined,
    clientSecret: string | null | undefined,
    refreshToken: string | null | undefined
  ): Promise<string> => {
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

  public static getNowPlaying = async (
    accessToken: string
  ): Promise<{
    response: SpotifyResponse
    data: NowPlayingType | null
  }> => {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.status === 401) {
      return {
        response: SpotifyResponse.TOKEN_EXPIRED,
        data: null
      }
    }

    if (response.status === 204 || response.status > 400) {
      return {
        response: SpotifyResponse.PLAYING_NOTHING,
        data: null
      }
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

    return {
      response: SpotifyResponse.SUCCESS,
      data
    }
  }
}
