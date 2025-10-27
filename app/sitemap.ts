import CONSTANTS from '@/lib/constants'
import { links } from '@/lib/links'
import { Post } from '@/lib/post'

import type { MetadataRoute } from 'next'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await new Post().getAll()
  const posts_sitemap: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${CONSTANTS.APP_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly',
    priority: 0.5
  }))

  const routes_sitemap: MetadataRoute.Sitemap = links.map((link) => ({
    url: `${CONSTANTS.APP_URL}${link.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1
  }))

  return [...routes_sitemap, ...posts_sitemap]
}

export default sitemap
