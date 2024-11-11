import { twMerge } from 'tailwind-merge'

export const cn = (...classnames: (string | boolean | null | undefined)[]): string => {
  return twMerge(classnames.filter(Boolean).join(' '))
}
