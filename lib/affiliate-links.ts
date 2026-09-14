// ASPの提携が承認されたら、ここのURLを実際の追跡リンクに差し替えるだけで
// 全記事のCTAボタンに反映される。承認前は各社の公式サイトへの直リンク。
export const AFFILIATE_LINKS: Record<string, string> = {
  "DMM TV": "https://al.dmm.com/?lurl=https%3A%2F%2Ftv.dmm.com%2Fvod%2F&af_id=tokusatsunav-001&ch=link_tool&ch_id=link",
  "TELASA": "https://www.telasa.jp/",
  "U-NEXT": "https://px.a8.net/svt/ejp?a8mat=4BC1MF+A9Q7G2+3250+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.video.unext.jp%2Flp%2Fppd_contents_h_ud02",
  "Hulu": "https://www.hulu.jp/",
}

export function resolveAffiliateUrl(serviceName: string, fallbackUrl: string): string {
  return AFFILIATE_LINKS[serviceName] ?? fallbackUrl
}
