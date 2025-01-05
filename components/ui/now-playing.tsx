'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Box } from '@/components/box'
import { Container } from '@/components/container'
import { Backdrop } from '@/components/backdrop'
import { Transition } from '@headlessui/react'
import { VerticalPage } from '@/components/vertical-page'
import { Button } from '@/components/button'
import { Hourglass } from '@/lib/hourglass'
import { cn } from '@/lib/cn'
import { Disc3, VolumeX, X } from 'lucide-react'
import Link from 'next/link'
import data from '@/data'

import type { NowPlayingType } from '@/types/now-playing'
import type { LyricsType } from '@/types/lyrics'
import { Fetch } from '@/lib/fetch'

export const NowPlaying: React.FC = () => {
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

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await Fetch.get('/api/now-playing')
        const json: any = await response.json()

        if (!response.ok) {
          throw new Error(json.message)
        }

        setSong(json.data)
      } catch (error) {
        setError((error as Error).message)
        setSong(null)
      }
    }

    const interval = setInterval(fetchNowPlaying, 1000)
    fetchNowPlaying()

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (song && showLyricsScreen) {
      if (song.title === previousTitleRef.current) return

      setLyrics(null)

      const fetchLyrics = async () => {
        try {
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

      fetchLyrics()
    }
  }, [song])

  useEffect(() => {
    const now = Date.now()

    if (now - lastScrollTime > 5000 && activeLyricRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

      setLastScrollTime(now)
    }
  }, [song?.elapsedTime])

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
            <div className='border border-primary aspect-square rounded-2xl flex xs:size-16 overflow-hidden select-none items-center justify-center'>
              {song?.albumCover ? (
                <Link href={song?.link || ''}>
                  <img
                    className='aspect-square xs:object-cover xs:size-16 rounded-2xl transition duration-500 ease-out hover:scale-110'
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
                {Hourglass.formatTime(song?.elapsedTime)}
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
                {Hourglass.formatTime(song?.totalTime)}
              </span>
            </div>
          </div>
        </div>
      </Box>

      {song?.title && (
        <Button
          color='secondary'
          aria-label='Show lyrics'
          onClick={() => {
            setShowLyricsScreen(true)
          }}
        >
          Show lyrics
        </Button>
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
          'w-screen h-screen_ flex justify-center items-center origin-[50%_0%] z-[125] mx-auto inset-0 fixed',
          'transition-all scale-100 opacity-100',
          'data-[closed]:scale-90 data-[closed]:opacity-0',
          'data-[enter]:ease-out data-[enter]:duration-400',
          'data-[leave]:ease-in data-[leave]:duration-200'
        )}
      >
        <Container className='fixed top-16 h-full bottom-0 overflow-y-scroll'>
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

            {error && <VerticalPage title='Oops' items={error.split(' ')} />}

            {!error && !song && (
              <VerticalPage title='No vibe dude' items={['Playing', 'nothing', 'rn']} />
            )}

            {!error && song && !lyrics && (
              <VerticalPage title='⏳' items={['Loading', 'the', 'lyrics']} />
            )}

            {!error &&
              song &&
              lyrics &&
              lyrics?.map((lyric) => (
                <p
                  className={cn(
                    'text-2xl leading-10',
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
