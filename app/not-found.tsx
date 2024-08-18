import type React from 'react'

import { VerticalPage } from '@/components/vertical-page'
import { Container } from '@/components/container'
import { GoBack } from '@/components/utils/go-back'
import { genMetadata } from '@/lib/gen-metadata'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'Page not found' })

const NotFound: React.FC<ErrorProps> = (): React.ReactNode => {
  return (
    <Container>
      <VerticalPage items={['Page', 'not', 'found']} title={'404'}>
        <GoBack />
      </VerticalPage>
    </Container>
  )
}

export default NotFound
