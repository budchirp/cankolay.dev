import data from '@/data'

import type { Metadata } from 'next'

type GenMetadataProps = {
  title: string
  description?: string
  other?: Metadata
}

export const genMetadata = ({ title, description, other }: GenMetadataProps): Metadata => {
  const { openGraph, twitter, ...rest } = other ?? { openGraph: {} }

  return {
    title,
    description: description || data.description,
    twitter: {
      title,
      description: description || data.description,
      ...twitter
    },
    openGraph: {
      title,
      description: description || data.description,
      ...openGraph
    },
    ...rest
  }
}
