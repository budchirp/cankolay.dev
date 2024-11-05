import type React from 'react'

import { Box } from '@/components/box'
import { genMetadata } from '@/lib/gen-metadata'
import data from '@/data'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = genMetadata({ title: 'About me' })

const Page: React.FC = (): React.ReactNode => {
  const SkillChip = ({ icon, name }: { icon: ReactNode; name: string }) => {
    return (
      <Box padding='none' className='flex items-center gap-3 p-2 md:p-3'>
        <span className='flex h-10 w-10 items-center justify-center rounded-full bg-accent-700 p-1 text-xl text-gray-50'>
          {icon}
        </span>
        <p className='break-all font-medium'>{name}</p>
      </Box>
    )
  }

  return (
    <div className='mt-12 grid gap-8'>
      <div className='grid gap-4'>
        <div>
          <p className='text-accent-primary text-3xl font-bold'>{data.name}</p>

          <p className='text-lg'>{data.about}</p>
        </div>

        <div className='grid gap-2'>
          <p className='text-xl font-bold'>Technologies</p>

          <div className='grid gap-3'>
            {Object.keys(data.technologies).map(
              (key: string, index: number): React.ReactNode => (
                <div key={index} className='grid gap-2'>
                  <span className='text-secondary text-md font-medium'>{key}</span>

                  <div className='masonry masonry-2 gap-3'>
                    {/* @ts-ignore */}
                    {data.technologies[key].map((skill: any, index: number): React.ReactNode => {
                      return <SkillChip icon={skill.icon} name={skill.name} key={index} />
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className='grid gap-2'>
        <p className='text-xl font-bold'>Stacks</p>

        <div className='grid gap-3'>
          {Object.keys(data.stacks).map(
            (key: string, index: number): React.ReactNode => (
              <div key={index} className='grid gap-2'>
                <span className='text-secondary text-md font-medium'>{key}</span>

                <div className='masonry masonry-2 gap-3'>
                  {/* @ts-ignore */}
                  {data.stacks[key].map((skill: any, index: number): React.ReactNode => {
                    return <SkillChip icon={skill.icon} name={skill.name} key={index} />
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
