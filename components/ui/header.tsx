'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { Transition, Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/react'
import { Menu as MenuIcon, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'
import { links } from '@/lib/links'
import Link from 'next/link'

import {
  cn,
  Box,
  BoxContent,
  Button,
  Center,
  Column,
  Container,
  Heading,
  Row,
  Backdrop,
  Divider
} from '@trash-kit/ui'

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
        (url.length > 1 ? pathname.includes(url) : pathname === url)
          ? 'text-primary font-bold'
          : 'text-tertiary font-medium'
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
            <header className='bg-transparent select-none fixed top-0 z-20 h-16 w-full backdrop-blur-sm'>
              <Container className='h-full'>
                <Row className='gap-2 h-full justify-between'>
                  <Logo />

                  <Row className='gap-3'>
                    <Row className='hidden flex-row-reverse gap-2 md:flex'>
                      {links.map((link, index) => (
                        <HeaderLink
                          pathname={pathname}
                          label={link.label}
                          url={link.url}
                          key={index}
                        />
                      ))}
                    </Row>

                    <MenuButton
                      as={Button}
                      className='md:hidden'
                      aria-label='Open menu'
                      shape='circle'
                      color='surface'
                      onClick={close}
                    >
                      {open ? <X /> : <MenuIcon />}
                    </MenuButton>
                  </Row>
                </Row>
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
              <Container className='fixed top-20'>
                <Center>
                  <MenuItems as={Box} static className='max-w-(--breakpoint-xs)'>
                    <BoxContent>
                      <Heading size='h2'>Links</Heading>
                    </BoxContent>

                    <Divider />

                    <BoxContent>
                      <Column className='gap-1'>
                        {links.map((link, index) => (
                          <MenuItem
                            as={HeaderLink}
                            pathname={pathname}
                            label={link.label}
                            url={link.url}
                            key={index}
                          />
                        ))}
                      </Column>
                    </BoxContent>
                  </MenuItems>
                </Center>
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
