import { Hourglass } from '@/lib/hourglass'
import matter from 'gray-matter'
import fs from 'fs/promises'
import path from 'path'

import type { BlogPost } from '@/types/post'

export class Post {
  private static path = `${process.cwd()}/posts`

  public async get(slug: string): Promise<BlogPost | undefined | null> {
    return (await this.getAll()).find((post) => post.slug === slug)
  }

  public async getAll(): Promise<BlogPost[]> {
    const postFiles = await fs.readdir(Post.path)

    const posts: BlogPost[] = await Promise.all(
      postFiles
        .filter((file) => path.extname(file) === '.md' || path.extname(file) === '.mdx')
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
        .map(async (file) => {
          const { data: metaData, content } = matter(
            await fs.readFile(`${Post.path}/${file}`, 'utf-8')
          ) as any

          const newMetaData: Omit<BlogPost, 'body'> = {
            ...metaData,
            id: metaData.slug,
            tags: metaData.tags.split(', '),
            date: new Date(metaData.date),
            formattedDate: Hourglass.formatDate(metaData.date)
          }

          return { ...newMetaData, body: content } as BlogPost
        })
    )

    return posts.sort((a, b) => a.date.getTime() - b.date.getTime()) || []
  }

  public async paginate(
    posts: BlogPost[],
    page = 0,
    limit = 6
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
}
