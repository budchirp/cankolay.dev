import type React from 'react'

import { CenteredPage } from '@/components/vertical-page'
import { MetadataManager } from '@/lib/metadata-manager'
import { GoBack } from '@/components/utils/go-back'

import { Container } from '@trash-ui/components'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const NotFound: React.FC<ErrorProps> = (): React.ReactNode => (
  <Container className='h-full'>
    <CenteredPage items={['This', 'repo', "dosen't", 'exist!']} title={'🙈'}>
      <GoBack />
    </CenteredPage>
  </Container>
)

export const metadata: Metadata = MetadataManager.generate(
  'Repo or user not found',
  "This repo doesn't exist"
)

export default NotFound
