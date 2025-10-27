import type React from 'react'

import { Logo } from '@/components/logo'
import CONSTANTS from '@/lib/constants'
import { Github } from 'lucide-react'
import Link from 'next/link'

import { BoxContent, Button, Container, Divider, Row, Text } from '@trash-kit/ui'

export const Footer: React.FC = (): React.ReactNode => (
  <footer className='bg-surface-primary/50 backdrop-blur border-t border-outline w-full'>
    <Container>
      <BoxContent className='px-0'>
        <Row className='gap-2 h-full justify-between items-center'>
          <Logo />

          <Link
            aria-label='Github'
            href={`https://github.com/${CONSTANTS.USERNAME}`}
            rel='noreferrer'
            target='_blank'
          >
            <Button aria-label='Github' shape='circle' color='surface'>
              <Github />
            </Button>
          </Link>
        </Row>
      </BoxContent>
    </Container>

    <Divider />

    <Container>
      <BoxContent className='px-0'>
        <Row className='gap-2 h-full justify-between items-center'>
          <Text className='font-medium text-secondary-accent'>Made by {CONSTANTS.NAME} with ❤️</Text>
        </Row>
      </BoxContent>
    </Container>
  </footer>
)

Footer.displayName = 'Footer'
