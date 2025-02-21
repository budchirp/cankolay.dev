import type React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  [
    'flex ease-out disabled:opacity-75 dark:disabled:opacity-50 disabled:animate-pulse active:scale-95 cursor-pointer items-center justify-center font-medium transition duration-300'
  ],
  {
    variants: {
      variant: {
        default: 'rounded-2xl px-5 py-1',
        round: 'size-10 rounded-full p-2 text-2xl'
      },
      color: {
        primary:
          'bg-accent-600 border border-transparent text-gray-50 hover:bg-accent-700 hover:text-gray-100 disabled:text-gray-200',
        secondary:
          'bg-background-primary border border-border hover:bg-background-secondary hover:border-border-hover disabled:text-text-secondary text-text-primary hover:text-text-secondary'
      }
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary'
    }
  }
)

export type ButtonProps = {
  children?: React.ReactNode
  loading?: boolean
} & ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  className,
  variant,
  color,
  ...props
}: ButtonProps): React.ReactNode => {
  if (!children) loading = true

  return (
    <button {...props} className={cn(buttonVariants({ className, variant, color }))}>
      {loading && <Loader2 className={cn('animate-spin text-xs', children ? 'mr-2' : '')} />}
      {children ?? ''}
    </button>
  )
}
Button.displayName = 'Button'
