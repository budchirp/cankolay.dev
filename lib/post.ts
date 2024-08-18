import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import type { BlogPost, PostBody, RawPost } from '@/types/post'

export class Post {
  static path: string = process.cwd() + '/posts'

  async getAll(): Promise<BlogPost[] | []> {
    const postFiles: string[] = await fs.readdir(Post.path)

    const posts: BlogPost[] = await Promise.all(
      postFiles
        .filter(
          (file: string): boolean => path.extname(file) === '.md' || path.extname(file) === '.mdx'
        )
        .sort((a: string, b: string): number => a.localeCompare(b, 'en', { numeric: true }))
        .map(async (file: string): Promise<BlogPost> => {
          const fileContent: string = await fs.readFile(Post.path + '/' + file, 'utf-8')

          const { data: metaData, content }: { data: RawPost; content: PostBody } = matter(
            fileContent
          ) as any

          let formattedDate: string

          const date: Date = new Date(metaData.date)
          const yyyy: number = date.getFullYear()
          const mm: number = date.getMonth()
          const dd: number = date.getDay()

          formattedDate = `${dd < 10 ? `0${dd}` : dd}/${mm < 10 ? `0${mm}` : mm}/${yyyy}`

          const newMetaData: Omit<BlogPost, 'body'> = {
            ...metaData,
            id: metaData.slug,
            tags: metaData.tags.split(', '),
            readingTime: readingTime(content).text,
            date,
            formattedDate
          }

          return { ...newMetaData, body: content } as BlogPost
        })
    )

    return (
      posts.sort((a: BlogPost, b: BlogPost): number => a.date.getTime() - b.date.getTime()) || []
    )
  }

  async paginate(
    posts: BlogPost[],
    page = 0,
    limit = 10
  ): Promise<{ posts: BlogPost[] | []; page: number; totalPages: number }> {
    const totalPages: number = Math.ceil(posts.length / limit) - 1 || 0

    if (typeof page !== 'number' || page > totalPages || page < 0) {
      return { posts: [], page: 0, totalPages: 0 }
    }

    return {
      posts: posts.slice(limit * page, limit * page + limit),
      page,
      totalPages
    }
  }

  async getBySlug(slug: string): Promise<BlogPost | null> {
    const posts: BlogPost[] | null = await this.getAll()

    return posts.find((post: BlogPost): boolean => post.slug == slug) as BlogPost
  }
}
