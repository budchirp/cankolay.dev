import { type NextRequest, NextResponse } from 'next/server'
import { Spotify, SpotifyResponse } from '@/lib/spotify'
import CONSTANTS from '@/lib/constants'

let accessToken: string | null = null

const getAccessToken = async () => {
  return await Spotify.getSpotifyAccessToken(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET,
    process.env.SPOTIFY_REFRESH_TOKEN
  )
}

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const referer = request.headers.get('referer')
    if (!referer || !referer.startsWith(CONSTANTS.APP_URL)) {
      return NextResponse.json({ message: 'Forbidden', data: null }, { status: 403 })
    }

    if (!accessToken) {
      accessToken = await getAccessToken()
    }

    const { response, data } = await Spotify.getNowPlaying(accessToken)

    switch (response) {
      case SpotifyResponse.TOKEN_EXPIRED:
        accessToken = await getAccessToken()
        break

      case SpotifyResponse.PLAYING_NOTHING:
        return NextResponse.json({
          message: 'Playing nothing',
          data: null
        })

      case SpotifyResponse.SUCCESS:
        return NextResponse.json({
          message: 'Success',
          data
        })
    }

    return NextResponse.json(
      {
        message: 'Unknown error',
        data: null
      },
      { status: 500 }
    )
  } catch (error) {
    console.error(error)

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
