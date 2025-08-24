import type React from 'react'

import { Logo } from '@/components/logo'
import { Github } from 'lucide-react'
import data from '@/data'
import Link from 'next/link'

import { BoxContent, Button, Container, Divider, Row, Text } from '@trash-ui/components'

export const Footer: React.FC = (): React.ReactNode => (
  <footer className='bg-surface-primary/50 backdrop-blur-xs border-t border-outline w-full'>
    <Container>
      <BoxContent padding='none' className='py-4'>
        <Row className='gap-2 justify-between'>
          <Logo />

          <Link
            aria-label='Github'
            href={`https://github.com/${data.githubUsername}`}
            rel='noreferrer'
            target='_blank'
          >
            <Button aria-label='Github' shape='circle' color='surface'>
              <Github />
            </Button>
          </Link>
        </Row>
      </BoxContent>

      <Divider />

      <BoxContent padding='none' className='py-4'>
        <Row className='gap-2 justify-between'>
          <Text className='font-medium text-secondary-accent'>Made by {data.name} with ❤️</Text>
        </Row>
      </BoxContent>
    </Container>
  </footer>
)

Footer.displayName = 'Footer'
