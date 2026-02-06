export type PostFrontMatter = {
  slug: string
  title: string
  description: string
  date: string
  image: string
}

export type PostBody = string

export type BlogPost = Omit<PostFrontMatter, 'date'> & {
  id: string
  body: PostBody
  date: Date
}
