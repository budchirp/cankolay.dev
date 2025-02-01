import type React from 'react'

import { Post } from '@/lib/post'
import { MetadataManager } from '@/lib/metadata-manager'
import { Heading } from '@/components/heading'
import { Book, Calendar, User } from 'lucide-react'
import { markdownToReact } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import type { DynamicPageProps } from '@/types/page'
import type { BlogPost } from '@/types/post'
import type { Metadata } from 'next'

const Page: React.FC<DynamicPageProps> = async ({ params }: DynamicPageProps) => {
  const { slug } = await params

  const post = await new Post().get(slug)
  if (!post) {
    notFound()
  }

  const content = await markdownToReact(post.body)

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
          <div className='grid gap-1'>
            <span className='text-text-secondary flex items-center gap-1 font-medium'>
              <User className='size-5' /> <p>{post.author}</p>
            </span>
            <span className='text-text-secondary flex items-center gap-1 font-medium'>
              <Calendar className='size-5' /> <p>{post.formattedDate}</p>
            </span>
            <span className='text-text-secondary flex items-center gap-1 font-medium'>
              <Book className='size-5' /> <p>{post.readingTime}</p>
            </span>
          </div>
        }
      >
        {post.title}
      </Heading>

      {content}
    </>
  )
}

export const generateMetadata = async ({ params }: DynamicPageProps): Promise<Metadata> => {
  const { slug } = await params

  const post = await new Post().get(slug)
  if (!post) {
    notFound()
  }

  return MetadataManager.generate(`${post.title} - Blog`, post.description, {
    openGraph: {
      type: 'article',
      publishedTime: post.date.toISOString(),
      images: [
        {
          url: post.imageUrl
        }
      ]
    }
  })
}

export const generateStaticParams = async (): Promise<{ [key: string]: any }[]> => {
  const posts = await new Post().getAll()
  return posts.map((post: BlogPost) => ({ slug: post.slug }))
}

export default Page
