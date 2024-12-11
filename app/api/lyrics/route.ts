import { parseLRC } from '@/lib/lrc'
import { exec } from 'child_process'
import { promisify } from 'util'
import { NextResponse, type NextRequest } from 'next/server'

const execAsync = promisify(exec)

export const POST = async (request: NextRequest) => {
  try {
    const referer = request.headers.get('referer')
    if (!referer || !referer.startsWith(process.env.APP_URL || '')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { song } = body
    if (!song) {
      throw new Error('`song` is null')
    }

    if (!/^[a-zA-Z0-9 _-]+$/.test(song)) {
      throw new Error('Invalid song name');
    }

    const { stdout, stderr } = await execAsync(`syncedlyrics "${song.replace(/(["'$`\\])/g, '\\$1')}" -o /dev/null`)

    if (stderr) {
      throw new Error(stderr.toString())
    }

    if (stdout) {
      const lyrics = parseLRC(stdout)

      return NextResponse.json(lyrics)
    }

    throw new Error('No output received from syncedlyrics')
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    )
  }
}

