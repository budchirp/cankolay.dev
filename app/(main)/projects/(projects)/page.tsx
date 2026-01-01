import type React from 'react'

import { MetadataManager } from '@/lib/metadata-manager'
import { notFound } from 'next/navigation'
import CONSTANTS from '@/lib/constants'
import { Github } from '@/lib/github'
import data from '@/lib/data'
import Link from 'next/link'

import {
  cn,
  Box,
  BoxContent,
  Column,
  Container,
  Divider,
  Grid,
  Heading,
  Section,
  Text
} from '@trash-kit/ui'

import type { Metadata } from 'next'

const Page: React.FC = async () => {
  const colors = await Github.getLanguageColors()

  const repos: { [key: string]: any[] } = {}
  await Promise.all(
    data.projectSources.map(async (source) => {
      repos[source] = await Github.getUserRepos(source)
    })
  )

  if (!repos || Object.keys(repos).length < 1) {
    notFound()
  }

  return (
    <Column className='gap-0'>
      <Section>
        <Container>
          <Section title='Projects'>
            {data.projectSources.map((source) => {
              return (
                <Section subsection key={source} title={source}>
                  <Grid>
                    {repos[source].map((repo) => {
                      return (
                        <Link
                          href={`projects/${source}/${repo.name}`}
                          key={repo.name}
                          rel='noreferrer'
                          target='_blank'
                          aria-label='Go to project'
                        >
                          <Box className='hover:bg-surface-secondary'>
                            <BoxContent>
                              <Heading size='h2'>{repo.name}</Heading>

                              {repo.description && (
                                <Text className='text-tertiary w-full text-sm'>
                                  {repo.description}
                                </Text>
                              )}
                            </BoxContent>

                            {repo.language && (
                              <>
                                <Divider />

                                <BoxContent>
                                  <Text
                                    style={{
                                      color: (colors && colors[repo.language]?.color) || undefined
                                    }}
                                    className={cn(
                                      'text-sm',
                                      !colors || !colors[repo.language]?.color
                                        ? 'text-secondary'
                                        : ''
                                    )}
                                  >
                                    {repo.language}
                                  </Text>
                                </BoxContent>
                              </>
                            )}
                          </Box>
                        </Link>
                      )
                    })}
                  </Grid>
                </Section>
              )
            })}
          </Section>
        </Container>
      </Section>
    </Column>
  )
}

export const revalidate = 3600

export const metadata: Metadata = MetadataManager.generate(
  'Projects',
  `${CONSTANTS.NAME}'s projects`
)

export default Page
