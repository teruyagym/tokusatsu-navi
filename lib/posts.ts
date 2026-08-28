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
