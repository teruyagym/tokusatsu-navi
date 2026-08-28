import type { FaqEntry } from "@/lib/types"

export function FAQSection({ faq }: { faq: FaqEntry[] }) {
  if (!faq?.length) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <div className="not-prose my-8">
      <h2 className="mb-4 text-xl font-bold text-neutral-900">よくある質問</h2>
      <div className="flex flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
        {faq.map((f) => (
          <details key={f.q} className="group p-4 sm:p-5">
            <summary className="flex cursor-pointer list-none items-start gap-2 font-semibold text-neutral-800 marker:content-none">
              <span className="text-rose-600">Q.</span>
              <span className="flex-1">{f.q}</span>
              <span className="text-neutral-400 transition group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-3 flex gap-2 text-sm leading-relaxed text-neutral-600">
              <span className="font-bold text-neutral-400">A.</span>
              <span>{f.a}</span>
            </p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}
