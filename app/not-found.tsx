import type React from 'react'

import { CenteredPage } from '@/components/centered-page'
import { MetadataManager } from '@/lib/metadata-manager'
import { GoBack } from '@/components/utils/go-back'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const NotFound: React.FC<ErrorProps> = (): React.ReactNode => (
  <CenteredPage items={['Page', 'not', 'found']} title={'404'}>
    <GoBack />
  </CenteredPage>
)

export const metadata: Metadata = MetadataManager.generate('404', 'Page not found')

export default NotFound
