'use client'

import type React from 'react'

import { CenteredPage } from '@/components/vertical-page'
import { MetadataManager } from '@/lib/metadata-manager'

import { Button, Container } from '@trash-ui/components'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const Error: React.FC<ErrorProps> = ({ reset }: ErrorProps): React.ReactNode => {
  return (
    <Container className='h-full'>
      <CenteredPage items={['Something', 'went', 'wrong']} title={':('}>
        <Button onClick={reset}>Try again</Button>
      </CenteredPage>
    </Container>
  )
}

export const metadata: Metadata = MetadataManager.generate('Error', 'Something went wrong')

export default Error
