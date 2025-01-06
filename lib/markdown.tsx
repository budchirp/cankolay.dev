import type React from 'react'

import { components } from '@/components/mdx'
import { compileMDX } from 'next-mdx-remote/rsc'

import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight
} from '@shikijs/transformers'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeShiki from '@shikijs/rehype'

export const markdownToReact = async (text: string): Promise<React.ReactNode> => {
  'use server'

  const { content } = await compileMDX({
    source: text,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, [remarkToc, { heading: 'Table of Contents' }]],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [
            rehypeShiki,
            {
              themes: {
                light: 'github-light-default',
                dark: 'github-dark-default'
              },
              transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationFocus(),
                transformerNotationErrorLevel()
              ]
            }
          ]
        ]
      }
    }
  })

  return (
    <article className='prose dark:prose-dark mx-auto !max-w-full !w-[90vw]'>{content}</article>
  )
}
