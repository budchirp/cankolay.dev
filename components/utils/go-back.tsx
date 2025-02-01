'use client'

import type React from 'react'

import { Button } from '@/components/button'
import { usePathname, useRouter } from 'next/navigation'

type GoBackProps = {
  removeSearchParams?: boolean
}

export const GoBack: React.FC<GoBackProps> = ({
  removeSearchParams
}: GoBackProps): React.ReactNode => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Button
      aria-label='Click to go to the previous page'
      onClick={(): void => {
        if (!removeSearchParams) {
          router.push(pathname)
        } else {
          router.back()
        }
      }}
    >
      Go back
    </Button>
  )
}
