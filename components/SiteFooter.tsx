export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-3xl px-5 py-10 text-xs leading-relaxed text-neutral-400">
        <p className="mb-2">
          当サイトは、各動画配信サービスのアフィリエイトプログラムに参加しており、紹介リンク経由の申込みにより収益を得る場合があります。掲載情報の正確性には努めていますが、料金・配信状況は変更される場合があるため、最新情報は必ず公式サイトでご確認ください。
        </p>
        <p className="mb-2">
          仮面ライダー・ウルトラマン・スーパー戦隊シリーズおよび関連する名称・画像の著作権は、各作品の製作会社（東映株式会社、円谷プロダクション等）に帰属します。当サイトはこれらの企業・団体とは無関係の非公式サイトです。
        </p>
        <p>© {new Date().getFullYear()} 特撮配信ナビ</p>
      </div>
    </footer>
  )
}
