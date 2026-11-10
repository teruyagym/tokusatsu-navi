import type { MetadataRoute } from "next"
import { getAllPostsMeta } from "@/lib/posts"
import { CATEGORIES } from "@/lib/categories"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tokusatsu-navi.com"
  const posts = getAllPostsMeta()

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...CATEGORIES.map((c) => ({
      url: `${baseUrl}/series/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
