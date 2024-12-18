import type { NextConfig } from 'next'

export default {
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote'],
  images: {
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: ''
      }
    ]
  }
} as NextConfig
