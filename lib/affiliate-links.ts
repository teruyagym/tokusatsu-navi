// ASPの提携が承認されたら、ここのURLを実際の追跡リンクに差し替えるだけで
// 全記事のCTAボタンに反映される。承認前は各社の公式サイトへの直リンク。
export const AFFILIATE_LINKS: Record<string, string> = {
  "DMM TV": "https://tv.dmm.com/vod/",
  "TELASA": "https://www.telasa.jp/",
  "U-NEXT": "https://video.unext.jp/",
  "Hulu": "https://www.hulu.jp/",
}

export function resolveAffiliateUrl(serviceName: string, fallbackUrl: string): string {
  return AFFILIATE_LINKS[serviceName] ?? fallbackUrl
}
