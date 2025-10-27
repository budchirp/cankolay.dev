import type React from 'react'

import { Column, Container, Section, Text } from '@trash-kit/ui'

const Loading: React.FC = (): React.ReactNode => (
  <Column padding='lg'>
    <Container>
      <Section title='Loading...' />
    </Container>
  </Column>
)

export default Loading
