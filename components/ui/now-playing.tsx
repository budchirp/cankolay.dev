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
import data from '@/data'

export const NowPlaying: React.FC = () => {
  const [song, updateSong] = useState<NowPlayingType | null>(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/now-playing')
        updateSong(await response.json())
      } catch {
        updateSong(null)
      }
    }

    const interval = setInterval(() => {
      fetchNowPlaying()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container className='grid gap-4'>
      <div className='h-1 bg-secondary w-full' />

      <Box padding='small' variant='primary' className='relative overflow-hidden'>
        <div className='absolute left-0 top-0 select-none xs:h-full xs:w-1/4 w-full h-3/4 blur-3xl opacity-75'>
          {song?.albumCover && (
            <img src={song?.albumCover} alt='album' className='object-fill size-full' />
          )}
        </div>

        <div className='flex flex-col xs:flex-row xs:gap-2 z-10 size-full relative'>
          <div className='xs:size-16 p-2 xs:p-0 size-full'>
            <div className='border border-primary aspect-square rounded-2xl flex xs:size-16 select-none items-center justify-center'>
              {song?.albumCover ? (
                <Link href={song?.link || ''}>
                  <img
                    className='aspect-square xs:object-cover xs:size-16 rounded-2xl transition duration-500 ease-out hover:scale-90'
                    src={song?.albumCover}
                    alt='album'
                  />
                </Link>
              ) : (
                <VolumeX className='xs:size-8 size-16' />
              )}
            </div>
          </div>

          <div className='flex gap-2 size-full justify-between flex-col xs:pe-2 xs:py-1 xs:ps-0 p-2'>
            <div className='grid gap-1'>
              <Link href={song?.link || ''} className='flex items-center gap-1'>
                <Disc3 className={cn('size-4', song?.isPlaying && 'animate-spin-slow')} />
                <h2 className='text-lg font-bold leading-none text-ellipsis'>
                  {song?.title || 'Playing nothing'}
                </h2>
              </Link>

              <h3 className='font-medium leading-none text-tertiary'>
                {song?.artist || data.username}
              </h3>
            </div>

            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm leading-none select-none text-secondary'>
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

              <span className='text-sm leading-none select-none text-secondary'>
                {formatTime(song?.totalTime)}
              </span>
            </div>
          </div>
        </div>
      </Box>
    </Container>
  )
}
