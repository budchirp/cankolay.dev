import type React from 'react'

import { Container } from '@/components/container'

import type { LayoutProps } from '@/types/layout'

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => (
  <Container>{children}</Container>
)

export default Layout
