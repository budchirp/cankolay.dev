import type { Metadata } from 'next'

export class MetadataManager {
  public static generate(title: string, description: string, rest?: Metadata): Metadata {
    const { openGraph, twitter, ...restMetadata } = rest || {}

    return {
      title,
      description,

      twitter: {
        title,
        description,
        ...twitter
      },

      openGraph: {
        title,
        description,
        ...openGraph
      },

      ...restMetadata,
      ...rest
    }
  }
}
