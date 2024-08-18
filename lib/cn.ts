import { twMerge } from 'tailwind-merge'

export const cn = (...classnames: (string | null | undefined)[]): string => {
  return twMerge(classnames.join(' '))
}
