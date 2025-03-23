import type React from 'react'

import { Heading } from '@/components/heading'
import { Github } from '@/lib/github'
import { notFound } from 'next/navigation'
import { Fetch } from '@/lib/fetch'
import { MetadataManager } from '@/lib/metadata-manager'
import { markdownToReact } from '@/lib/markdown'
import { Calendar, GitFork, Scale, Star, Link as LucideLink } from 'lucide-react'
import { Hourglass } from '@/lib/hourglass'
import Link from 'next/link'
import data from '@/data'

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

  if (!data.projectSources.includes(owner)) notFound()

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
    <div className='size-full'>
      <Link href={repo.html_url}>
        <Heading>
          {owner}/{reponame}
        </Heading>
      </Link>

      <div className='flex md:flex-row flex-col-reverse w-full'>
        <div className='md:w-3/4 w-full md:border-r-4 md:border-t-0 border-t-4 border-border-hover md:pe-4 md:pt-0 pt-4 md:me-4 md:mt-0 mt-4'>
          {content}
        </div>

        <div className='grid gap-4 h-min md:w-1/4 w-full'>
          <p className='text-text-tertiary'>{repo.description}</p>

          <div className='grid gap-1'>
            {badges.map(({ key, icon: Icon }, index) => {
              let value = getValue(repo, key)
              if (key === 'created_at') value = Hourglass.formatDate(value)

              if (!value) return

              return (
                <div className='flex gap-2 items-center' key={index}>
                  <div className='size-4 flex items-center justify-center'>
                    <Icon size={16} />
                  </div>

                  {key === 'homepage' ? (
                    <Link className='underline' target='_blank' rel='noreferrer' href={value}>
                      {value}
                    </Link>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              )
            })}
          </div>

          <div className='grid gap-2'>
            <div className='w-full h-1 flex rounded-full relative overflow-hidden bg-background-secondary'>
              {Object.keys(languages).map((key: string) => {
                return (
                  <div
                    key={key}
                    className='h-1'
                    style={{
                      background: (colors && colors[key]?.color) || undefined,
                      width: `${languages[key]}%`
                    }}
                  />
                )
              })}
            </div>

            <ul className='gap-2'>
              {Object.keys(languages).map((key: string) => {
                return (
                  <li className='flex items-center gap-2' key={key}>
                    <div
                      className='size-2 rounded-full'
                      style={{
                        background: (colors && colors[key]?.color) || undefined
                      }}
                    />

                    <span className='text-sm'>{key}</span>

                    <span className='text-sm text-text-tertiary'>{languages[key]}%</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
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
