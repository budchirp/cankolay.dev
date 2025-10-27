import type React from 'react'

import { CenteredPage } from '@/components/centered-page'
import { MetadataManager } from '@/lib/metadata-manager'
import { GoBack } from '@/components/utils/go-back'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const NotFound: React.FC<ErrorProps> = (): React.ReactNode => (
  <CenteredPage items={['This', 'repo', "dosen't", 'exist!']} title={'🙈'}>
    <GoBack />
  </CenteredPage>
)

export const metadata: Metadata = MetadataManager.generate('Repo or user not found')

export default NotFound
