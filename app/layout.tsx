import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Sans_JP } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GAPageViewTracker } from "@/components/GAPageViewTracker";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tokusatsu-navi.com"),
  title: {
    default: "特撮配信ナビ｜仮面ライダー・ウルトラマン・戦隊の配信先ガイド",
    template: "%s｜特撮配信ナビ",
  },
  description:
    "仮面ライダー・ウルトラマン・スーパー戦隊シリーズがどの配信サービスで見られるかを、作品ごとに徹底比較するガイドサイト。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-50 font-sans text-neutral-900">
        <GoogleAnalytics />
        <Suspense>
          <GAPageViewTracker />
        </Suspense>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
