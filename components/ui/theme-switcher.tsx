'use client'

import type React from 'react'
import { Fragment, useEffect, useState } from 'react'

import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Box } from '@/components/box'
import { cn } from '@/lib/cn'
import { Moon, Sun, Laptop, type LucideIcon } from 'lucide-react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react'
import { useTheme } from 'next-themes'
import { Backdrop } from '@/components/backdrop'

export type Theme = 'dark' | 'light' | 'system'

export const themes: { [key in Theme]: [string, LucideIcon] } = {
  dark: ['Dark', Moon],
  light: ['Light', Sun],
  system: ['System', Laptop]
}

export const ThemeSwitcher: React.FC = (): React.ReactNode => {
  const { theme, setTheme } = useTheme() as any

  const [mounted, setMounted] = useState<boolean>(false)

  useEffect((): void => {
    setMounted(true)
  }, [])

  let Icon: LucideIcon | null = null
  if (mounted) {
    Icon = themes[theme as Theme][1]
  }

  return (
    <Listbox value={theme} onChange={(value: Theme): any => setTheme(value)}>
      {({ open }): React.ReactElement => {
        return (
          <>
            <Backdrop show={open} />

            <ListboxButton as={Fragment}>
              <Button
                disabled={!mounted}
                aria-label='Open theme switcher menu'
                variant='round'
                color='secondary'
              >
                {Icon ? <Icon /> : null}
              </Button>
            </ListboxButton>

            <Transition
              show={open}
              as={Fragment}
              enter='transition ease-out duration-150'
              enterFrom='opacity-0 scale-90'
              enterTo='opacity-100 scale-100'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-90'
            >
              <div className='fixed inset-x-0 top-20 z-[100] flex w-screen origin-[75%_0%] justify-center md:origin-[90%_0%]'>
                <Container className='relative flex items-center justify-end'>
                  <ListboxOptions
                    static
                    as={Box}
                    variant='primary'
                    padding='none'
                    className='top-0 w-36 overflow-hidden'
                  >
                    {(Object.keys(themes) as Theme[]).map((theme: Theme): React.ReactNode => {
                      const [label, Icon] = themes[theme]

                      return (
                        <ListboxOption
                          key={theme}
                          className={({ selected }): string =>
                            cn(
                              'border-primary flex h-min w-full cursor-pointer items-center border-b px-4 py-2 transition duration-300 last:border-none',
                              selected ? 'bg-secondary' : 'bg-primary hover:bg-secondary'
                            )
                          }
                          value={theme}
                        >
                          {({ selected }): React.ReactElement => (
                            <p
                              className={cn(
                                'flex h-full w-full items-center gap-2 font-medium transition duration-300',
                                selected
                                  ? 'text-accent-primary'
                                  : 'text-primary hover:text-secondary'
                              )}
                            >
                              <Icon />
                              <span>{label}</span>
                            </p>
                          )}
                        </ListboxOption>
                      )
                    })}
                  </ListboxOptions>
                </Container>
              </div>
            </Transition>
          </>
        )
      }}
    </Listbox>
  )
}
ThemeSwitcher.displayName = 'ThemeSwitcher'
