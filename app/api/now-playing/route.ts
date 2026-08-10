import { type NextRequest, NextResponse } from 'next/server'
import { getNowPlaying } from '@/lib/spotify'
import CONSTANTS from '@/lib/constants'

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const referer = request.headers.get('referer')
    if (!referer || !referer.startsWith(CONSTANTS.APP_URL)) {
      return NextResponse.json({ message: 'Forbidden', data: null }, { status: 403 })
    }

    const song = await getNowPlaying()

    if (!song) {
      return NextResponse.json({
        message: 'Playing nothing',
        data: null
      })
    }

    return NextResponse.json({
      message: 'Success',
      data: song
    })
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
