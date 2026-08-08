import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'

const labels = {
  vi: {
    description: 'Công ty công nghệ xây dựng các sản phẩm SaaS cho những bài toán thực tế.',
    note: 'Kênh liên hệ chính thức đang được cập nhật.',
    rights: 'Bảo lưu mọi quyền.',
  },
  en: {
    description: 'A technology company building SaaS products for real-world problems.',
    note: 'Official contact channel to be confirmed.',
    rights: 'All rights reserved.',
  },
} as const

export function Footer({ locale = defaultLocale }: { locale?: Locale }) {
  const copy = labels[locale]

  return (
    <footer className="wire-footer" id="contact">
      <div className="wire-container wire-footer__grid">
        <div>
          <Link className="wire-wordmark" href={`/${locale}`}>
            Tensoract
          </Link>
          <p>{copy.description}</p>
        </div>
        <div>
          <p className="wire-label">Contact</p>
          <p>{copy.note}</p>
        </div>
      </div>
      <div className="wire-container wire-footer__legal">
        © {new Date().getFullYear()} Tensoract Co., Ltd. {copy.rights}
      </div>
    </footer>
  )
}
