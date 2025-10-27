import type React from 'react'
import type { ComponentProps } from 'react'

import { Column, Container, Heading, cn } from '@trash-kit/ui'

export type CenteredPageProps = {
  title: React.ReactNode
  items: React.ReactNode[]
} & ComponentProps<'div'>

export const CenteredPage: React.FC<CenteredPageProps> = ({
  children,
  title,
  items,
  ...props
}: CenteredPageProps): React.ReactNode => (
  <Container className='h-screen_'>
    <Column {...props} className={'justify-center h-full'}>
      <Heading color='accent' size='h1'>
        {title}
      </Heading>

      <Column className='gap-1'>
        {items.map((item, index) => (
          <h2 className='text-secondary text-2xl font-medium' key={index}>
            {item}
          </h2>
        ))}
      </Column>

      {children && <div>{children}</div>}
    </Column>
  </Container>
)
CenteredPage.displayName = 'VerticalPage'
