'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { CenteredPage } from '@/components/vertical-page'
import { Container } from '@/components/container'
import { Disc3, VolumeX, X } from 'lucide-react'
import { Backdrop } from '@/components/backdrop'
import { Transition } from '@headlessui/react'
import { Button } from '@/components/button'
import { Hourglass } from '@/lib/hourglass'
import { Box } from '@/components/box'
import { Fetch } from '@/lib/fetch'
import { cn } from '@/lib/cn'
import Link from 'next/link'
import data from '@/data'

import type { NowPlayingType } from '@/types/now-playing'
import type { LyricsType } from '@/types/lyrics'
import Image from 'next/image'

type NowPlayingProps = {
  api?: 'primary' | 'other'
}

export const NowPlaying: React.FC<NowPlayingProps> = ({ api = 'primary' }) => {
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect((): void => {
    setMounted(true)
  }, [])

  const [error, setError] = useState<string | null>(null)

  const [song, setSong] = useState<NowPlayingType | null>(null)

  const [lastScrollTime, setLastScrollTime] = useState<number>(0)
  const [showLyricsScreen, setShowLyricsScreen] = useState<boolean>(false)

  const [lyrics, setLyrics] = useState<LyricsType[] | null>(null)

  const activeLyricRef = useRef<HTMLParagraphElement | null>(null)
  const previousTitleRef = useRef<string | null>(null)

  const fetchNowPlaying = async () => {
    try {
      const response = await Fetch.get(`/api/now-playing/${api === 'primary' ? '' : 'other'}`)
      const json: any = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      setSong(json.data)
    } catch {
      setSong(null)
    }
  }

  const fetchLyrics = async (song: NowPlayingType) => {
    try {
      setError(null)
      setLyrics(null)

      const response = await Fetch.post<LyricsType[]>('/api/lyrics', {
        song: [song.title, song.artist].join(' ')
      })
      const json: any = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      setLyrics(json.data)
    } catch (error) {
      setError((error as Error).message)
      setLyrics(null)
    } finally {
      previousTitleRef.current = song.title
    }
  }

  useEffect(() => {
    const interval = setInterval(fetchNowPlaying, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (song) {
      if (song.title === previousTitleRef.current) return

      fetchLyrics(song)
    }
  }, [song])

  useEffect(() => {
    const now = Date.now()

    if (now - lastScrollTime > 10 * 1000 && activeLyricRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

      setLastScrollTime(now)
    }
  }, [song?.elapsedTime])

  return (
    <Container className='grid gap-4'>
      <div className='grid gap-2'>
        <h2 className='font-medium text-text-tertiary'>{api === 'primary' ? 'Me' : 'My 💗'}</h2>

        <Box
          className='relative overflow-hidden flex w-full h-min flex-col'
          padding='small'
          variant='primary'
        >
          <div className='absolute inset-0 blur-3xl opacity-75 w-full h-3/4  xs:h-full xs:w-1/4'>
            {song?.albumCover && (
              <Image
                height={50}
                width={50}
                src={song?.albumCover}
                alt='album'
                className='object-fill size-full select-none rounded-2xl'
              />
            )}
          </div>

          <div className='flex flex-col z-10 items-center size-full gap-2 relative xs:flex-row'>
            <div className='border border-border aspect-square overflow-hidden shrink-0 flex items-center justify-center rounded-2xl size-full xs:size-18'>
              {song?.albumCover ? (
                <Image
                  height={400}
                  width={400}
                  className='aspect-square size-full xs:size-18 object-cover'
                  src={song?.albumCover}
                  alt='album'
                />
              ) : (
                <VolumeX className='xs:size-8 size-16' />
              )}
            </div>

            <div className='flex gap-1.5 flex-col p-2 xs:pe-2 xs:ps-0 w-full xs:justify-center'>
              <Link href={song?.link || ''} target='_blank' className='flex items-center gap-1.5'>
                <Disc3 size={16} />

                <span className='text-lg flex-1 font-bold leading-none'>
                  {song?.title || 'Playing nothing'}
                </span>
              </Link>

              <span className='font-medium flex items-center leading-none text-text-tertiary'>
                {song?.artist || data.username}
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

      {song?.title && (
        <div>
          <Button
            color='secondary'
            aria-label='Show lyrics'
            onClick={() => {
              setShowLyricsScreen(true)
            }}
          >
            Show lyrics
          </Button>
        </div>
      )}

      {mounted &&
        createPortal(
          <Backdrop open={showLyricsScreen} />,
          document.querySelector('#main') as Element
        )}

      <Transition
        show={showLyricsScreen}
        as='div'
        className={cn(
          'w-screen h-screen_ flex justify-center items-center origin-[50%_0%] z-125 mx-auto inset-0 fixed',
          'transition-all scale-100 opacity-100',
          'data-closed:scale-90 data-closed:opacity-0',
          'data-enter:ease-out data-enter:duration-400',
          'data-leave:ease-in data-leave:duration-200'
        )}
      >
        <Container className='fixed top-16 h-full bottom-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-y-scroll'>
          <div className='relative py-4 h-full'>
            <Button
              className='absolute right-0 top-4'
              aria-label='Close lyrics screen'
              variant='round'
              color='secondary'
              onClick={() => {
                setShowLyricsScreen(false)
              }}
            >
              <X />
            </Button>

            {error && <CenteredPage title='Oops' items={error.split(' ')} />}

            {!error && !song && (
              <CenteredPage title='No vibe dude' items={['Playing', 'nothing', 'rn']} />
            )}

            {!error && song && !lyrics && (
              <CenteredPage title='⏳' items={['Loading', 'the', 'lyrics']} />
            )}

            {!error &&
              song &&
              lyrics &&
              lyrics?.map((lyric) => (
                <p
                  className={cn(
                    'text-2xl transition-all duration-150 leading-10',
                    song?.elapsedTime >= lyric.time ? 'font-bold' : 'text-tertiary'
                  )}
                  key={lyric.time}
                  ref={song?.elapsedTime >= lyric.time ? activeLyricRef : null}
                >
                  {lyric.text}
                </p>
              ))}
          </div>
        </Container>
      </Transition>
    </Container>
  )
}
