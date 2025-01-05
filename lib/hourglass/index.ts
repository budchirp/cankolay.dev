export class Hourglass {
  public static formatTime(milliseconds?: number): string {
    if (!milliseconds) return '00:00'

    const seconds = Math.floor(milliseconds / 1000)

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  public static formatDate(date: string | Date): string | null {
    if (!date) return null

    const _date = typeof date === 'string' ? new Date(date) : date

    const yyyy = _date.getFullYear()
    const mm = _date.getMonth()
    const dd = _date.getDay()

    return `${dd < 10 ? `0${dd}` : dd}/${mm < 10 ? `0${mm}` : mm}/${yyyy}`
  }
}
