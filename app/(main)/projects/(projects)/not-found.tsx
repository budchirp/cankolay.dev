import type React from 'react'

import { MetadataManager } from '@/lib/metadata-manager'
import { GoBack } from '@/components/utils/go-back'
import { VerticalPage } from '@/components/vertical-page'

import type { ErrorProps } from '@/types/error'
import type { Metadata } from 'next'

const NotFound: React.FC<ErrorProps> = (): React.ReactNode => (
  <VerticalPage items={["There's", 'nothing', 'to', 'see', 'here']} title={'👻'}>
    <GoBack />
  </VerticalPage>
)

export const metadata: Metadata = MetadataManager.generate(
  'No project available',
  "There's nothing to see here"
)

export default NotFound
