'use client'

import type React from 'react'

import { VerticalPage } from '@/components/vertical-page'
import { MetadataManager } from '@/lib/metadata-manager'
import { Container } from '@/components/container'
import { Button } from '@/components/button'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const Error: React.FC<ErrorProps> = ({ reset }: ErrorProps): React.ReactNode => {
  return (
    <Container>
      <VerticalPage items={['Something', 'went', 'wrong']} title={':('}>
        <Button onClick={reset}>Try again</Button>
      </VerticalPage>
    </Container>
  )
}

export const metadata: Metadata = MetadataManager.generate('Error', 'Something went wrong')

export default Error
