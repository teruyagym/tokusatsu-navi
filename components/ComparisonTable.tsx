import type { ServiceEntry } from "@/lib/types"
import { resolveAffiliateUrl } from "@/lib/affiliate-links"
import { CTAButton } from "./CTAButton"

export function ComparisonTable({ services }: { services: ServiceEntry[] }) {
  const sorted = [...services].sort((a, b) => a.rank - b.rank)

  return (
    <div className="not-prose my-8 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="mb-5 text-sm font-semibold text-neutral-500">結論：この記事の早見表</p>
      <div className="flex flex-col gap-4">
        {sorted.map((s) => (
          <div
            key={s.name}
            className={`rounded-lg border p-4 sm:p-5 ${
              s.rank === 1 ? "border-rose-300 bg-rose-50/60" : "border-neutral-200"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                  s.rank === 1 ? "bg-rose-600 text-white" : "bg-neutral-200 text-neutral-600"
                }`}
              >
                {s.rank}
              </span>
              <span className="text-lg font-bold text-neutral-900">{s.name}</span>
              {s.rank === 1 && (
                <span className="rounded bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white">
                  イチ推し
                </span>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
              <div>
                <p className="text-[11px] text-neutral-400">月額料金</p>
                <p className="font-semibold text-neutral-800">{s.price}</p>
              </div>
              <div>
                <p className="text-[11px] text-neutral-400">無料期間</p>
                <p className="font-semibold text-neutral-800">{s.trial}</p>
              </div>
              <div>
                <p className="text-[11px] text-neutral-400">該当作品</p>
                <p className={`font-semibold ${s.hasContent ? "text-emerald-600" : "text-neutral-400"}`}>
                  {s.hasContent ? "配信あり" : s.contentNote ?? "配信なし"}
                </p>
              </div>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">{s.recommendReason}</p>

            <div className="mt-4">
              <CTAButton
                href={resolveAffiliateUrl(s.name, s.affiliateUrl)}
                label={`${s.name}を無料で試す`}
                sublabel={s.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
