import type React from 'react'

import { MetadataManager } from '@/lib/metadata-manager'
import { notFound, redirect } from 'next/navigation'
import { Calendar, Search } from 'lucide-react'
import { Hourglass } from '@/lib/hourglass'
import CONSTANTS from '@/lib/constants'
import MiniSearch from 'minisearch'
import { Post } from '@/lib/post'
import Image from 'next/image'
import Link from 'next/link'

import {
  cn,
  Box,
  BoxContent,
  Button,
  Column,
  Container,
  Divider,
  Heading,
  Input,
  Row,
  Section,
  Text,
  Grid,
  Center
} from '@trash-kit/ui'

import type { DynamicPageProps } from '@/types/page'
import type { BlogPost } from '@/types/post'
import type { Metadata } from 'next'

const Page: React.FC<DynamicPageProps> = async ({ searchParams }: DynamicPageProps) => {
  const { search, page: _page }: { search?: string; page?: string } = await searchParams

  const post = new Post()
  const allPosts = await post.getAll()

  let posts: BlogPost[]

  const searchText = decodeURIComponent(search || '')
  if (searchText) {
    if (allPosts.length > 0) {
      const miniSearch = new MiniSearch({
        fields: ['title', 'description'],
        storeFields: Object.keys(allPosts[0])
      })
      miniSearch.addAll(allPosts)

      posts = miniSearch.search(searchText) as any[] as BlogPost[]
    } else {
      posts = []
    }
  } else {
    posts = allPosts
  }

  const requestedPage = Number(_page || 0) || 0
  const { posts: paginatedPosts, page, total } = await new Post().paginate(posts, requestedPage)

  if (requestedPage < 0 || (requestedPage > total && posts.length > 0)) {
    notFound()
  }

  posts = paginatedPosts

  const prevDisabled = page === 0
  const nextDisabled = page === total

  return (
    <Column>
      <Section>
        <Container>
          <Section title='Posts'>
            <Column className='gap-4'>
              <form
                action={async (form: FormData): Promise<void> => {
                  'use server'

                  redirect(
                    `/blog?search=${encodeURIComponent((form.get('search') as string) || '')}`
                  )
                }}
              >
                <Input
                  defaultValue={searchText || ''}
                  id='search'
                  type='text'
                  name='search'
                  icons={{
                    leading: <Search />
                  }}
                  placeholder='Search posts...'
                />

                <input type='submit' hidden />
              </form>

              {posts.length > 0 ? (
                <>
                  <Grid>
                    {posts.map((post) => (
                      <article key={post.slug}>
                        <Link aria-label='Go to the blog post' href={`/blog/${post.slug}`}>
                          <Box>
                            <Center className='relative aspect-video w-full overflow-hidden'>
                              <Image
                                className='aspect-video object-cover transition duration-500 ease-out hover:scale-125'
                                width={640}
                                height={360}
                                alt={post.title}
                                src={post.image}
                              />
                            </Center>

                            <Divider />

                            <BoxContent>
                              <Column className='gap-1'>
                                <Row className='gap-1 text-content-secondary'>
                                  <Calendar className='mr-1 size-4 text-xs' />
                                  <p className='text-sm font-medium'>
                                    {Hourglass.formatDate(post.date)}
                                  </p>
                                </Row>

                                <Column>
                                  <Heading size='h2'>{post.title}</Heading>
                                  <Text className='text-content-secondary'>{post.description}</Text>
                                </Column>
                              </Column>
                            </BoxContent>

                            <Divider />

                            <BoxContent>
                              <Button className='w-full'>Read more</Button>
                            </BoxContent>
                          </Box>
                        </Link>
                      </article>
                    ))}
                  </Grid>

                  <Row className='justify-between'>
                    <Link
                      className={cn(
                        'text-lg font-bold transition duration-300',
                        prevDisabled
                          ? 'text-content-tertiary pointer-events-none'
                          : 'text-content-primary hover:text-content-secondary'
                      )}
                      aria-disabled={prevDisabled}
                      aria-label='Previous page'
                      href={`/blog?${searchText ? `search=${encodeURIComponent(searchText)}&` : ''}page=${
                        !prevDisabled ? page - 1 : page
                      }`}
                    >
                      Prev
                    </Link>

                    <Text className='font-medium'>
                      page {page + 1} out of {total + 1}
                    </Text>

                    <Link
                      className={cn(
                        'text-lg font-bold transition duration-300',
                        nextDisabled
                          ? 'text-content-tertiary pointer-events-none'
                          : 'text-content-primary hover:text-content-secondary'
                      )}
                      aria-disabled={nextDisabled}
                      aria-label='Next page'
                      href={`/blog?${searchText ? `search=${encodeURIComponent(searchText)}&` : ''}page=${
                        !nextDisabled ? page + 1 : page
                      }`}
                    >
                      Next
                    </Link>
                  </Row>
                </>
              ) : (
                <Heading size='h2'>Nothing to see here</Heading>
              )}
            </Column>
          </Section>
        </Container>
      </Section>
    </Column>
  )
}

export const metadata: Metadata = MetadataManager.generate('Blog', `${CONSTANTS.NAME}'s blog`)

export default Page
