import type React from 'react'

import { Heading } from '@/components/heading'
import { Github } from '@/lib/github'
import { notFound } from 'next/navigation'
import { Fetch } from '@/lib/fetch'
import { markdownToReact } from '@/lib/markdown'
import { Calendar, GitFork, Scale, Star } from 'lucide-react'
import { Hourglass } from '@/lib/hourglass'
import data from '@/data'

import type { DynamicPageProps } from '@/types/page'

const getValue = (obj: any, path: string) => {
  if (!path.includes('.')) {
    return obj[path]
  }
  return path.split('.').reduce((acc, key) => acc && acc[key], obj)
}

type LanguageObject = Record<string, number>

const calcLanguagePercentage = (languages: LanguageObject): LanguageObject => {
  if (!languages || Object.keys(languages).length === 0) {
    return {}
  }

  const total = Object.values(languages).reduce((sum, value) => sum + value, 0)

  const percentages = Object.entries(languages).map(([key, value]) => ({
    key,
    percentage: Number.parseFloat(((value / total) * 100).toFixed(1))
  }))

  percentages.sort((a, b) => b.percentage - a.percentage)

  const totalPercentage = percentages.reduce((sum, item) => sum + item.percentage, 0)
  let remainingDiff = Number.parseFloat((100 - totalPercentage).toFixed(1))

  if (remainingDiff !== 0) {
    for (let i = 0; remainingDiff !== 0 && i < percentages.length; i++) {
      const adjustment = remainingDiff > 0 ? 0.1 : -0.1
      percentages[i].percentage += adjustment
      remainingDiff = Number.parseFloat((remainingDiff - adjustment).toFixed(1))
    }
  }

  return Object.fromEntries(
    percentages.map(({ key, percentage }) => [key, Number.parseFloat(percentage.toFixed(1))])
  )
}

const Page: React.FC<DynamicPageProps> = async ({ params }: DynamicPageProps) => {
  const { owner, repo: reponame } = await params

  if (!data.projectSources.includes(owner)) notFound()

  const repo = await Github.getRepo(owner, reponame)
  if (!repo) {
    notFound()
  }

  const languagesResponse = await Fetch.get<LanguageObject>(repo.languages_url)
  const languages = calcLanguagePercentage(await languagesResponse.json())

  const colorsResponse = await Fetch.get<{
    [key: string]: { color: string; url: string }
  }>('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')
  const colors = await colorsResponse.json()

  const readme = await Fetch.get(
    `https://raw.githubusercontent.com/${owner}/${reponame}/${repo.default_branch}/README.md`
  )

  const content = readme.status !== 200 ? 'No readme' : await markdownToReact(await readme.text())

  const badges = [
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

  return (
    <div className='size-full'>
      <Heading>
        {owner}/{reponame}
      </Heading>

      <div className='flex w-full'>
        <div className='w-3/4 border-r-4 border-secondary pe-4 me-4'>{content}</div>

        <div className='grid gap-4 h-min w-1/4'>
          <p className='text-tertiary'>{repo.description}</p>

          <div className='grid gap-1'>
            {badges.map(({ key, icon: Icon }, index) => {
              let value = getValue(repo, key)
              if (key === 'created_at') value = Hourglass.formatDate(value)

              return (
                <div className='flex gap-1 items-center' key={index}>
                  <Icon className='p-1' size={24} />

                  <span>{value}</span>
                </div>
              )
            })}
          </div>

          <div className='grid gap-2'>
            <div className='w-full h-1 flex rounded-full relative overflow-hidden bg-secondary'>
              {Object.keys(languages).map((key: string) => {
                return (
                  <div
                    key={key}
                    className='h-1'
                    style={{
                      background: colors[key]?.color || undefined,
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
                        background: colors[key]?.color || undefined
                      }}
                    />

                    <span className='text-sm'>{key}</span>

                    <span className='text-sm text-tertiary'>{languages[key]}%</span>
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

export const revalidate = 3600

export default Page
