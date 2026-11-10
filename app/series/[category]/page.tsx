import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPostsMeta } from "@/lib/posts"
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories"

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) return {}
  const title = `${cat.name}はどこで見れる？配信サービスを作品別に比較`
  return {
    title,
    description: cat.description,
    alternates: { canonical: `/series/${cat.slug}` },
    openGraph: { title, description: cat.description, type: "website" },
  }
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()
  const posts = getAllPostsMeta().filter((p) => p.category === cat.name)

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <nav className="mb-4 text-xs text-neutral-400">
        <Link href="/" className="hover:underline">
          特撮配信ナビ
        </Link>
        <span className="mx-1.5">/</span>
        <span>{cat.name}</span>
      </nav>

      <h1 className="mb-3 text-[22px] font-bold leading-snug text-neutral-900 sm:text-[26px]">
        {cat.name}はどこで見れる？配信サービスを作品別に比較
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-neutral-600">
        {cat.description}
        配信状況や料金は変わることがあるため、各記事の更新日もあわせてご確認ください。
      </p>

      {posts.length === 0 ? (
        <p className="text-sm text-neutral-400">記事を準備中です。</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-rose-300 hover:bg-rose-50/40"
            >
              <p className="text-[15px] font-semibold text-neutral-900">{post.title}</p>
              <p className="mt-1 text-xs text-neutral-400">更新日：{post.updatedAt}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-2 text-sm">
        {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
          <Link
            key={c.slug}
            href={`/series/${c.slug}`}
            className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-neutral-700 hover:border-rose-300"
          >
            {c.name}の配信一覧
          </Link>
        ))}
      </div>
    </div>
  )
}
