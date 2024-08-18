import type React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

export type VerticalPageProps = {
  title: React.ReactNode
  items: React.ReactNode[]
} & ComponentProps<'div'>

export const VerticalPage: React.FC<VerticalPageProps> = ({
  className,
  children,
  title,
  items,
  ...props
}: VerticalPageProps): React.ReactNode => {
  return (
    <div {...props} className={cn('h-screen_ flex flex-col justify-center gap-4', className)}>
      <h2 className='text-accent-primary text-5xl font-bold'>{title}</h2>

      <div className='grid gap-1'>
        {items.map(
          (item: React.ReactNode, index: number): React.ReactNode => (
            <h2 className='text-secondary text-2xl font-medium' key={index}>
              {item}
            </h2>
          )
        )}
      </div>

      {children && <div>{children}</div>}
    </div>
  )
}
VerticalPage.displayName = 'VerticalPage'
