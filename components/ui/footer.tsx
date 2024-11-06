import type React from 'react'

import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Logo } from '@/components/logo'
import { Github } from 'lucide-react'
import data from '@/data'
import Link from 'next/link'

export const Footer: React.FC = (): React.ReactNode => {
  return (
    <footer className='bg-primary !bg-opacity-25 backdrop-blur mt-4 flex h-16 w-full items-center justify-center'>
      <Container className='flex h-full items-center justify-between gap-2'>
        <Logo />

        <Link
          aria-label='Github'
          href={`https://github.com/${data.githubUsername}`}
          rel='noreferrer'
          target='_blank'
        >
          <Button aria-label='Github' variant='round' color='secondary'>
            <Github />
          </Button>
        </Link>
      </Container>
    </footer>
  )
}
Footer.displayName = 'Footer'
