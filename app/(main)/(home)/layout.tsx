import type React from 'react'

import { Container } from '@/components/container'
import { NowPlaying } from '@/components/ui/now-playing'

import type { LayoutProps } from '@/types/layout'

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => {
  return (
    <div className='grid gap-4'>
      <Container>{children}</Container>

      <NowPlaying />
    </div>
  )
}

export default Layout
