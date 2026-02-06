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

    const posts = await Promise.all(
      postFiles
        .filter((file) => path.extname(file) === '.md' || path.extname(file) === '.mdx')
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
        .map(async (file) => {
          const { data: metaData, content } = matter(
            await fs.readFile(`${Post.path}/${file}`, 'utf-8')
          ) as any

          return { ...{
              ...metaData,
              id: metaData.slug,
              date: new Date(metaData.date)
            }, body: content } as BlogPost
        })
    )

    return posts.sort((a, b) => a.date.getTime() + b.date.getTime()) || []
  }

  public async paginate(
    posts: BlogPost[],
    page = 0,
    limit = 6
  ): Promise<{ posts: BlogPost[] | []; page: number; total: number }> {
    const total = Math.ceil(posts.length / limit) - 1 || 0
    if (page > total || page < 0) {
      return { posts: [], page: 0, total: 0 }
    }

    return {
      posts: posts.slice(limit * page, limit * page + limit),
      page,
      total
    }
  }
}
