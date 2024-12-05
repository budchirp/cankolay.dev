import type React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

export type ContainerProps = {} & ComponentProps<'div'>

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}: ContainerProps): React.ReactNode => {
  return (
    <div
      {...props}
      className={cn(
        'mx-auto w-11/12 px-2 md:max-w-screen-md lg:px-8 lg:max-w-screen-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
Container.displayName = 'Container'
