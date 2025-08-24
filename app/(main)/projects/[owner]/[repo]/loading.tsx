import type React from 'react'

import { Column, Container, Section } from '@trash-ui/components'

const Loading: React.FC = (): React.ReactNode => (
  <Column>
    <Container>
      <Section title='Loading...' />
    </Container>
  </Column>
)

export default Loading
