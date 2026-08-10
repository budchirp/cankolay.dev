export class Github {
  private static headers = {
    Authorization: `Basic ${btoa(`${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_TOKEN}`)}`
  }

  public static getRepo = async (username: string, reponame: string): Promise<any> => {
    'use server'

    const repo = await fetch(`https://api.github.com/repos/${username}/${reponame}`, {
      cache: 'force-cache',
      headers: Github.headers
    })
    if (repo.status !== 200) return null

    return await repo.json()
  }
}
