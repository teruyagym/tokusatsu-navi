import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import html from "remark-html"
import type { Post, PostFrontmatter } from "./types"

const CONTENT_DIR = path.join(process.cwd(), "content")

function readSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getAllSlugs(): string[] {
  return readSlugs()
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content)
  return {
    ...(data as PostFrontmatter),
    contentHtml: processed.toString(),
  }
}

export function getAllPostsMeta(): PostFrontmatter[] {
  return readSlugs()
    .map((slug) => {
      const filePath = path.join(CONTENT_DIR, `${slug}.md`)
      const raw = fs.readFileSync(filePath, "utf8")
      const { data } = matter(raw)
      return data as PostFrontmatter
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): PostFrontmatter[] {
  // 新しい記事だけにリンクが集まらないよう、同じシリーズ内で公開順が近い記事（前後）を選ぶ
  const all = getAllPostsMeta()
  const sameCategory = all.filter((p) => p.category === category)
  const idx = sameCategory.findIndex((p) => p.slug === currentSlug)
  const neighbors: PostFrontmatter[] = []
  for (let step = 1; neighbors.length < limit && step < sameCategory.length; step++) {
    for (const i of [idx + step, idx - step]) {
      const n = sameCategory[(i + sameCategory.length) % sameCategory.length]
      if (n && n.slug !== currentSlug && !neighbors.includes(n) && neighbors.length < limit) neighbors.push(n)
    }
  }
  const rest = all.filter((p) => p.category !== category)
  return [...neighbors, ...rest].slice(0, limit)
}
