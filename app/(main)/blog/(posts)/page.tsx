import type React from 'react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Box } from '@/components/box'
import { genMetadata } from '@/lib/gen-metadata'
import { Post } from '@/lib/post'
import { cn } from '@/lib/cn'
import { Calendar, Search } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import MiniSearch from 'minisearch'

import type { DynamicPageProps } from '@/types/page'
import type { BlogPost } from '@/types/post'
import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'Blog' })

const Page: React.FC<DynamicPageProps> = async ({
  searchParams: _searchParams
}: DynamicPageProps): Promise<JSX.Element> => {
  const post = new Post()
  const allPosts = await post.getAll()

  let posts: BlogPost[] = []

  const searchParams = await _searchParams
  const searchText = decodeURIComponent(searchParams.search || '')
  if (searchText) {
    const miniSearch = new MiniSearch({
      fields: ['title', 'description', 'tags'],
      storeFields: Object.keys(allPosts[0])
    })
    miniSearch.addAll(allPosts)

    posts = miniSearch.search(searchText) as any[] as BlogPost[]
  } else {
    posts = allPosts
  }

  const {
    posts: paginatedPosts,
    page,
    totalPages
  } = await new Post().paginate(posts, Number(searchParams?.page || 0) || 0)
  posts = paginatedPosts

  if (!posts || posts.length < 1) {
    notFound()
  }

  const prevDisabled = page === 0
  const nextDisabled = page === totalPages

  const search = async (formData: FormData): Promise<void> => {
    'use server'

    redirect(`/blog?search=${encodeURIComponent((formData.get('search') as string) || '')}`)
  }

  return (
    <div className='grid gap-4'>
      <form action={search}>
        <Input
          defaultValue={searchText || ''}
          id='search'
          type='text'
          name='search'
          icon={<Search />}
          placeholder='Search posts...'
        />
        <input type='submit' hidden />
      </form>

      <div className='masonry'>
        {posts.map((post) => (
          <article key={post.slug}>
            <Box className='relative mb-4 h-min overflow-hidden last:mb-0' padding='none'>
              <div className='border-primary relative flex h-min max-h-48 w-full items-center justify-center overflow-hidden rounded-t-2xl border-b md:max-h-64'>
                <Link aria-label='Go to the blog post' href={`/blog/${post.slug}`}>
                  <img
                    className='w-full object-cover transition duration-500 ease-out hover:scale-125'
                    alt={post.title}
                    src={post.imageUrl}
                  />
                </Link>
              </div>

              <div className='grid w-full gap-2 p-4'>
                <div>
                  <div className='flex items-center'>
                    <Calendar className='mr-1 h-4 w-4 text-xs' />
                    <p className='text-secondary text-sm font-medium'>{post.formattedDate}</p>
                  </div>

                  <Link href='/blog/[slug]' as={`/blog/${post.slug}`}>
                    <h1 className='hover:text-secondary break-all text-xl font-bold transition duration-300'>
                      {post.title}
                    </h1>
                  </Link>

                  <p className='text-secondary'>{post.description}</p>
                </div>

                <Link aria-label='Go to the blog post' href={`/blog/${post.slug}`}>
                  <Button className='w-full'>Read more</Button>
                </Link>
              </div>
            </Box>
          </article>
        ))}
      </div>

      <div className='flex h-min w-full items-center justify-between gap-1'>
        <Link
          className={cn(
            'text-lg font-bold transition duration-300',
            nextDisabled ? 'text-tertiary' : 'text-primary hover:text-secondary'
          )}
          aria-disabled={prevDisabled}
          aria-label='Previous page'
          href={`/blog?${searchText ? `search=${searchText}&` : ''}page=${
            !prevDisabled ? page - 1 : page
          }`}
        >
          Prev
        </Link>

        <span className='font-medium'>
          page {page + 1} out of {totalPages + 1}
        </span>

        <Link
          className={cn(
            'text-lg font-bold transition duration-300',
            nextDisabled ? 'text-tertiary' : 'text-primary hover:text-secondary'
          )}
          aria-disabled={nextDisabled}
          aria-label='Next page'
          href={`/blog?${searchText ? `search=${searchText}&` : ''}page=${
            !nextDisabled ? page + 1 : page
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  )
}

export default Page
