import Link from "next/link"
import type { PostFrontmatter } from "@/lib/types"

export function RelatedArticles({ posts }: { posts: PostFrontmatter[] }) {
  if (!posts.length) return null

  return (
    <div className="not-prose mt-10">
      <h2 className="mb-4 text-xl font-bold text-neutral-900">こちらの作品もチェック</h2>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-rose-300 hover:bg-rose-50/40"
          >
            <p className="text-[15px] font-semibold text-neutral-900">{post.title}</p>
            <p className="mt-1 text-xs text-neutral-400">{post.category}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
