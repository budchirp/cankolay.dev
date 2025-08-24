'use client'

import type React from 'react'
import { useState } from 'react'

import { Check, Clipboard } from 'lucide-react'

import { Button } from '@trash-ui/components'

type CopyButtonProps = {
  content: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  content
}: CopyButtonProps): React.ReactNode => {
  const [copied, setCopied] = useState<boolean>(false)

  return (
    <Button
      shape='circle'
      color='surface'
      disabled={copied}
      onClick={() => {
        navigator.clipboard.writeText(content)

        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 3 * 1000)
      }}
    >
      {copied ? <Check size={16} /> : <Clipboard size={16} />}
    </Button>
  )
}
