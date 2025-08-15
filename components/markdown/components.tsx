import type React from 'react'

import { MarkdownCode } from '@/components/markdown/code'
import Link from 'next/link'

export const components = {
  code: MarkdownCode,
  a: (props: any) => <Link href={props.href}>{props.children}</Link>
}
