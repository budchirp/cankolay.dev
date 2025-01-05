import type React from 'react'

import { Button } from '@/components/button'
import { Box } from '@/components/box'
import { MetadataManager } from '@/lib/metadata-manager'
import { Github } from '@/lib/github'
import { cn } from '@/lib/cn'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import data from '@/data'

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
    <div className='grid gap-4'>
      {data.projectSources.map((source) => {
        return (
          <div className='grid gap-2' key={source}>
            <span className='text-tertiary text-lg font-medium'>{source}/</span>

            <div className='masonry'>
              {repos[source].map((repo) => {
                return (
                  <Box
                    key={repo.name}
                    className='hover:bg-tertiary group grid h-max w-full gap-1 transition duration-300'
                  >
                    <Link
                      href={`projects/${source}/${repo.name}`}
                      rel='noreferrer'
                      target='_blank'
                      className='text-primary group-hover:text-secondary flex w-full items-center break-all text-2xl font-bold transition duration-300'
                      aria-label='Go to project'
                    >
                      {repo.name}
                    </Link>

                    {repo.description && (
                      <p className='text-secondary w-full text-sm'>{repo.description}</p>
                    )}

                    {repo.language && (
                      <div className='flex items-center justify-between'>
                        {repo.language && (
                          <span
                            style={{
                              color: (colors && colors[repo.language]?.color) || undefined
                            }}
                            className={cn(
                              'text-sm',
                              !colors || !colors[repo.language]?.color ? 'text-secondary' : ''
                            )}
                          >
                            {repo.language}
                          </span>
                        )}

                        {repo.homepage && (
                          <Link
                            href={repo.homepage}
                            className='w-min'
                            target='_blank'
                            rel='noreferrer'
                            aria-label={`Go to ${repo.html_url}`}
                          >
                            <Button>Preview</Button>
                          </Link>
                        )}
                      </div>
                    )}
                  </Box>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const revalidate = 3600

export const metadata: Metadata = MetadataManager.generate('Projects', `${data.name}'s projects`)

export default Page
