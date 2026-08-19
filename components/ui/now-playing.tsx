'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Disc3, VolumeX } from 'lucide-react'
import { Hourglass } from '@/lib/hourglass'
import { SiSpotify } from 'react-icons/si'
import Image from 'next/image'
import Link from 'next/link'

import { Box, BoxContent, Heading, Center, Column, Text, Row } from '@trash-kit/ui'

import type { Song } from '@/types/song'

export const NowPlaying: React.FC = () => {
  const [song, setSong] = useState<Song | null>(null)

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch('/api/now-playing')
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
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box className='relative overflow-visible! hover:scale-105 ease-out'>
      <div className='absolute left-0 top-0 blur-2xl opacity-50 w-full h-3/4 xs:h-full xs:w-1/6'>
        {song?.image && (
          <Image
            height={50}
            width={50}
            src={song.image}
            alt='album'
            className='object-fill size-full'
          />
        )}
      </div>

      <BoxContent padding='sm'>
        <Column className='xs:flex-row z-10 w-full items-center gap-3'>
          <Center className='border border-outline aspect-square overflow-hidden shrink-0 rounded-2xl size-full xs:size-24'>
            {song?.image ? (
              <Image
                height={400}
                width={400}
                className='size-full object-cover'
                src={song.image}
                alt='album'
              />
            ) : (
              <VolumeX className='xs:size-8 size-16' />
            )}
          </Center>

          <Column className='gap-2 w-full p-2 xs:pe-2 xs:ps-0 xs:justify-center'>
            <Column className='gap-1'>
              <Link href={song?.link || ''} target='_blank' className='flex items-center gap-1.5'>
                <Disc3 className={song?.playback?.isPlaying ? 'animate-spin-slow' : ''} size={16} />

                <Heading size='h3' className='leading-0 font-black'>
                  {song?.title || 'Playing nothing'}
                </Heading>
              </Link>

              <Text className='text-content-secondary/75'>{song?.artist || '*****'}</Text>
            </Column>

            <Column className='gap-1'>
              <Row className='w-full h-1.5 box-content bg-surface-secondary rounded-full'>
                <div
                  className='bg-linear-to-r from-emerald-700 shadow via-emerald-500 to-emerald-600 ease-linear transition-width duration-1000 h-full rounded-full'
                  style={{
                    width: `${song?.playback?.percentage || 0}%`
                  }}
                />
              </Row>

              <Row className='text-sm text-content-secondary/75 justify-between *:tabular-nums'>
                <Text className='text-start'>{Hourglass.formatTime(song?.playback?.elapsed)}</Text>

                <Text className='text-end'>{Hourglass.formatTime(song?.playback?.total)}</Text>
              </Row>
            </Column>
          </Column>
        </Column>
      </BoxContent>
    </Box>
  )
}
