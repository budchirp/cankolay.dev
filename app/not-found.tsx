import type React from 'react'

import { VerticalPage } from '@/components/vertical-page'
import { MetadataManager } from '@/lib/metadata-manager'
import { Container } from '@/components/container'
import { GoBack } from '@/components/utils/go-back'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const NotFound: React.FC<ErrorProps> = (): React.ReactNode => {
  return (
    <Container>
      <VerticalPage items={['Page', 'not', 'found']} title={'404'}>
        <GoBack />
      </VerticalPage>
    </Container>
  )
}

export const metadata: Metadata = MetadataManager.generate('Page not found', '404')

export default NotFound
