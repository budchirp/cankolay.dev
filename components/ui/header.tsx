'use client'

import type React from 'react'
import { Fragment, useContext, useEffect, type ReactElement } from 'react'

import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Logo } from '@/components/logo'
import { Box } from '@/components/box'
import { type LinkProps, links } from '@/lib/links'
import { cn } from '@/lib/cn'
import { Transition, Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu as MenuIcon, X } from 'lucide-react'
import { Backdrop } from '@/components/backdrop'

type HeaderLinkProps = {
  pathname: string
  label: string
  url: string
}

const HeaderLink: React.FC<HeaderLinkProps> = ({
  pathname,
  label,
  url
}: HeaderLinkProps): React.ReactNode => {
  return (
    <Link
      className={cn(
        'hover:text-primary text-lg leading-6 transition-all duration-300 hover:font-bold',
        url == pathname ? 'text-primary font-bold' : 'text-tertiary font-medium'
      )}
      href={url}
    >
      {label}
    </Link>
  )
}

export const Header: React.FC = (): React.ReactNode => {
  const pathname: string = usePathname()

  return (
    <Menu>
      {({ open, close }): React.ReactElement => {
        useEffect((): void => {
          close()

          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, [pathname])

        return (
          <>
            <header
              className={cn(
                'bg-primary border-primary sticky top-0 z-[125] flex h-16 w-full items-center justify-center border-b backdrop-blur-sm transition-all delay-[50ms] lg:backdrop-blur',
                open
                  ? '!bg-opacity-100 duration-200 ease-in'
                  : '!bg-opacity-25 duration-500 ease-out lg:duration-300'
              )}
            >
              <Container className='flex h-full items-center justify-between gap-2'>
                <Logo />

                <div className='flex h-full items-center gap-2'>
                  <div className='hidden flex-row-reverse items-center gap-2 md:flex'>
                    {links.map(
                      (link: LinkProps, index: number): React.ReactElement => (
                        <HeaderLink
                          pathname={pathname}
                          label={link.label}
                          url={link.url}
                          key={index}
                        />
                      )
                    )}
                  </div>

                  <div className='flex h-full items-center gap-2'>
                    <ThemeSwitcher />

                    <MenuButton
                      as={Button}
                      className='md:hidden'
                      aria-label='Open menu'
                      variant='round'
                      color='secondary'
                      onClick={close}
                    >
                      {open ? <X /> : <MenuIcon />}
                    </MenuButton>
                  </div>
                </div>
              </Container>
            </header>

            <Backdrop show={open} onChange={close} />

            <Transition
              show={open}
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 scale-90'
              enterTo='opacity-100 scale-100'
              leave='transition ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-90'
            >
              <div className='fixed inset-x-0 top-20 z-[100] mx-auto flex h-min w-screen origin-[90%_0%] justify-center md:hidden'>
                <Container className='relative flex h-min items-center justify-center'>
                  <MenuItems
                    as={Box}
                    static
                    variant='primary'
                    className='top-0 grid w-full gap-2 overflow-hidden sm:max-w-screen-xs'
                  >
                    <h2 className='text-2xl font-bold'>Links</h2>

                    <div className='grid gap-1'>
                      {links.map(
                        (link: LinkProps, index: number): React.ReactNode => (
                          <MenuItem
                            as={HeaderLink}
                            pathname={pathname}
                            label={link.label}
                            url={link.url}
                            key={index}
                          />
                        )
                      )}
                    </div>
                  </MenuItems>
                </Container>
              </div>
            </Transition>
          </>
        )
      }}
    </Menu>
  )
}
Header.displayName = 'Header'
