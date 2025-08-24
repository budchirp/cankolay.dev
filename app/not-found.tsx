import type React from 'react'

import { CenteredPage } from '@/components/vertical-page'
import { MetadataManager } from '@/lib/metadata-manager'
import { GoBack } from '@/components/utils/go-back'

import { Container } from '@trash-ui/components'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const NotFound: React.FC<ErrorProps> = (): React.ReactNode => {
  return (
    <Container className='h-full'>
      <CenteredPage items={['Page', 'not', 'found']} title={'404'}>
        <GoBack />
      </CenteredPage>
    </Container>
  )
}

export const metadata: Metadata = MetadataManager.generate('Page not found', '404')

export default NotFound
