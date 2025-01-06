import { NextResponse, type NextRequest } from 'next/server'
import { parseLRC } from '@/lib/lyrics'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export const POST = async (request: NextRequest) => {
  try {
    const referer = request.headers.get('referer')
    if (!referer || !referer.startsWith(process.env.APP_URL || '')) {
      return NextResponse.json({ message: 'Forbidden', data: null }, { status: 403 })
    }

    let { song } = await request.json()
    if (!song) {
      throw new Error('`song` is null')
    }

    if (!/^[a-zA-Z0-9 _-]+$/.test(song)) {
      throw new Error('Invalid song name')
    }

    song = song.replace(/\s*(-\s*remastered|\(remastered\))$/i, '').trim()

    const { stdout, stderr } = await execAsync(
      `syncedlyrics "${song.replace(/(["'$`\\])/g, '\\$1')}" -o /dev/null`
    )

    if (stderr) {
      throw new Error()
    }

    if (!stderr && stdout) {
      const lyrics = parseLRC(stdout)

      return NextResponse.json({
        message: '',
        data: lyrics
      })
    }

    throw new Error()
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to get lyrics',
        details: (error as Error).message,
        data: null
      },
      { status: 500 }
    )
  }
}
