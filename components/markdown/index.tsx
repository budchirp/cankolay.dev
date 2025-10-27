import type React from 'react'

import { components } from '@/components/markdown/components'
import { compileMDX } from 'next-mdx-remote/rsc'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const markdownToReact = async (text: string): Promise<React.ReactNode> => {
  'use server'

  const { content } = await compileMDX({
    source: text,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
      }
    }
  })

  return (
    <article className='prose dark:prose-dark mx-auto max-w-full! w-[90vw]!'>{content}</article>
  )
}
