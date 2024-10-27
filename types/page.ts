export type DynamicPageProps = {
  params: Promise<{
    [key: string]: string
  }>
  searchParams: Promise<{ [key: string]: string | null | undefined }>
}
