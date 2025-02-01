import type React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

export type HeadingProps = {
  cover?: React.ReactNode
  description?: React.ReactNode
} & ComponentProps<'div'>

export const Heading: React.FC<HeadingProps> = ({
  className,
  children,
  cover,
  description,
  ...props
}: HeadingProps): React.ReactNode => (
  <div
    {...props}
    className={cn('mb-4 mt-12 grid w-full gap-1 pb-4 border-b-4 border-border-hover', className)}
  >
    {cover}

    <div className='grid gap-2'>
      <h2 className='break-all text-3xl font-bold'>{children}</h2>

      {description}
    </div>
  </div>
)
Heading.displayName = 'PageHeader'
