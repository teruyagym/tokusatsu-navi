import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-rose-600 text-sm font-black text-white">特</span>
          <span className="text-[15px] font-bold tracking-tight text-neutral-900">特撮配信ナビ</span>
        </Link>
        <p className="hidden text-xs text-neutral-400 sm:block">仮面ライダー・ウルトラマン・戦隊の配信先ガイド</p>
      </div>
    </header>
  )
}
