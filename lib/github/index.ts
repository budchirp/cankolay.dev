import { Fetch } from '@/lib/fetch'

export class Github {
  public static async getUserRepos(username: string): Promise<any> {
    const repos = await Fetch.get(`https://api.github.com/users/${username}/repos`)
    if (repos.status !== 200) return null

    return await repos.json()
  }

  public static async getUser(username: string): Promise<any> {
    const user = await Fetch.get(`https://api.github.com/users/${username}`)
    if (user.status !== 200) return null

    return await user.json()
  }

  public static async getRepo(username: string, reponame: string): Promise<any> {
    const repo = await Fetch.get(`https://api.github.com/repos/${username}/${reponame}`)
    if (repo.status !== 200) return null

    return await repo.json()
  }
}
