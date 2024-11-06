import type React from 'react'

import { Box } from '@/components/box'
import { genMetadata } from '@/lib/gen-metadata'

import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'Loading projects...' })

const Loading: React.FC = (): React.ReactNode => {
  return (
    <div className='masonry'>
      {[...Array(24)].map((_, index) => {
        return (
          <Box key={index} className='grid gap-2'>
            <div className='bg-tertiary h-3 w-8/12 animate-pulse rounded' />

            <div className='grid gap-1'>
              <div className='bg-tertiary h-2 w-full animate-pulse rounded' />
              <div className='bg-tertiary h-2 w-full animate-pulse rounded' />
              <div className='bg-tertiary h-2 w-full animate-pulse rounded' />
            </div>

            <div className='flex items-center justify-between gap-2'>
              <div className='bg-tertiary h-3 w-3/12 animate-pulse rounded' />
              <div className='bg-tertiary h-3 w-3/12 animate-pulse rounded' />
            </div>
          </Box>
        )
      })}
    </div>
  )
}

export default Loading
