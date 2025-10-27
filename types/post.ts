export type RawPost = {
  slug: string
  author: string
  title: string
  description: string
  tags: string
  date: string
  imageUrl: string
}

export type PostBody = string

export type BlogPost = Omit<RawPost, 'tags' | 'date'> & {
  id: string
  body: PostBody
  tags: string[]
  date: Date
  formattedDate: string
}
