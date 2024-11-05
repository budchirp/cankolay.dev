import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import type { BlogPost } from '@/types/post'

export class Post {
  static path = `${process.cwd()}/posts`

  async getAll(): Promise<BlogPost[] | []> {
    const postFiles = await fs.readdir(Post.path)

    const posts: BlogPost[] = await Promise.all(
      postFiles
        .filter((file) => path.extname(file) === '.md' || path.extname(file) === '.mdx')
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
        .map(async (file) => {
          const { data: metaData, content } = matter(
            await fs.readFile(`${Post.path}/${file}`, 'utf-8')
          ) as any

          const date = new Date(metaData.date)
          const yyyy = date.getFullYear()
          const mm = date.getMonth()
          const dd = date.getDay()

          const newMetaData: Omit<BlogPost, 'body'> = {
            ...metaData,
            id: metaData.slug,
            tags: metaData.tags.split(', '),
            readingTime: readingTime(content).text,
            date,
            formattedDate: `${dd < 10 ? `0${dd}` : dd}/${mm < 10 ? `0${mm}` : mm}/${yyyy}`
          }

          return { ...newMetaData, body: content } as BlogPost
        })
    )

    return posts.sort((a, b) => a.date.getTime() - b.date.getTime()) || []
  }

  async paginate(
    posts: BlogPost[],
    page = 0,
    limit = 10
  ): Promise<{ posts: BlogPost[] | []; page: number; totalPages: number }> {
    const totalPages = Math.ceil(posts.length / limit) - 1 || 0
    if (typeof page !== 'number' || page > totalPages || page < 0) {
      return { posts: [], page: 0, totalPages: 0 }
    }

    return {
      posts: posts.slice(limit * page, limit * page + limit),
      page,
      totalPages
    }
  }

  async getBySlug(slug: string): Promise<BlogPost | undefined> {
    return (await this.getAll()).find((post) => post.slug === slug)
  }
}
