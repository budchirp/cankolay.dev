import { type LinkProps, links } from '@/lib/links'
import { Post } from '@/lib/post'
import data from '@/data'

import type { BlogPost } from '@/types/post'
import type { MetadataRoute } from 'next'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts: BlogPost[] = await new Post().getAll()
  const posts_sitemap: MetadataRoute.Sitemap = posts.map(
    (post: BlogPost): MetadataRoute.Sitemap[number] => ({
      url: `${data.siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'weekly',
      priority: 0.5
    })
  )

  const routes_sitemap: MetadataRoute.Sitemap = links.map(
    (link: LinkProps): MetadataRoute.Sitemap[number] => ({
      url: `${data.siteUrl}${link.url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    })
  )

  return [...routes_sitemap, ...posts_sitemap]
}

export default sitemap
