export class Fetch {
  private static fetch = <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    cache: RequestCache = 'no-cache',
    headers?: Record<string, string>,
    body?: Record<string, unknown> | FormData
  ) => {
    return fetch(url, {
      method,
      headers: {
        ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers
      },
      cache,
      body: body instanceof FormData ? body : JSON.stringify(body)
    }) as Promise<
      {
        json: () => Promise<T>
      } & Response
    >
  }

  public static get = async <T>(
    url: string,
    cache: boolean = false,
    headers?: Record<string, string>
  ) => await Fetch.fetch<T>(url, 'GET', cache ? 'force-cache' : 'no-cache', headers, undefined)

  public static post = async <T>(
    url: string,
    cache: boolean = false,
    body?: Record<string, unknown> | FormData,
    headers?: Record<string, string>
  ) => await Fetch.fetch<T>(url, 'POST', cache ? 'force-cache' : 'no-cache', headers, body)

  public static put = async <T>(
    url: string,
    cache: boolean = false,
    body?: Record<string, unknown> | FormData,
    headers?: Record<string, string>
  ) => await Fetch.fetch<T>(url, 'PUT', cache ? 'force-cache' : 'no-cache', headers, body)

  public static delete = async <T>(
    url: string,
    cache: boolean = false,
    headers?: Record<string, string>
  ) => await Fetch.fetch<T>(url, 'DELETE', cache ? 'force-cache' : 'no-cache', headers, undefined)

  public static patch = async <T>(
    url: string,
    cache: boolean = false,
    body?: Record<string, unknown> | FormData,
    headers?: Record<string, string>
  ) => await Fetch.fetch<T>(url, 'PATCH', cache ? 'force-cache' : 'no-cache', headers, body)
}
