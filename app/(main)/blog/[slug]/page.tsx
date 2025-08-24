import type React from 'react'

import { MetadataManager } from '@/lib/metadata-manager'
import { markdownToReact } from '@/components/markdown'
import { Book, Calendar, User } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Post } from '@/lib/post'
import Image from 'next/image'

import { Center, Column, Container, Heading, Row, Section } from '@trash-ui/components'

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
    <Column>
      <Container>
        <Section
          title={
            <Column padding='none' className='gap-4'>
              <Center className='relative aspect-video overflow-hidden w-full rounded-2xl'>
                <Image
                  className='w-full object-cover aspect-video'
                  width={640}
                  height={360}
                  alt={post.title}
                  src={post.imageUrl}
                />
              </Center>

              <Heading size='h2'>{post.title}</Heading>
            </Column>
          }
          description={
            <Column padding='none' className='gap-1'>
              <Row className='text-text-secondary gap-1 font-medium'>
                <User className='size-5' /> <p>{post.author}</p>
              </Row>
              <Row className='text-text-secondary gap-1 font-medium'>
                <Calendar className='size-5' /> <p>{post.formattedDate}</p>
              </Row>
              <Row className='text-text-secondary gap-1 font-medium'>
                <Book className='size-5' /> <p>{post.readingTime}</p>
              </Row>
            </Column>
          }
        >
          {content}
        </Section>
      </Container>
    </Column>
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
