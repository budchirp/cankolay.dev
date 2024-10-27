import type React from 'react'

export type LayoutProps = {
  children: React.ReactNode
}

export type DynamicLayoutProps = {
  params: Promise<{
    [key: string]: string
  }>
} & LayoutProps
