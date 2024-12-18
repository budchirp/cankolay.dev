import type React from 'react'

import { components } from '@/components/mdx'
import { genMetadata } from '@/lib/gen-metadata'
import { Post } from '@/lib/post'
import { Heading } from '@/components/heading'
import { Book, Calendar, User } from 'lucide-react'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

import type { DynamicPageProps } from '@/types/page'
import type { BlogPost } from '@/types/post'
import type { Metadata } from 'next'

export const generateMetadata = async ({ params }: DynamicPageProps): Promise<Metadata> => {
  const post = await new Post().getBySlug((await params).slug)
  if (!post) {
    notFound()
  }

  return genMetadata({
    title: `${post.title} - Blog`,
    description: post.description,
    other: {
      openGraph: {
        type: 'article',
        publishedTime: post.date.toISOString(),
        images: [
          {
            url: post.imageUrl
          }
        ]
      }
    }
  })
}

const Page: React.FC<DynamicPageProps> = async ({ params }: DynamicPageProps) => {
  const post = await new Post().getBySlug((await params).slug)
  if (!post) {
    notFound()
  }

  const { content } = await compileMDX({
    source: post.body,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        remarkPlugins: [remarkGfm, [remarkToc, { tight: true, ordered: true }]]
      }
    }
  })

  return (
    <>
      <Heading
        cover={
          <div className='relative flex h-min max-h-96 w-full items-center justify-center overflow-hidden rounded-2xl mb-2'>
            <Image
              className='w-full h-auto object-cover aspect-video'
              width={640}
              height={360}
              sizes='100vw'
              alt={post.title}
              src={post.imageUrl}
            />
          </div>
        }
        description={
          <div>
            <span className='text-secondary flex items-center gap-1 font-medium'>
              <User className='h-4 w-4' /> <p>{post.author}</p>
            </span>
            <span className='text-secondary flex items-center gap-1 font-medium'>
              <Calendar className='h-4 w-4' /> <p>{post.formattedDate}</p>
            </span>
            <span className='text-secondary flex items-center gap-1 font-medium'>
              <Book className='h-4 w-4' /> <p>{post.readingTime}</p>
            </span>
          </div>
        }
      >
        {post.title}
      </Heading>

      <article className='prose dark:prose-dark !max-w-full'>{content}</article>
    </>
  )
}

export const generateStaticParams = async (): Promise<{ [key: string]: any }[]> => {
  const posts = await new Post().getAll()
  return posts.map((post: BlogPost) => ({ slug: post.slug }))
}

export default Page
