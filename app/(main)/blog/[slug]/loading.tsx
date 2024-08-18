import type React from 'react'

import { genMetadata } from '@/lib/gen-metadata'
import { Heading } from '@/components/heading'

import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'Loading the post...' })

const Loading: React.FC = (): React.ReactNode => {
  return <Heading>Loading...</Heading>
}

export default Loading
