import type React from 'react'

import Link from 'next/link'

export const components = {
  a: (props: any) => <Link href={props.href}>{props.children}</Link>
}
