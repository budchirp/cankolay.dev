import type React from 'react'
import type { ComponentProps } from 'react'

import { Column, Heading, cn } from '@trash-ui/components'

export type VerticalPageProps = {
  title: React.ReactNode
  items: React.ReactNode[]
} & ComponentProps<'div'>

export const CenteredPage: React.FC<VerticalPageProps> = ({
  className,
  children,
  title,
  items,
  ...props
}: VerticalPageProps): React.ReactNode => (
  <Column {...props} className={cn('size-full justify-center gap-4', className)}>
    <Heading color='accent' size='h1'>
      {title}
    </Heading>

    <Column padding='none' className='gap-1'>
      {items.map((item, index) => (
        <h2 className='text-text-secondary text-2xl font-medium' key={index}>
          {item}
        </h2>
      ))}
    </Column>

    {children && <div>{children}</div>}
  </Column>
)
CenteredPage.displayName = 'VerticalPage'
