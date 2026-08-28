export type ServiceEntry = {
  name: string
  logo?: string
  price: string
  trial: string
  hasContent: boolean
  contentNote?: string
  affiliateUrl: string
  rank: number
  recommendReason: string
}

export type FaqEntry = {
  q: string
  a: string
}

export type PostFrontmatter = {
  title: string
  slug: string
  category: string
  metaDescription: string
  keyword: string
  publishedAt: string
  updatedAt: string
  leadAnswer: string
  services: ServiceEntry[]
  faq: FaqEntry[]
}

export type Post = PostFrontmatter & {
  contentHtml: string
}
