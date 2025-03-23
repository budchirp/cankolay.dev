import type React from 'react'

import Link from 'next/link'
import { MarkdownCode } from './code'

export const components = {
  code: MarkdownCode,
  a: (props: any) => <Link href={props.href}>{props.children}</Link>
}
