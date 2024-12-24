import type React from 'react'

import { Box } from '@/components/box'
import { Button } from '@/components/button'

const Loading: React.FC = (): React.ReactNode => (
  <div className='masonry'>
    {[...Array(12)].map((_, index) => {
      return (
        <Box key={index} padding='none'>
          <div className='bg-tertiary h-48 w-full animate-pulse rounded-t-2xl' />

          <div className='grid gap-4 p-4'>
            <div className='bg-tertiary h-3 w-8/12 animate-pulse rounded' />

            <div className='grid gap-2'>
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

export default Loading
