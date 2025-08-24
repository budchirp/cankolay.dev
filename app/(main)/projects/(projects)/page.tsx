import type React from 'react'

import { MetadataManager } from '@/lib/metadata-manager'
import { notFound } from 'next/navigation'
import { Github } from '@/lib/github'

import Link from 'next/link'
import data from '@/data'

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
} from '@trash-ui/components'

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
    <Column>
      <Container>
        <Section title='Projects' />

        <Column padding='none'>
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
                              <Text className='text-text-tertiary w-full text-sm'>
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
                                    !colors || !colors[repo.language]?.color ? 'text-secondary' : ''
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
        </Column>
      </Container>
    </Column>
  )
}

export const revalidate = 3600

export const metadata: Metadata = MetadataManager.generate('Projects', `${data.name}'s projects`)

export default Page
