'use client'

import type React from 'react'

import { Box } from '@/components/box'
import { Container } from '@/components/container'
import { cn } from '@/lib/cn'
import { formatTime } from '@/lib/time'
import { Disc3, VolumeX } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { NowPlayingType } from '@/types/now-playing'

export const NowPlaying: React.FC = () => {
  const [song, updateSong] = useState<NowPlayingType | null>(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const response = await fetch('/api/now-playing')
      updateSong(await response.json())
    }

    const interval = setInterval(() => {
      fetchNowPlaying()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container className='grid gap-4'>
      <div className='h-1 bg-secondary w-full' />

      <Box padding='small' variant='primary' className='w-full overflow-hidden h-full relative'>
        <div className='absolute inset-0 select-noneh-full w-1/4 blur-3xl opacity-75'>
          {song && <img src={song?.albumCover} alt='album' className='object-fill size-full' />}
        </div>

        <div className='flex gap-2 z-10 h-full w-full relative items-center'>
          <div className='size-16'>
            <div className='border flex items-center justify-center size-16 overflow-hidden border-primary rounded-2xl'>
              {song ? (
                <Link href={song?.link || ''}>
                  <img
                    className='size-16 object-cover rounded-2xl transition duration-500 ease-out hover:scale-125'
                    src={song?.albumCover}
                    alt='album'
                  />
                </Link>
              ) : (
                <VolumeX className='size-8' />
              )}
            </div>
          </div>

          <div className='flex h-full gap-1 justify-between py-1 flex-col pe-2 w-full'>
            <div className='flex justify-center flex-col gap-1'>
              <Link href={song?.link || ''} className='flex gap-1 items-center overflow-hidden'>
                <Disc3 className={cn('size-4', song?.isPlaying && 'animate-spin-slow')} />
                <h2 className='text-lg font-bold leading-none truncate'>
                  {song?.title || 'Playing nothing'}
                </h2>
              </Link>

              <h3 className='font-medium text-ellipsis leading-none text-tertiary'>
                {song?.artist}
              </h3>
            </div>

            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm leading-none text-secondary'>
                {formatTime(song?.elapsedTime)}
              </span>

              <div className='w-full h-1 bg-secondary relative rounded-full'>
                <div
                  className='bg-gradient-to-r from-accent-700 via-accent-500 to-accent-600 ease-linear transition-width duration-1000 h-1 rounded-full'
                  style={{
                    width: `${song?.percentage || 0}%`
                  }}
                />
              </div>

              <span className='text-sm leading-none text-secondary'>
                {formatTime(song?.totalTime)}
              </span>
            </div>
          </div>
        </div>
      </Box>
    </Container>
  )
}
