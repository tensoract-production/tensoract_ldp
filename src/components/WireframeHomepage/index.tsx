import Link from 'next/link'

import { TensoractHero } from '@/components/TensoractHero'
import type { Locale } from '@/i18n/config'
import type { Post } from '@/payload-types'

type Insight = Pick<Post, 'id' | 'meta' | 'publishedAt' | 'slug' | 'title'>

const content = {
  vi: {
    hero: {
      body: 'SaaS và AI từ những bài toán vận hành thực tế.',
      affiliations: 'Đối tác và tổ chức đồng hành',
      imageAlt: 'Ecombox trình bày tại Demo Day UII trước khán giả trong hội trường.',
    },
    about: {
      label: '01 / Tensoract',
      title: 'Chúng tôi xây dựng sản phẩm từ những vấn đề thực tế.',
      body: [
        'Tensoract là công ty công nghệ được thành lập năm 2022, tập trung xây dựng các sản phẩm SaaS, AI và giải pháp phục vụ hoạt động thương mại.',
        'Từ những bài toán trong quá trình vận hành, đội ngũ phát triển các giải pháp có khả năng trở thành sản phẩm độc lập.',
      ],
      transition: 'Một trong những sản phẩm được hình thành từ cách tiếp cận đó là Ecombox.',
      facts: [['Thành lập', '2022'], ['Trọng tâm', 'SaaS / AI / Commerce'], ['Trụ sở', 'Việt Nam']],
    },
    product: {
      label: '02 / Flagship product',
      title: 'Ecombox',
      headline: 'Tạo bản ghi cho một quy trình vận hành quan trọng.',
      body: 'Ecombox tạo bản ghi bằng AI cho quá trình đóng gói, gắn dữ liệu với mã đơn hàng và được triển khai theo nhu cầu vận hành của doanh nghiệp.',
      capabilities: ['Ghi nhận quá trình đóng gói', 'Liên kết với mã đơn hàng', 'Triển khai và bàn giao cho doanh nghiệp'],
      cta: '[URL sản phẩm đang chờ xác nhận]',
    },
    recognition: {
      label: '03 / Awards & recognition',
      title: 'Từ sản phẩm đến sự công nhận.',
      intro: 'Chỉ những giải thưởng, chương trình hoặc kết quả có thể xác minh mới được công bố tại đây.',
      items: [
        ['2024', 'Startup Wheel', 'Ecombox được người sáng lập mang đến chương trình. Kết quả đang chờ xác minh.'],
        ['[Năm]', '[Giải thưởng / chương trình]', '[Thông tin đang chờ xác minh]'],
      ],
    },
    journey: {
      label: '04 / Journey',
      title: 'Từ Tensoract đến chặng đường tiếp theo.',
      items: [
        ['2022', 'Khởi đầu', 'Tensoract được thành lập tại Thành phố Hồ Chí Minh.'],
        ['2023', 'Xây nền tảng', '[Milestone sản phẩm đang chờ xác minh]'],
        ['2024', 'Ecombox', 'Ecombox xuất hiện tại Startup Wheel 2024.'],
        ['2025', 'Validation', '[Kết quả thị trường hoặc giải thưởng đang chờ xác minh]'],
        ['2026', 'Scale', '[WMS / OMNI / enterprise direction đang chờ xác nhận]'],
      ],
    },
    leadership: {
      label: '05 / Leadership',
      title: 'Những người dẫn dắt Tensoract.',
      intro: 'Danh sách này chỉ dành cho những vai trò chủ chốt đã được xác nhận, không đại diện cho toàn bộ đội ngũ.',
      people: [
        ['Võ Quốc Thịnh', 'Founder'],
        ['[Tên đang xác nhận]', '[Vai trò lãnh đạo]'],
        ['[Tên đang xác nhận]', '[Vai trò lãnh đạo]'],
      ],
    },
    vision: {
      label: '06 / Vision — next chapter',
      title: 'Xây dựng sản phẩm công nghệ từ Việt Nam cho khu vực.',
      body: 'Tensoract hướng tới việc biến hiểu biết sâu về những vấn đề vận hành tại Việt Nam thành các sản phẩm SaaS có khả năng mở rộng trong khu vực Đông Nam Á.',
    },
    insights: { label: '07 / Insights', title: 'Góc nhìn mới nhất', intro: 'Các ghi chép về sản phẩm, kỹ thuật và quá trình xây dựng công ty.', empty: 'Chưa có bài viết được xuất bản.', cta: 'Xem tất cả bài viết' },
    careers: { label: '08 / Careers', title: 'Xây dựng sản phẩm cùng Tensoract', body: 'Chúng tôi tìm kiếm những người muốn giải quyết vấn đề thực tế bằng sản phẩm công nghệ.', cta: '[Thông tin vị trí đang cập nhật]' },
    investor: { label: '09 / Investors & partnerships', title: 'Cùng trao đổi về chặng đường tiếp theo.', body: 'Tensoract chào đón các đối tác và nhà đầu tư muốn tìm hiểu sâu hơn về sản phẩm, thị trường và hướng phát triển.', cta: '[Kênh liên hệ đang xác nhận]' },
  },
  en: {
    hero: {
      body: 'SaaS and AI from real operational problems.',
      affiliations: 'Partners and supporting organizations',
      imageAlt: 'Ecombox presenting at Demo Day UII in front of an auditorium audience.',
    },
    about: { label: '01 / Tensoract', title: 'We build products from real-world problems.', body: ['Tensoract is a technology company founded in 2022, focused on SaaS, AI, and products serving commerce operations.', 'From operational problems, the team develops solutions with the potential to become independent products.'], transition: 'One product shaped by this approach is Ecombox.', facts: [['Founded', '2022'], ['Focus', 'SaaS / AI / Commerce'], ['Based in', 'Vietnam']] },
    product: { label: '02 / Flagship product', title: 'Ecombox', headline: 'Creating a record for a critical operational process.', body: 'Ecombox creates an AI record of the packing process, connects data to order codes, and is deployed around enterprise operations.', capabilities: ['Packing process records', 'Data linked to order codes', 'Enterprise deployment and handover'], cta: '[Product URL awaiting confirmation]' },
    recognition: { label: '03 / Awards & recognition', title: 'From product to validation.', intro: 'Only awards, programs, or outcomes that can be verified will be published here.', items: [['2024', 'Startup Wheel', 'The founder presented Ecombox at the program. Outcome awaiting verification.'], ['[Year]', '[Award / program]', '[Information awaiting verification]']] },
    journey: { label: '04 / Journey', title: 'From Tensoract to the next chapter.', items: [['2022', 'The beginning', 'Tensoract was founded in Ho Chi Minh City.'], ['2023', 'Building foundations', '[Product milestone awaiting verification]'], ['2024', 'Ecombox', 'Ecombox appeared at Startup Wheel 2024.'], ['2025', 'Validation', '[Market result or award awaiting verification]'], ['2026', 'Scale', '[WMS / OMNI / enterprise direction awaiting confirmation]']] },
    leadership: { label: '05 / Leadership', title: 'The people leading Tensoract.', intro: 'This list is limited to confirmed key roles and does not represent the whole team.', people: [['Võ Quốc Thịnh', 'Founder'], ['[Name to confirm]', '[Leadership role]'], ['[Name to confirm]', '[Leadership role]']] },
    vision: { label: '06 / Vision — next chapter', title: 'Building technology products in Vietnam for the region.', body: 'Tensoract aims to turn a deep understanding of operational problems in Vietnam into SaaS products that can scale across Southeast Asia.' },
    insights: { label: '07 / Insights', title: 'Latest insights', intro: 'Notes on products, engineering, and building the company.', empty: 'No posts have been published yet.', cta: 'View all insights' },
    careers: { label: '08 / Careers', title: 'Build products with Tensoract', body: 'We are looking for people who want to solve real problems through technology products.', cta: '[Open roles to be updated]' },
    investor: { label: '09 / Investors & partnerships', title: 'Let’s discuss what comes next.', body: 'Tensoract welcomes partners and investors who want to learn more about the products, market, and direction.', cta: '[Contact channel to be confirmed]' },
  },
} as const

const affiliations = [
  { name: 'Google Cloud', logo: '/partners/google-cloud.png', width: 560, height: 97 },
  { name: 'Microsoft', logo: '/partners/microsoft.svg', width: 21, height: 21, showName: true },
  { name: 'AWS', logo: '/partners/aws.png', width: 168, height: 102 },
  { name: 'Cloudflare', logo: '/partners/cloudflare.png', width: 512, height: 173 },
  { name: 'Startup Wheel', logo: '/partners/startup-wheel.png', width: 40, height: 40, showName: true },
  { name: 'VinUniversity', logo: '/partners/vinuniversity.png', width: 350, height: 214 },
] as const

function Heading({ intro, label, title }: { intro?: string; label: string; title: string }) {
  return <div className="wire-heading"><p className="wire-label">{label}</p><h2>{title}</h2>{intro && <p>{intro}</p>}</div>
}

export function WireframeHomepage({ locale, posts }: { locale: Locale; posts: Insight[] }) {
  const copy = content[locale]

  return <div className="wire-home">
    <TensoractHero affiliations={affiliations} copy={copy.hero} />

    <section className="wire-section" id="about">
      <div className="wire-container wire-about"><div><Heading label={copy.about.label} title={copy.about.title} />{copy.about.body.map((paragraph) => <p className="wire-about__copy" key={paragraph}>{paragraph}</p>)}<p className="wire-transition">{copy.about.transition} ↓</p></div><dl className="wire-facts">{copy.about.facts.map(([label, value]) => <div key={label}><dt className="wire-label">{label}</dt><dd>{value}</dd></div>)}</dl></div>
    </section>

    <section className="wire-section wire-section--muted" id="ecombox">
      <div className="wire-container"><Heading label={copy.product.label} title={copy.product.title} /><div className="wire-product"><div className="wire-placeholder">ECOMBOX PRODUCT SHOWCASE</div><div><h3>{copy.product.headline}</h3><p>{copy.product.body}</p><ul className="wire-list">{copy.product.capabilities.map((item) => <li key={item}>{item}</li>)}</ul><span className="wire-button wire-button--disabled">{copy.product.cta}</span></div></div></div>
    </section>

    <section className="wire-section" id="recognition">
      <div className="wire-container"><Heading intro={copy.recognition.intro} label={copy.recognition.label} title={copy.recognition.title} /><div className="wire-recognition">{copy.recognition.items.map(([year, name, detail]) => <article key={`${year}-${name}`}><span className="wire-index">{year}</span><h3>{name}</h3><p>{detail}</p></article>)}</div></div>
    </section>

    <section className="wire-section wire-section--muted" id="journey">
      <div className="wire-container"><Heading label={copy.journey.label} title={copy.journey.title} /><ol className="wire-journey">{copy.journey.items.map(([year, title, body]) => <li key={year}><span>{year}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div>
    </section>

    <section className="wire-section" id="leadership">
      <div className="wire-container"><Heading intro={copy.leadership.intro} label={copy.leadership.label} title={copy.leadership.title} /><div className="wire-leaders">{copy.leadership.people.map(([name, role], index) => <article key={`${name}-${index}`}><div className="wire-portrait">PORTRAIT</div><h3>{name}</h3><p>{role}</p></article>)}</div></div>
    </section>

    <section className="wire-section wire-statement" id="vision"><div className="wire-container"><p className="wire-label">{copy.vision.label}</p><h2>{copy.vision.title}</h2><p>{copy.vision.body}</p></div></section>

    <section className="wire-section wire-section--muted" id="insights"><div className="wire-container"><Heading intro={copy.insights.intro} label={copy.insights.label} title={copy.insights.title} />{posts.length ? <div className="wire-grid wire-grid--3">{posts.map((post) => <article className="wire-card" key={post.id}><p className="wire-label">{post.publishedAt ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(post.publishedAt)) : '—'}</p><h3><Link href={`/${locale}/posts/${post.slug}`}>{post.title}</Link></h3><p>{post.meta?.description}</p></article>)}</div> : <div className="wire-empty">{copy.insights.empty}</div>}<Link className="wire-text-link" href={`/${locale}/posts`}>{copy.insights.cta} →</Link></div></section>

    <section className="wire-section" id="careers"><div className="wire-container wire-split"><Heading label={copy.careers.label} title={copy.careers.title} /><div><p className="wire-lead wire-lead--small">{copy.careers.body}</p><span className="wire-button wire-button--disabled">{copy.careers.cta}</span></div></div></section>

    <section className="wire-section wire-cta" id="partners"><div className="wire-container"><p className="wire-label">{copy.investor.label}</p><h2>{copy.investor.title}</h2><p>{copy.investor.body}</p><span className="wire-button wire-button--disabled">{copy.investor.cta}</span></div></section>
  </div>
}
