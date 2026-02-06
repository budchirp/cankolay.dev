import type { NextConfig } from 'next'

export default {
  reactStrictMode: true,
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
        search: ''
      }
    ],
    remotePatterns: [
      {
        hostname: 'i.scdn.co'
      }
    ]
  }
} as NextConfig
