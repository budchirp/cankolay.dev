export type Song = {
  link: string

  title: string
  artist: string

  image: string

  playback: {
    total: number
    elapsed: number

    percentage: number

    isPlaying: boolean
  }
}
