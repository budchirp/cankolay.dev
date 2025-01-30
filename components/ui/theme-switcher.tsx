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
import { createPortal } from 'react-dom'

import type { Theme } from '@/types/theme'

export const themes: { [key in Theme]: [string, LucideIcon] } = {
  dark: ['Dark', Moon],
  light: ['Light', Sun],
  system: ['System', Laptop]
}

export const ThemeSwitcher: React.FC = (): React.ReactNode => {
  const { theme, setTheme } = useTheme()

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
      {({ open }) => {
        return (
          <div>
            {mounted &&
              createPortal(<Backdrop open={open} />, document.querySelector('#main') as Element)}

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
              as='div'
              className={cn(
                'w-screen h-screen_ flex justify-center items-center origin-[75%_0%] md:origin-[95%_0%] z-100 mx-auto inset-0 fixed',
                'transition-all scale-100 opacity-100',
                'data-closed:scale-90 data-closed:opacity-0',
                'data-enter:ease-out data-enter:duration-400',
                'data-leave:ease-in data-leave:duration-200'
              )}
            >
              <Container className='fixed top-20 flex h-min items-center justify-end'>
                <ListboxOptions
                  static
                  as={Box}
                  variant='primary'
                  padding='none'
                  className='top-0 w-36 overflow-hidden'
                >
                  {(Object.keys(themes) as Theme[]).map((theme) => {
                    const [label, Icon] = themes[theme]

                    return (
                      <ListboxOption
                        key={theme}
                        className={({ selected }) =>
                          cn(
                            'border-border flex h-min w-full cursor-pointer items-center border-b px-4 py-2 transition duration-300 last:border-none',
                            selected ? 'bg-background-secondary' : 'bg-background-primary hover:bg-background-secondary'
                          )
                        }
                        value={theme}
                      >
                        {({ selected }) => (
                          <p
                            className={cn(
                              'flex h-full w-full items-center gap-2 font-medium transition duration-300',
                              selected ? 'text-text-accent-primary' : 'text-text-primary hover:text-text-secondary'
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
            </Transition>
          </div>
        )
      }}
    </Listbox>
  )
}
ThemeSwitcher.displayName = 'ThemeSwitcher'
