'use client'

import type React from 'react'

import { CenteredPage } from '@/components/centered-page'
import { MetadataManager } from '@/lib/metadata-manager'

import { Button } from '@trash-kit/ui'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const Error: React.FC<ErrorProps> = ({ reset }: ErrorProps): React.ReactNode => (
  <CenteredPage items={['Something', 'went', 'wrong']} title={':('}>
    <Button onClick={reset}>Try again</Button>
  </CenteredPage>
)

export const metadata: Metadata = MetadataManager.generate(':(', 'Something went wrong')

export default Error
