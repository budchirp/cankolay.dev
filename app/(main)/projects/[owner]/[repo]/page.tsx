import type React from 'react'

import { Calendar, GitFork, Scale, Star, Link as LucideLink } from 'lucide-react'
import { MetadataManager } from '@/lib/metadata-manager'
import { markdownToReact } from '@/components/markdown'
import { Hourglass } from '@/lib/hourglass'
import { notFound } from 'next/navigation'
import { Github } from '@/lib/github'
import { Fetch } from '@/lib/fetch'
import Link from 'next/link'
import data from '@/lib/data'

import { Column, Heading, Container, Section, Text, Row, Center, Divider } from '@trash-kit/ui'

import type { DynamicPageProps } from '@/types/page'
import type { Metadata } from 'next'

const getValue = (obj: any, path: string) => {
  if (!path.includes('.')) {
    return obj[path]
  }
  return path.split('.').reduce((acc, key) => acc && acc[key], obj)
}

type Language = Record<string, number>

const calculateLanguagePercentage = (languages: Language): Language => {
  if (!languages || Object.keys(languages).length === 0) return {}

  const total = Object.values(languages).reduce((sum, value) => sum + value, 0)
  const entries: [string, number][] = Object.entries(languages).map(([key, value]) => [
    key,
    Number(((value / total) * 100).toFixed(2))
  ])

  const diff = Number((100 - entries.reduce((sum, [, p]) => sum + p, 0)).toFixed(2))
  if (Math.abs(diff) > 0.01) {
    entries.sort(([, a], [, b]) => b - a)
    entries[0][1] += diff
  }

  return Object.fromEntries(entries) as Language
}

const badges = [
  {
    key: 'homepage',
    icon: LucideLink
  },
  {
    key: 'stargazers_count',
    icon: Star
  },
  {
    key: 'license.name',
    icon: Scale
  },
  {
    key: 'forks',
    icon: GitFork
  },
  {
    key: 'created_at',
    icon: Calendar
  }
]

const Page: React.FC<DynamicPageProps> = async ({ params }: DynamicPageProps) => {
  const { owner, repo: reponame } = await params

  if (!data.projectSources.includes(owner as any)) notFound()

  const repo = await Github.getRepo(owner, reponame)
  if (!repo) {
    notFound()
  }

  const languages = calculateLanguagePercentage(
    (await Github.getRepoLanguages(owner, reponame)) as Language
  )

  const colors = await Github.getLanguageColors()

  const readme = await Fetch.get(
    `https://raw.githubusercontent.com/${owner}/${reponame}/${repo.default_branch}/README.md`
  )

  const content: React.ReactNode =
    readme.status !== 200 ? 'No readme' : await markdownToReact(await readme.text())

  return (
    <Column padding='page'>
      <Container>
        <Section
          title={
            <Link href={repo.html_url}>
              <Heading size='h1'>
                {owner}/{reponame}
              </Heading>
            </Link>
          }
        >
          <Row className='md:flex-row flex-col-reverse items-start justify-between gap-2 w-full'>
            <div className='md:w-3/4 w-full'>{content}</div>

            <Column className='gap-4 md:w-1/4'>
              <Text className='text-tertiary'>{repo.description}</Text>

              <Column className='gap-1'>
                {badges.map(({ key, icon: Icon }, index) => {
                  let value = getValue(repo, key)
                  if (key === 'created_at') value = Hourglass.formatDate(value)

                  if (!value) return null

                  return (
                    <Row className='gap-2' key={index}>
                      <Center className='size-4'>
                        <Icon size={16} />
                      </Center>

                      {key === 'homepage' ? (
                        <Link className='underline' target='_blank' rel='noreferrer' href={value}>
                          {value}
                        </Link>
                      ) : (
                        <Text>{value}</Text>
                      )}
                    </Row>
                  )
                })}
              </Column>

              <Column className='gap-2'>
                <Row className='w-full h-1 gap-0 rounded-full overflow-hidden bg-surface-secondary'>
                  {Object.keys(languages).map((key: string) => {
                    return (
                      <div
                        key={key}
                        className='h-full'
                        style={{
                          background: (colors && colors[key]?.color) || undefined,
                          width: `${languages[key as keyof typeof languages]}%`
                        }}
                      />
                    )
                  })}
                </Row>

                <Column className='gap-2'>
                  {Object.keys(languages).map((key: string) => {
                    return (
                      <Row className='gap-2' key={key}>
                        <Center
                          className='size-2 rounded-full'
                          style={{
                            background: (colors && colors[key]?.color) || undefined
                          }}
                        />

                        <Row className='gap-1'>
                          <Text className='text-sm font-medium'>{key}</Text>

                          <Text className='text-sm text-tertiary'>{languages[key]}%</Text>
                        </Row>
                      </Row>
                    )
                  })}
                </Column>
              </Column>
            </Column>
          </Row>
        </Section>
      </Container>
    </Column>
  )
}

export const generateMetadata = async ({ params }: DynamicPageProps): Promise<Metadata> => {
  const { owner, repo: reponame } = await params

  const repo = await Github.getRepo(owner, reponame)
  if (!repo) {
    notFound()
  }

  return MetadataManager.generate(`${repo.full_name} - Projects`, repo.description, {
    openGraph: {
      type: 'article',
      publishedTime: repo.created_at
    }
  })
}

export const revalidate = 3600

export const generateStaticParams = async () => {
  let repos: any[] = []
  await Promise.all(
    data.projectSources.map(async (source) => {
      repos = [...repos, ...(await Github.getUserRepos(source))]
    })
  )

  return repos.map((repo) => {
    return {
      owner: repo?.owner?.login,
      repo: repo.name
    }
  })
}

export default Page
