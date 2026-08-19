import type React from 'react'

import { Column, Container, Section } from '@trash-kit/ui'

const Loading: React.FC = (): React.ReactNode => (
  <Column>
    <Section>
      <Container>
        <Section title='Loading...' />
      </Container>
    </Section>
  </Column>
)

export default Loading
