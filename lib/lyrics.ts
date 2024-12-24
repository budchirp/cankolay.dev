import type { LyricsType } from '@/types/lyrics'

export const parseLRC = (content: string): LyricsType[] => {
  const lyrics: LyricsType[] = []
  const lyricsRegex = /^\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.+)$/

  const lines = content.split(/\r?\n/)

  for (const line of lines) {
    const match = line.match(lyricsRegex)
    if (match) {
      const minutes = Number.parseInt(match[1], 10)
      const seconds = Number.parseInt(match[2], 10)
      const milliseconds = match[3] ? Number.parseInt(match[3].padEnd(3, '0'), 10) : 0

      const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds
      const text = match[4].trim()

      lyrics.push({ time, text })
    }
  }

  return lyrics
}
