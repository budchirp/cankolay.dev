import type React from 'react'

import { Box } from '@/components/box'
import { genMetadata } from '@/lib/gen-metadata'
import data from '@/data'

import type { Metadata } from 'next'

export const metadata: Metadata = genMetadata({ title: 'About me' })

const Page: React.FC = (): React.ReactNode => {
  return (
    <div className='mt-16 grid gap-4'>
      <div>
        <p className='text-accent-primary text-3xl font-bold'>{data.name}</p>

        <p className='text-lg'>
          <span className='text-secondary line-through'>Almost</span> full-stack developer
        </p>
      </div>

      <div className='grid gap-1'>
        <p className='text-xl font-bold'>Technologies</p>

        <div className='grid gap-2'>
          {Object.keys(data.skills).map(
            (key: string, index: number): React.ReactNode => (
              <div key={index} className='grid gap-2'>
                <span className='text-secondary text-md font-medium'>{key}</span>

                <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4'>
                  {/* @ts-ignore */}
                  {data.skills[key].map((skill: any, index: number): React.ReactNode => {
                    return (
                      <Box key={index} padding='none' className='flex items-center gap-3 p-2'>
                        <span className='flex h-10 w-10 items-center justify-center rounded-full bg-accent-700 p-1 text-xl text-gray-50'>
                          {skill.icon}
                        </span>
                        <p className='break-all text-sm font-medium'>{skill.name}</p>
                      </Box>
                    )
                  })}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div data-nosnippet className='grid gap-1'>
        <p className='text-xl font-bold'>My programming journey</p>

        <div className='grid gap-2'>
          {Object.keys(data.journey)
            .reverse()
            .map(
              (key: string, index: number): React.ReactNode => (
                <div key={index} className='grid grid-cols-2 gap-2'>
                  <span className='text-accent-primary text-2xl font-bold'>{key}</span>
                  <div>
                    {/* @ts-ignore */}
                    {data.journey[key].map(
                      (text: string, index: number): React.ReactNode => (
                        <div key={index} className='flex gap-2'>
                          <span className='text-primary-600'>-</span>
                          <p className='text-primary'>{text}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  )
}

export default Page
