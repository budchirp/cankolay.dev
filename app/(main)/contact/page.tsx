import type React from 'react'

import { Box } from '@/components/box'
import { genMetadata } from '@/lib/gen-metadata'
import data from '@/data'
import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'Contact me' })

const Page: React.FC = (): React.ReactNode => {
  return (
    <div className='masonry h-min'>
      {Object.keys(data.contact).map((platform, index) => {
        /* @ts-ignore */
        const contact = data.contact[platform]

        return (
          <Box
            key={index}
            className='hover:bg-tertiary group flex h-16 items-center gap-3 duration-300'
          >
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-accent-700 p-1 text-xl text-gray-50'>
              {contact.icon}
            </span>

            <Link
              href={contact.link || '/contact'}
              className='text-primary group-hover:text-secondary flex-1 text-xl font-bold transition duration-300'
              rel='noreferrer'
              target='_blank'
            >
              {platform}
            </Link>
          </Box>
        )
      })}
    </div>
  )
}

export default Page
