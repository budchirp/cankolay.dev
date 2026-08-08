'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Code, Home, Pencil } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Box, BoxContent, Center, Row, cn } from '@trash-kit/ui'

type LinkProps = {
  label: string
  icon: React.ReactNode
  url: string
}

const links: LinkProps[] = [
  {
    label: 'Home',
    icon: <Home />,
    url: '/'
  },
  {
    label: 'Blog',
    icon: <Pencil />,
    url: '/blog'
  }
]

type NavigationIslandItemProps = {
  pathname: string
  link: LinkProps
}

const NavigationIslandItem: React.FC<NavigationIslandItemProps> = ({
  pathname,
  link
}: NavigationIslandItemProps): React.ReactNode => {
  const isActive = link.url.length > 1 ? pathname.includes(link.url) : pathname === link.url
  return (
    <Link href={link.url}>
      <Box
        className={cn(
          'rounded-2xl group transition-all duration-300',
          isActive
            ? 'bg-surface-accent/25 text-surface-content-accent border-outline-accent/25'
            : 'bg-surface-primary/50'
        )}
      >
        <BoxContent
          className={cn(isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')}
          padding='sm'
        >
          <Center className='size-8 aspect-square'>{link.icon}</Center>
        </BoxContent>
      </Box>
    </Link>
  )
}

export const NavigationIsland: React.FC = (): React.ReactNode => {
  const pathname = usePathname()

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40

      setIsVisible(window.scrollY < lastY && !isBottom)

      lastY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'select-none fixed bottom-4 z-20 flex items-center justify-center w-full transition-all duration-300',
        isVisible ? 'translate-y-0 ease-out' : 'translate-y-32 pointer-events-none ease-in'
      )}
    >
      <Box className='w-fit backdrop-blur bg-surface-secondary/75 shadow-2xl'>
        <BoxContent padding='sm'>
          <Row className='h-full gap-2 justify-between'>
            {links.map((link, index) => (
              <NavigationIslandItem pathname={pathname} link={link} key={index} />
            ))}
          </Row>
        </BoxContent>
      </Box>
    </header>
  )
}
NavigationIsland.displayName = 'Header'
