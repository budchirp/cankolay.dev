import { Fetch } from '@/lib/fetch'

export type LanguageColors = {
  [key in string]: {
    color: string
    url: string
  }
}

export class Github {
  private static headers = {
    Authorization: `Basic ${btoa(`${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_TOKEN}`)}`
  }

  public static getUserRepos = async (username: string): Promise<any> => {
    'use server'

    const repos = await Fetch.get(`https://api.github.com/users/${username}/repos`, Github.headers)
    if (repos.status !== 200) return null

    return await repos.json()
  }

  public static getUser = async (username: string): Promise<any> => {
    'use server'

    const user = await Fetch.get(`https://api.github.com/users/${username}`, Github.headers)
    if (user.status !== 200) return null

    return await user.json()
  }

  public static getRepo = async (username: string, reponame: string): Promise<any> => {
    'use server'

    const repo = await Fetch.get(
      `https://api.github.com/repos/${username}/${reponame}`,
      Github.headers
    )
    if (repo.status !== 200) return null

    return await repo.json()
  }

  public static getRepoLanguages = async (username: string, reponame: string): Promise<any> => {
    'use server'

    const languages = await Fetch.get(
      `https://api.github.com/repos/${username}/${reponame}/languages`,
      Github.headers
    )
    if (languages.status !== 200) return null

    return await languages.json()
  }

  public static getLanguageColors = async (): Promise<LanguageColors | null> => {
    const colors = await Fetch.get<LanguageColors>(
      'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
    )
    if (colors.status !== 200) return null

    return await colors.json()
  }
}
