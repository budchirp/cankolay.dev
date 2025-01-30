import type React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

export type InputProps = {
  icon: React.ReactNode
  label?: React.ReactNode
} & ComponentProps<'input'>

export const Input: React.FC<InputProps> = ({
  className,
  label,
  id,
  icon,
  ...props
}: InputProps): React.ReactNode => (
  <div className='flex h-min w-full flex-col items-center gap-1'>
    <label htmlFor={id}>{label}</label>

    <div className='relative flex h-10 w-full items-center rounded-3xl'>
      <div className='absolute inset-y-0 left-0 flex h-10 w-10 items-center justify-center bg-transparent pl-2 text-3xl'>
        {icon}
      </div>

      <input
        {...props}
        className={cn(
          'bg-background-primary text-text-primary placeholder-text-tertiary border-border focus:border-hover flex h-full w-full items-center rounded-3xl border py-2 pl-11 pr-4 transition duration-300',
          className
        )}
      />
    </div>
  </div>
)
Input.displayName = 'Input'
