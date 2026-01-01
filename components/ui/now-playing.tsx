'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Disc3, VolumeX } from 'lucide-react'
import { Hourglass } from '@/lib/hourglass'
import { Fetch } from '@/lib/fetch'
import Image from 'next/image'
import Link from 'next/link'

import { Section, Box, BoxContent, Center, Column, Text, Row } from '@trash-kit/ui'

import type { Song } from '@/types/song'
import { SiSpotify } from 'react-icons/si'

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
    <Section subsection title={api === 'me' ? 'Me' : 'My 💗'}>
      <Box className='relative'>
        <BoxContent padding='sm'>
          <div className='absolute inset-0 blur-3xl opacity-75 w-full h-3/4 xs:h-full xs:w-1/4'>
            {song?.image && (
              <Image
                height={50}
                width={50}
                src={song?.image}
                alt='album'
                className='object-fill size-full'
              />
            )}
          </div>

          <Column className='xs:flex-row z-10 w-full items-center gap-3'>
            <Center className='border border-outline aspect-square overflow-hidden shrink-0 rounded-2xl size-full xs:size-22'>
              {song?.image ? (
                <Image
                  height={400}
                  width={400}
                  className='size-full object-cover'
                  src={song?.image}
                  alt='album'
                />
              ) : (
                <VolumeX className='xs:size-8 size-16' />
              )}
            </Center>

            <Column className='gap-2 w-full p-2 xs:pe-2 xs:ps-0 xs:justify-center'>
              <Column className='gap-1'>
                <Row className='justify-between'>
                  <Link
                    href={song?.link || ''}
                    target='_blank'
                    className='flex items-center gap-1.5'
                  >
                    <Disc3 className={song?.isPlaying ? 'animate-spin-slow' : ''} size={16} />

                    <Text className='text-xl text-primary flex-1 font-bold leading-none'>
                      {song?.title || 'Playing nothing'}
                    </Text>
                  </Link>

                  <SiSpotify size={16} />
                </Row>

                <Text className='text-md font-medium leading-none text-secondary/75'>
                  {song?.artist || '*****'}
                </Text>
              </Column>

              <Column className='gap-2'>
                <Row className='w-full h-2 box-content bg-surface-secondary rounded-full'>
                  <div
                    className='bg-linear-to-r from-emerald-700 shadow via-emerald-500 to-emerald-600 ease-linear transition-width duration-1000 h-full rounded-full'
                    style={{
                      width: `${song?.percentage || 0}%`
                    }}
                  />
                </Row>

                <Row className='text-sm text-primary/50 justify-between leading-none'>
                  <Text className='text-start'>{Hourglass.formatTime(song?.elapsedTime)}</Text>

                  <Text className='text-end'>{Hourglass.formatTime(song?.totalTime)}</Text>
                </Row>
              </Column>
            </Column>
          </Column>
        </BoxContent>
      </Box>
    </Section>
  )
}
