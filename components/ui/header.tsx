'use client'

import type React from 'react'
import { useState, useEffect } from 'react'

import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Logo } from '@/components/logo'
import { Box } from '@/components/box'
import { links } from '@/lib/links'
import { cn } from '@/lib/cn'
import { Transition, Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { Link } from 'next-view-transitions'
import { Menu as MenuIcon, X } from 'lucide-react'
import { Backdrop } from '@/components/backdrop'
import { createPortal } from 'react-dom'

import type { LinkProps } from '@/types/link'

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
        'hover:text-text-primary text-lg leading-6 transition-all duration-300 hover:font-bold',
        url === pathname ? 'text-text-primary font-bold' : 'text-text-tertiary font-medium'
      )}
      href={url}
    >
      {label}
    </Link>
  )
}

export const Header: React.FC = (): React.ReactNode => {
  const pathname = usePathname()

  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Menu>
      {({ open, close }) => {
        useEffect((): void => {
          close()

          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, [pathname])

        return (
          <div>
            <header className='bg-background-primary/50 select-none border-b border-transparent fixed top-0 z-20 flex h-16 w-full items-center justify-center backdrop-blur-sm'>
              <Container className='flex items-center justify-between gap-2'>
                <Logo />

                <div className='flex h-full items-center gap-3'>
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

            {mounted &&
              createPortal(
                <Backdrop open={open} onClose={close} />,
                document.querySelector('#main') as Element
              )}

            <Transition
              show={open}
              as='div'
              className={cn(
                'w-screen h-screen_ flex justify-center items-center origin-[90%_0%] z-20 mx-auto inset-0 fixed',
                'transition-all scale-100 opacity-100',
                'data-closed:scale-90 data-closed:opacity-0',
                'data-enter:ease-out data-enter:duration-400',
                'data-leave:ease-in data-leave:duration-200'
              )}
            >
              <Container className='fixed top-20 flex h-min items-center justify-center'>
                <MenuItems
                  as={Box}
                  static
                  variant='primary'
                  className='top-0 grid w-full gap-2 overflow-hidden sm:max-w-(--breakpoint-xs)'
                >
                  <h2 className='text-2xl font-bold'>Links</h2>

                  <div className='grid gap-1'>
                    {links.map((link, index) => (
                      <MenuItem
                        as={HeaderLink}
                        pathname={pathname}
                        label={link.label}
                        url={link.url}
                        key={index}
                      />
                    ))}
                  </div>
                </MenuItems>
              </Container>
            </Transition>

            <div className='h-16' />
          </div>
        )
      }}
    </Menu>
  )
}
Header.displayName = 'Header'
