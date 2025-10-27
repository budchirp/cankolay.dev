import type React from 'react'

import { NowPlaying } from '@/components/ui/now-playing'
import { MetadataManager } from '@/lib/metadata-manager'
import CONSTANTS from '@/lib/constants'
import data from '@/lib/data'

import {
  Box,
  BoxContent,
  Center,
  Column,
  Container,
  Grid,
  Heading,
  Row,
  Section,
  Text
} from '@trash-kit/ui'

import type { Metadata } from 'next'

type SkillChipProps = {
  icon: React.ReactNode
  name: string
}

const SkillChip: React.FC<SkillChipProps> = ({ icon, name }: SkillChipProps): React.ReactNode => {
  return (
    <Box className='rounded-full'>
      <BoxContent className='h-full' padding='sm'>
        <Row className='gap-3 h-full items-center pe-2'>
          <Center className='size-10 rounded-full aspect-square bg-surface-primary-accent border border-outline-accent p-1 text-gray-50'>
            {icon}
          </Center>
          <Text className='font-medium w-full'>{name}</Text>
        </Row>
      </BoxContent>
    </Box>
  )
}

const Page: React.FC = (): React.ReactNode => {
  return (
    <Column className='gap-0'>
      <Section>
        <Container>
          <Section
            className='mt-0'
            divider={false}
            title={
              <Heading size='h1' color='accent'>
                {CONSTANTS.NAME}
              </Heading>
            }
            description={data.about}
          />
        </Container>
      </Section>

      <Column className='gap-8'>
        {(['Technologies', 'Stacks'] as const).map((type) => {
          const skill_type = type === 'Technologies' ? data.technologies : data.stacks

          return (
            <Container key={type}>
              <Section className='mt-0' title={<Heading size='h2'>{type}</Heading>}>
                <Column>
                  {(Object.keys(skill_type) as Array<keyof typeof skill_type>).map((key, index) => (
                    <Section
                      subsection
                      key={index}
                      title={
                        <Heading className='text-tertiary' size='h3'>
                          {key}
                        </Heading>
                      }
                    >
                      <Grid className='gap-2 grid-cols-2'>
                        {(
                          skill_type[key as keyof typeof skill_type] as Array<{
                            icon: React.ReactNode
                            name: string
                          }>
                        ).map((skill, index) => (
                          <SkillChip icon={skill.icon} name={skill.name} key={index} />
                        ))}
                      </Grid>
                    </Section>
                  ))}
                </Column>
              </Section>
            </Container>
          )
        })}

        <Container>
          <Section className='mt-0' divider={false} title={<Heading size='h2'>My journey</Heading>}>
            {(Object.keys(data.journey) as unknown as Array<keyof typeof data.journey>)
              .reverse()
              .map((key, index) => (
                <Grid key={index} className='gap-2 grid-cols-2!'>
                  <Heading size='h2' color='accent'>
                    {key}
                  </Heading>
                  <ul>
                    {data.journey[key].map((text, index) => (
                      <Row className='gap-1' key={index}>
                        <span className='text-tertiary'>-</span>
                        <Text>{text}</Text>
                      </Row>
                    ))}
                  </ul>
                </Grid>
              ))}
          </Section>
        </Container>

        <Section className='bg-surface-secondary relative border-y border-outline'>
          <div className='absolute z-0 inset-0 overflow-hidden'>
            <Container className='absolute inset-0'>
              <div className='absolute top-0 left-0 size-64 opacity-50 bg-emerald-800 rounded-full blur-[128px]' />
              <div className='absolute top-[85%] right-[20%] size-64 opacity-50 bg-emerald-700 rounded-full blur-[128px]' />
            </Container>
          </div>

          <Container className='relative z-10'>
            <Section
              className='mt-0'
              title={<Heading size='h2'>Now playing</Heading>}
              columnClassName='gap-8'
            >
              <NowPlaying />

              <NowPlaying api='my-love' />
            </Section>
          </Container>
        </Section>
      </Column>
    </Column>
  )
}

export const metadata: Metadata = MetadataManager.generate('About me', 'Hello, World!')

export default Page
