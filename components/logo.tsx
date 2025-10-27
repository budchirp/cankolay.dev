import type React from 'react'
import type { ComponentProps } from 'react'

import CONSTANTS from '@/lib/constants'
import { cn } from '@trash-kit/ui'
import Link from 'next/link'

export type LogoProps = Omit<ComponentProps<'h1'>, 'children'>

export const Logo: React.FC<LogoProps> = ({ className, ...props }: LogoProps): React.ReactNode => {
  const label = `${CONSTANTS.USERNAME} logo`

  return (
    <Link href='/' aria-label={label}>
      <h1
        {...props}
        aria-label={label}
        className={cn(
          'text-primary flex h-full items-center justify-center text-2xl font-bold',
          className
        )}
      >
        {CONSTANTS.USERNAME}
      </h1>
    </Link>
  )
}
Logo.displayName = 'Logo'
