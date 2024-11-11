export const formatTime = (milliseconds: number | undefined | null): string => {
  if (!milliseconds) return '00:00'

  const seconds = Math.floor(milliseconds / 1000)

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
