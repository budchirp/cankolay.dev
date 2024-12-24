import type React from 'react'

import { Box } from '@/components/box'
import { MetadataManager } from '@/lib/metadata-manager'
import data from '@/data'

import type { Metadata } from 'next'

const Page: React.FC = (): React.ReactNode => {
  const SkillChip = ({
    icon,
    name
  }: {
    icon: React.ReactNode
    name: string
  }) => {
    return (
      <Box padding='small' className='flex items-center rounded-full gap-3 md:p-3'>
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
        <div className='grid gap-2'>
          <p className='text-accent-primary text-3xl font-bold'>{data.name}</p>

          <div className='text-md'>{data.about}</div>
        </div>

        <div className='grid gap-1'>
          <p className='text-xl font-bold'>Technologies</p>

          <div className='grid gap-3'>
            {Object.keys(data.technologies).map((key, index) => (
              <div key={index} className='grid gap-2'>
                <span className='text-tertiary font-medium'>{key}</span>

                <div className='masonry masonry-2 gap-2'>
                  {/* @ts-ignore */}
                  {data.technologies[key].map((skill, index) => {
                    return <SkillChip icon={skill.icon} name={skill.name} key={index} />
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='grid gap-1'>
        <p className='text-xl font-bold'>Stacks</p>

        <div className='grid gap-3'>
          {Object.keys(data.stacks).map((key, index) => (
            <div key={index} className='grid gap-2'>
              <span className='text-tertiary font-medium'>{key}</span>

              <div className='masonry masonry-2 gap-2'>
                {/* @ts-ignore */}
                {data.stacks[key].map((skill, index) => {
                  return <SkillChip icon={skill.icon} name={skill.name} key={index} />
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-nosnippet className='grid gap-1'>
        <p className='text-xl font-bold'>My programming journey</p>

        <div className='grid gap-2'>
          {Object.keys(data.journey)
            .reverse()
            .map((key, index) => (
              <div key={index} className='grid grid-cols-2 gap-2'>
                <span className='text-accent-primary text-2xl font-bold'>{key}</span>
                <div>
                  {/* @ts-ignore */}
                  {data.journey[key].map((text, index) => (
                    <div key={index} className='flex gap-2'>
                      <span className='text-tertiary'>-</span>
                      <p className='text-primary'>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = MetadataManager.generate('About me', 'Hello, World!')

export default Page
