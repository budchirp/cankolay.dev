import type React from 'react'

import { Box } from '@/components/box'
import { Button } from '@/components/button'
import { genMetadata } from '@/lib/gen-metadata'

import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'Loading posts...' })

const Loading: React.FC = (): React.ReactNode => {
  return (
    <div className='mansonry'>
      {[...Array(10)].map((_: any, index: number): React.ReactNode => {
        return (
          <Box key={index} padding='none' className='mb-4 last:mb-0'>
            <div className='bg-tertiary h-48 w-full animate-pulse rounded-t-2xl' />

            <div className='grid gap-2 p-4'>
              <div className='bg-tertiary h-3 w-8/12 animate-pulse rounded' />

              <div className='grid gap-1'>
                <div className='bg-tertiary h-3 w-full animate-pulse rounded' />
                <div className='bg-tertiary h-3 w-full animate-pulse rounded' />
              </div>

              <Button disabled color='secondary'>
                loading
              </Button>
            </div>
          </Box>
        )
      })}
    </div>
  )
}

export default Loading
