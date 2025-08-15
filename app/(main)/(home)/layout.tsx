import type React from 'react'

import { Container } from '@/components/container'
import { NowPlaying } from '@/components/ui/now-playing'

import type { LayoutProps } from '@/types/layout'

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => (
  <div className='grid gap-8'>
    <Container>{children}</Container>

    <NowPlaying />

    <NowPlaying api='other' />
  </div>
)

export default Layout
