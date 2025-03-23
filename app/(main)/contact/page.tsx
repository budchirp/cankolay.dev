import type React from 'react'

import { MetadataManager } from '@/lib/metadata-manager'
import { Box } from '@/components/box'
import data from '@/data'
import Link from 'next/link'

import type { Metadata } from 'next'

const Page: React.FC = (): React.ReactNode => (
  <div className='masonry'>
    {(Object.keys(data.contact) as Array<keyof typeof data.contact>).map((platform, index) => {
      const contact = data.contact[platform]

      return (
        <Box
          key={index}
          className='hover:bg-background-tertiary group flex h-16 items-center gap-3 duration-300'
        >
          <span className='flex size-10 items-center justify-center rounded-full bg-accent-700 p-1 text-xl text-gray-50'>
            {contact.icon}
          </span>

          <Link
            href={contact.link || '/contact'}
            className='text-text-primary group-hover:text-text-secondary flex-1 text-xl font-bold transition duration-300'
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

export const metadata: Metadata = MetadataManager.generate(
  'Contact me',
  `${data.name}'s contact details`
)

export default Page
