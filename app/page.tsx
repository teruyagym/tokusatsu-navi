import Link from "next/link"
import { getAllPostsMeta } from "@/lib/posts"

export default function Home() {
  const posts = getAllPostsMeta()
  const categories = Array.from(new Set(posts.map((p) => p.category)))

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <section className="mb-10 rounded-xl border border-neutral-200 bg-white p-6 sm:p-8">
        <h1 className="mb-3 text-xl font-bold text-neutral-900 sm:text-2xl">
          仮面ライダー・ウルトラマン・戦隊、今どこで見れる？を最短で解決
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          作品ごとに配信サービスを比較し、無料期間・料金・過去作の網羅度まで具体的に案内するガイドサイトです。
          「結局どれに入ればいいか」を、記事の冒頭で先に結論として提示します。
        </p>
      </section>

      {categories.length === 0 ? (
        <p className="text-sm text-neutral-400">記事を準備中です。</p>
      ) : (
        categories.map((category) => (
          <section key={category} className="mb-10">
            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-base font-bold text-neutral-800">
              {category}
            </h2>
            <div className="flex flex-col gap-3">
              {posts
                .filter((p) => p.category === category)
                .map((post) => (
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
          </section>
        ))
      )}

      <section className="mt-12 rounded-xl border border-neutral-200 bg-neutral-100 p-6 text-xs leading-relaxed text-neutral-500">
        <p className="mb-2 font-bold text-neutral-700">このサイトについて</p>
        <p>
          特撮配信ナビは、各動画配信サービスの公式サイト・アプリで実際に作品の配信状況を確認したうえで記事を作成しています。
          料金・配信作品はサービス側の都合で変更されることがあるため、最終的な申込み判断は必ず公式サイトの表示でご確認ください。
        </p>
      </section>
    </div>
  )
}
