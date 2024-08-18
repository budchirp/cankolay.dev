export type DynamicPageProps = {
  params: {
    [key: string]: string
  }
  searchParams: { [key: string]: string | null | undefined }
}
