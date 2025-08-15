'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Container } from '@/components/container'
import { Disc3, VolumeX } from 'lucide-react'
import { Hourglass } from '@/lib/hourglass'
import { Box } from '@/components/box'
import { Fetch } from '@/lib/fetch'
import Image from 'next/image'
import Link from 'next/link'

import type { Song } from '@/types/song'

type NowPlayingProps = {
  api?: 'me' | 'my-love'
}

export const NowPlaying: React.FC<NowPlayingProps> = ({ api = 'me' }) => {
  const [song, setSong] = useState<Song | null>(null)

  const fetchNowPlaying = async () => {
    try {
      const response = await Fetch.get(`/api/now-playing/${api}`)
      const json: any = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      setSong(json.data)
    } catch {
      setSong(null)
    }
  }

  useEffect(() => {
    const interval = setInterval(fetchNowPlaying, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container className='grid gap-4'>
      <div className='grid gap-2'>
        <h2 className='font-medium text-text-tertiary'>{api === 'me' ? 'Me' : 'My 💗'}</h2>

        <Box
          className='relative overflow-hidden flex w-full h-min flex-col'
          padding='small'
          variant='primary'
        >
          <div className='absolute inset-0 blur-3xl opacity-75 w-full h-3/4  xs:h-full xs:w-1/4'>
            {song?.image && (
              <Image
                height={50}
                width={50}
                src={song?.image}
                alt='album'
                className='object-fill size-full select-none rounded-2xl'
              />
            )}
          </div>

          <div className='flex flex-col z-10 items-center size-full gap-2 relative xs:flex-row'>
            <div className='border border-border aspect-square overflow-hidden shrink-0 flex items-center justify-center rounded-2xl size-full xs:size-20'>
              {song?.image ? (
                <Image
                  height={400}
                  width={400}
                  className='aspect-square size-full object-cover'
                  src={song?.image}
                  alt='album'
                />
              ) : (
                <VolumeX className='xs:size-8 size-16' />
              )}
            </div>

            <div className='flex gap-1.5 flex-col p-2 xs:pe-2 xs:ps-0 w-full xs:justify-center'>
              <Link href={song?.link || ''} target='_blank' className='flex items-center gap-1.5'>
                <Disc3 className={song?.isPlaying ? 'animate-spin-slow' : ''} size={16} />

                <span className='text-lg flex-1 font-bold leading-none'>
                  {song?.title || 'Playing nothing'}
                </span>
              </Link>

              <span className='font-medium flex items-center leading-none text-text-tertiary'>
                {song?.artist || '*****'}
              </span>

              <div className='flex items-center justify-between gap-2'>
                <span className='text-sm w-10 flex text-start items-center justify-center leading-none select-none text-text-secondary'>
                  {Hourglass.formatTime(song?.elapsedTime)}
                </span>

                <div className='w-full h-2 flex border border-border box-content items-center p-0.5 bg-background-secondary relative rounded-full'>
                  <div
                    className='bg-linear-to-r from-accent-700 shadow via-accent-500 to-accent-600 ease-linear transition-width duration-1000 h-full rounded-full'
                    style={{
                      width: `${song?.percentage || 0}%`
                    }}
                  />
                </div>

                <span className='text-sm w-10 flex text-end items-center justify-center leading-none select-none text-text-secondary'>
                  {Hourglass.formatTime(song?.totalTime)}
                </span>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </Container>
  )
}
