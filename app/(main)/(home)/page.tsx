import type React from 'react'

import { NowPlaying } from '@/components/ui/now-playing'
import { MetadataManager } from '@/lib/metadata-manager'
import CONSTANTS from '@/lib/constants'
import Image from 'next/image'
import data from '@/lib/data'
import Link from 'next/link'

import {
  Box,
  BoxContent,
  Button,
  Center,
  Column,
  Container,
  Divider,
  Grid,
  Heading,
  Row,
  Section,
  Text,
  Tag
} from '@trash-kit/ui'

import type { Metadata } from 'next'

import tailwindColors from 'tailwindcss/colors'
import { Github } from '@/lib/github'

const colors = Object.entries(tailwindColors).filter(
  ([key]) =>
    ![
      'slate',
      'gray',
      'zinc',
      'neutral',
      'stone',
      'white',
      'black',
      'inherit',
      'transparent'
    ].includes(key)
)

const Page: React.FC = async (): Promise<React.ReactNode> => {
  const projects = await Promise.all(
    data.projects.map(async (project: any) => {
      const split = project.repo.split('/')

      const repo = await Github.getRepo(split[0], split[1])

      return {
        ...project,
        name: project.name || split[1],
        description: project.description || repo?.description,
        url: project.url || repo?.homepage,
        keywords: project.keywords || repo?.topics || []
      }
    })
  )

  return (
    <Column className='gap-0'>
      <Section>
        <Container>
          <Section
            divider={false}
            title={
              <Column className='md:w-2/3'>
                <Column className='gap-0'>
                  <Heading size='h2'>Hi, It's me</Heading>
                  <Heading className='-ml-0.5' size='h1' color='accent'>
                    {CONSTANTS.NAME}
                  </Heading>
                </Column>

                {data.about}
              </Column>
            }
          />
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <Section className='mt-0' title={<Heading size='h2'>Featured Projects</Heading>}>
            <Grid>
              {projects.map((project) => {
                const random = colors.keys().toArray()
                const color = colors[random[Math.floor(Math.random() * random.length)]][1]

                const background = color[700]

                return (
                  <article key={project.repo}>
                    <Box>
                      <Center className='relative aspect-video w-full overflow-hidden'>
                        {project?.image ? (
                          <Image
                            className='object-cover size-full transition duration-500 ease-out hover:scale-125'
                            width={640}
                            height={360}
                            alt={project.name}
                            src={project.image}
                          />
                        ) : (
                          <div
                            className='size-full'
                            style={{
                              backgroundColor: background || 'var(--color-surface-secondary)'
                            }}
                          >
                            <Center className='h-full'>
                              <Heading
                                style={{
                                  color: background
                                    ? 'color-mix(in srgb, white 70%, transparent)'
                                    : 'var(--color-primary)'
                                }}
                                size='h2'
                                className='text-center'
                              >
                                {project.name}
                              </Heading>
                            </Center>
                          </div>
                        )}
                      </Center>

                      <Divider />

                      <BoxContent>
                        <Column className='gap-2'>
                          <Column className='gap-0'>
                            <Heading size='h2'>{project.name}</Heading>
                            <Text className='text-secondary'>{project.description}</Text>
                          </Column>

                          {project.keywords.length > 0 && (
                            <Row className='overflow-x-auto'>
                              {project.keywords.map((keyword: string, index: number) => (
                                <Tag
                                  className='break-none flex shrink-0'
                                  color='secondary'
                                  key={index}
                                >
                                  {keyword}
                                </Tag>
                              ))}
                            </Row>
                          )}
                        </Column>
                      </BoxContent>

                      <Divider />

                      <BoxContent>
                        <Row>
                          <Link href={`/projects/${project.repo}`}>
                            <Button>Details</Button>
                          </Link>

                          {project.url && (
                            <Link href={project.url}>
                              <Button color='surface'>View website</Button>
                            </Link>
                          )}
                        </Row>
                      </BoxContent>
                    </Box>
                  </article>
                )
              })}
            </Grid>
          </Section>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <Section className='mt-0' title={<Heading size='h2'>Contact</Heading>}>
            <Grid>
              {(Object.keys(data.contact) as Array<keyof typeof data.contact>).map(
                (platform, index) => {
                  const contact = data.contact[platform]

                  return (
                    <Link key={index} href={contact.link} rel='noreferrer' target='_blank'>
                      <Box
                        key={index}
                        className='hover:bg-surface-secondary group transition-all duration-300'
                      >
                        <BoxContent>
                          <Row>
                            <Center className='transition-all duration-300 shadow-2xl size-10 aspect-square rounded-full bg-surface-primary-accent text-white group-hover:bg-surface-secondary-accent border border-outline-accent group-hover:border-outline-accent-hover'>
                              {contact.icon}
                            </Center>

                            <Text className='text-xl font-bold'>{platform}</Text>
                          </Row>
                        </BoxContent>
                      </Box>
                    </Link>
                  )
                }
              )}
            </Grid>
          </Section>
        </Container>
      </Section>

      <Divider />

      <Section className='bg-surface-secondary relative'>
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
  )
}

export const metadata: Metadata = MetadataManager.generate('About me', 'Hello, World!')

export default Page
