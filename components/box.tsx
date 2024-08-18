import type React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const boxVariants = cva(['rounded-3xl'], {
  variants: {
    variant: {
      primary: 'bg-primary border border-primary',
      secondary: 'bg-secondary'
    },
    padding: {
      default: 'px-4 py-3',
      none: ''
    }
  },
  defaultVariants: {
    padding: 'default',
    variant: 'secondary'
  }
})

export type BoxProps = {} & ComponentProps<'div'> & VariantProps<typeof boxVariants>

export const Box: React.FC<BoxProps> = ({
  children,
  className,
  padding,
  variant,
  ...props
}: BoxProps): React.ReactNode => {
  return (
    <div {...props} className={cn(boxVariants({ className, padding, variant }))}>
      {children}
    </div>
  )
}
Box.displayName = 'Box'
