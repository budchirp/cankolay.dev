import CONSTANTS from '@/lib/constants'

import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${CONSTANTS.APP_URL}/sitemap.xml`
  }
}

export default robots
