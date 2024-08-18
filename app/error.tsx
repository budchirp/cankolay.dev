'use client'

import type React from 'react'

import { VerticalPage } from '@/components/vertical-page'
import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { genMetadata } from '@/lib/gen-metadata'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'Error' })

const Error: React.FC<ErrorProps> = ({ reset }: ErrorProps): React.ReactNode => {
  return (
    <Container>
      <VerticalPage items={['Something', 'went', 'wrong']} title={':('}>
        <Button onClick={reset}>Try again</Button>
      </VerticalPage>
    </Container>
  )
}

export default Error
