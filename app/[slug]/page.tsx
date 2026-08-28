import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllSlugs, getPostBySlug } from "@/lib/posts"
import { PRBadge } from "@/components/PRBadge"
import { ComparisonTable } from "@/components/ComparisonTable"
import { FAQSection } from "@/components/FAQSection"
import { CTAButton } from "@/components/CTAButton"
import { resolveAffiliateUrl } from "@/lib/affiliate-links"

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!getAllSlugs().includes(slug)) return {}
  const post = await getPostBySlug(slug)
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!getAllSlugs().includes(slug)) notFound()
  const post = await getPostBySlug(slug)
  const topPick = [...post.services].sort((a, b) => a.rank - b.rank)[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <nav className="mb-4 text-xs text-neutral-400">
        <Link href="/" className="hover:underline">
          特撮配信ナビ
        </Link>
        <span className="mx-1.5">/</span>
        <span>{post.category}</span>
      </nav>

      <h1 className="mb-3 text-[22px] font-bold leading-snug text-neutral-900 sm:text-[26px]">
        {post.title}
      </h1>

      <p className="mb-4 text-xs text-neutral-400">更新日：{post.updatedAt}</p>

      <PRBadge />

      <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 text-[14.5px] leading-relaxed text-neutral-700 sm:p-5">
        <span className="mr-1 font-bold text-rose-600">結論：</span>
        {post.leadAnswer}
      </div>

      <ComparisonTable services={post.services} />

      <div
        className="article-prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <FAQSection faq={post.faq} />

      {topPick && (
        <div className="mt-10 rounded-xl border border-rose-200 bg-rose-50/60 p-6 text-center">
          <p className="mb-4 text-sm font-semibold text-neutral-700">
            まとめると、まず試すなら「{topPick.name}」が一番失敗が少ない選択です。
          </p>
          <CTAButton
            href={resolveAffiliateUrl(topPick.name, topPick.affiliateUrl)}
            label={`${topPick.name}の無料体験を見る`}
            sublabel={topPick.name}
          />
        </div>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  )
}
