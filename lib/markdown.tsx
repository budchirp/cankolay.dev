import type React from 'react'

import { components } from '@/components/mdx'
import { compileMDX } from 'next-mdx-remote/rsc'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

export const markdownToReact = async (text: string): Promise<React.ReactNode> => {
  const { content } = await compileMDX({
    source: text,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, [remarkToc, { heading: 'Table of Contents' }]],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
      }
    }
  })

  return <article className='prose dark:prose-dark !max-w-full'>{content}</article>
}
