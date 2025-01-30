import type React from 'react'

import { Box } from '@/components/box'

const Loading: React.FC = (): React.ReactNode => (
  <div className='masonry'>
    {[...Array(24)].map((_, index) => {
      return (
        <Box key={index} className='grid gap-2'>
          <div className='bg-background-tertiary h-3 w-8/12 animate-pulse rounded-sm' />

          <div className='grid gap-1'>
            <div className='bg-background-tertiary h-2 w-full animate-pulse rounded-sm' />
            <div className='bg-background-tertiary h-2 w-full animate-pulse rounded-sm' />
            <div className='bg-background-tertiary h-2 w-full animate-pulse rounded-sm' />
          </div>

          <div className='flex items-center justify-between gap-2'>
            <div className='bg-background-tertiary h-3 w-3/12 animate-pulse rounded-sm' />
            <div className='bg-background-tertiary h-3 w-3/12 animate-pulse rounded-sm' />
          </div>
        </Box>
      )
    })}
  </div>
)

export default Loading
