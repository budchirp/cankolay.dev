import type React from 'react'

import { GoBack } from '@/components/utils/go-back'
import { MetadataManager } from '@/lib/metadata-manager'
import { VerticalPage } from '@/components/vertical-page'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const NotFound: React.FC<ErrorProps> = (): React.ReactNode => (
  <VerticalPage items={['This', 'repo', "dosen't", 'exist!']} title={'🙈'}>
    <GoBack />
  </VerticalPage>
)

export const metadata: Metadata = MetadataManager.generate(
  'Repo or user not found',
  "This repo doesn't exist"
)

export default NotFound
