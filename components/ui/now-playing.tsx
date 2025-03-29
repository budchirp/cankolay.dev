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
import { Fetch } from '@/lib/fetch'
import { cn } from '@/lib/cn'
import { Disc3, VolumeX, X } from 'lucide-react'
import Link from 'next/link'
import data from '@/data'

import type { NowPlayingType } from '@/types/now-playing'
import type { LyricsType } from '@/types/lyrics'

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

          setError(null)
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
      <Box
        className='relative overflow-hidden flex w-full h-min flex-col'
        padding='small'
        variant='primary'
      >
        <div className='absolute inset-0 overflow-hidden w-full h-3/4 blur-3xl opacity-75 xs:h-full xs:w-1/4'>
          {song?.albumCover && (
            <img src={song?.albumCover} alt='album' className='object-fill size-full select-none' />
          )}
        </div>

        <div className='flex flex-col z-10 items-center size-full gap-2 relative xs:flex-row'>
          <div className='border border-border aspect-square flex items-center justify-center rounded-2xl size-full xs:size-18'>
            {song?.albumCover ? (
              <Link href={song?.link || ''} target='_blank'>
                <img
                  className='aspect-square rounded-2xl size-full xs:size-18 object-cover'
                  src={song?.albumCover}
                  alt='album'
                />
              </Link>
            ) : (
              <VolumeX className='xs:size-8 size-16' />
            )}
          </div>

          <div className='flex gap-1.5 flex-col px-2 pb-2 pt-1 xs:pe-2 w-full xs:py-1 xs:ps-0 xs:justify-center'>
            <Link href={song?.link || ''} target='_blank' className='flex items-center gap-1.5'>
              <Disc3 size={16} />

              <span className='text-lg flex-1 font-bold leading-none break-words'>
                {song?.title || 'Playing nothing'}
              </span>
            </Link>

            <h2 className='font-medium flex items-center leading-none text-text-tertiary break-words'>
              {song?.artist || data.username}
            </h2>

            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm w-8 flex text-center items-center justify-center leading-none select-none text-text-secondary'>
                {Hourglass.formatTime(song?.elapsedTime)}
              </span>

              <div className='w-full h-2 flex items-center p-0.5 bg-background-secondary relative rounded-full'>
                <div
                  className='bg-linear-to-r from-accent-700 shadow via-accent-500 to-accent-600 ease-linear transition-width duration-1000 h-full rounded-full'
                  style={{
                    width: `${song?.percentage || 0}%`
                  }}
                />
              </div>

              <span className='text-sm w-8 flex text-center items-center justify-center leading-none select-none text-text-secondary'>
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
          'w-screen h-screen_ flex justify-center items-center origin-[50%_0%] z-125 mx-auto inset-0 fixed',
          'transition-all scale-100 opacity-100',
          'data-closed:scale-90 data-closed:opacity-0',
          'data-enter:ease-out data-enter:duration-400',
          'data-leave:ease-in data-leave:duration-200'
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
