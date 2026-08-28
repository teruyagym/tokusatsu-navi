"use client"

type CTAButtonProps = {
  href: string
  label: string
  sublabel?: string
}

export function CTAButton({ href, label, sublabel }: CTAButtonProps) {
  const handleClick = () => {
    window.gtag?.("event", "affiliate_click", {
      service_name: sublabel ?? label,
      link_url: href,
      page_path: window.location.pathname,
    })
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener"
        onClick={handleClick}
        className="inline-flex w-full max-w-md items-center justify-center rounded-lg bg-rose-600 px-6 py-3.5 text-center text-base font-bold text-white shadow-sm transition hover:bg-rose-700 active:scale-[0.99] sm:w-auto sm:px-10"
      >
        {label}
      </a>
      {sublabel && <p className="text-[11px] text-neutral-400">{sublabel}（PR）</p>}
    </div>
  )
}
