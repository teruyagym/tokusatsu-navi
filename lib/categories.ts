export type Category = {
  name: string
  slug: string
  description: string
}

// シリーズ別一覧ページ（/series/[slug]）の定義。記事frontmatterのcategoryと一致させる
export const CATEGORIES: Category[] = [
  {
    name: "スーパー戦隊",
    slug: "super-sentai",
    description:
      "スーパー戦隊シリーズの各作品について、どの動画配信サービスで見られるかを作品ごとに比較した記事の一覧です。",
  },
  {
    name: "仮面ライダー",
    slug: "kamen-rider",
    description:
      "仮面ライダーシリーズの各作品について、どの動画配信サービスで見られるかを作品ごとに比較した記事の一覧です。",
  },
  {
    name: "ウルトラマン",
    slug: "ultraman",
    description:
      "ウルトラマンシリーズの各作品について、どの動画配信サービスで見られるかを作品ごとに比較した記事の一覧です。",
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getCategorySlug(name: string): string | undefined {
  return CATEGORIES.find((c) => c.name === name)?.slug
}
