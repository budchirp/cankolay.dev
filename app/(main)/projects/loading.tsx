import type React from 'react'

import { Box } from '@/components/box'
import { genMetadata } from '@/lib/gen-metadata'

import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'Loading projects...' })

const Loading: React.FC = (): React.ReactNode => {
  return (
    <div className='mansonry'>
      {[...Array(10)].map((_: any, index: number): React.ReactNode => {
        return (
          <Box key={index} className='mb-4 grid gap-2 last:mb-0'>
            <div className='bg-tertiary h-3 w-8/12 animate-pulse rounded' />

            <div className='grid gap-1'>
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
