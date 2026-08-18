import Image from 'next/image'
import Link from 'next/link'

import { AwardsWaveGallery } from '@/components/AwardsWaveGallery'
import type { AwardSlide } from '@/components/AwardsWaveGallery'
import { SectionScrollTransitions } from '@/components/SectionScrollTransitions'
import { TensoractHero } from '@/components/TensoractHero'
import type { Locale } from '@/i18n/config'
import type { Post } from '@/payload-types'

type Insight = Pick<Post, 'id' | 'meta' | 'publishedAt' | 'slug' | 'title'>

const content = {
  vi: {
    hero: {
      body: 'Từ bài toán vận hành đến giải pháp công nghệ.',
      affiliations: 'Đối tác và tổ chức đồng hành',
      imageAlt: 'Ecombox trình bày tại Demo Day UII trước khán giả trong hội trường.',
    },
    about: {
      title: 'Tensoract xây dựng sản phẩm từ những vấn đề đủ thật.',
      body: 'Chúng tôi biến hiểu biết từ vận hành thực tế thành những sản phẩm công nghệ có thể triển khai, bàn giao và tiếp tục mở rộng.',
      cta: 'Xem sản phẩm cốt lõi',
      visualAlt: 'Đại diện Ecombox trao đổi với khách tham quan tại Demo Day UII.',
    },
    product: {
      title: 'Ecombox',
      headline: 'Ecombox là sản phẩm cốt lõi của Tensoract.',
      body: 'Được phát triển từ nhu cầu vận hành thương mại điện tử thực tế, Ecombox tạo bản ghi bằng AI cho quá trình đóng gói, gắn dữ liệu với mã đơn hàng và được triển khai theo nhu cầu của doanh nghiệp.',
      capabilities: ['Ghi nhận quá trình đóng gói', 'Liên kết với mã đơn hàng', 'Triển khai và bàn giao cho doanh nghiệp'],
      cta: 'Khám phá Ecombox',
      imageAlt: 'Trình diễn quy trình quay video đóng hàng của Ecombox tại Startup Wheel 2025.',
      imageNote: 'Demo quay đóng hàng tại Startup Wheel 2025',
    },
    recognition: {
      title: 'Từ sản phẩm đến sự công nhận.',
      intro: 'Chỉ những giải thưởng, chương trình hoặc kết quả có thể xác minh mới được công bố tại đây.',
      items: [
        ['2024', 'Startup Wheel', 'Ecombox được người sáng lập mang đến chương trình. Kết quả đang chờ xác minh.'],
        ['[Năm]', '[Giải thưởng / chương trình]', '[Thông tin đang chờ xác minh]'],
      ],
    },
    journey: {
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
      title: 'Những người dẫn dắt Tensoract.',
      intro: 'Danh sách này chỉ dành cho những vai trò chủ chốt đã được xác nhận, không đại diện cho toàn bộ đội ngũ.',
      people: [
        ['Võ Quốc Thịnh', 'Founder'],
        ['[Tên đang xác nhận]', '[Vai trò lãnh đạo]'],
        ['[Tên đang xác nhận]', '[Vai trò lãnh đạo]'],
      ],
    },
    vision: {
      title: 'Xây dựng sản phẩm công nghệ từ Việt Nam cho khu vực.',
      body: 'Tensoract hướng tới việc biến hiểu biết sâu về những vấn đề vận hành tại Việt Nam thành các sản phẩm SaaS có khả năng mở rộng trong khu vực Đông Nam Á.',
    },
    insights: { title: 'Góc nhìn mới nhất', intro: 'Các ghi chép về sản phẩm, kỹ thuật và quá trình xây dựng công ty.', empty: 'Chưa có bài viết được xuất bản.', cta: 'Xem tất cả bài viết' },
    careers: { title: 'Xây dựng sản phẩm cùng Tensoract', body: 'Chúng tôi tìm kiếm những người muốn giải quyết vấn đề thực tế bằng sản phẩm công nghệ.', cta: '[Thông tin vị trí đang cập nhật]' },
    investor: { title: 'Cùng trao đổi về chặng đường tiếp theo.', body: 'Tensoract chào đón các đối tác và nhà đầu tư muốn tìm hiểu sâu hơn về sản phẩm, thị trường và hướng phát triển.', cta: '[Kênh liên hệ đang xác nhận]' },
  },
  en: {
    hero: {
      body: 'SaaS and AI from real operational problems.',
      affiliations: 'Partners and supporting organizations',
      imageAlt: 'Ecombox presenting at Demo Day UII in front of an auditorium audience.',
    },
    about: { title: 'Tensoract builds products from problems real enough to matter.', body: 'We turn operational understanding into technology products that can be deployed, handed over, and expanded over time.', cta: 'View the core product', visualAlt: 'An Ecombox representative speaking with a visitor at Demo Day UII.' },
    product: { title: 'Ecombox', headline: 'Ecombox is Tensoract’s core product.', body: 'Developed from real e-commerce operations, Ecombox creates an AI record of the packing process, connects data to order codes, and is deployed around enterprise needs.', capabilities: ['Packing process records', 'Data linked to order codes', 'Enterprise deployment and handover'], cta: 'Explore Ecombox', imageAlt: 'Ecombox demonstrating its packing video workflow at Startup Wheel 2025.', imageNote: 'Packing demo at Startup Wheel 2025' },
    recognition: { title: 'From product to validation.', intro: 'Only awards, programs, or outcomes that can be verified will be published here.', items: [['2024', 'Startup Wheel', 'The founder presented Ecombox at the program. Outcome awaiting verification.'], ['[Year]', '[Award / program]', '[Information awaiting verification]']] },
    journey: { title: 'From Tensoract to the next chapter.', items: [['2022', 'The beginning', 'Tensoract was founded in Ho Chi Minh City.'], ['2023', 'Building foundations', '[Product milestone awaiting verification]'], ['2024', 'Ecombox', 'Ecombox appeared at Startup Wheel 2024.'], ['2025', 'Validation', '[Market result or award awaiting verification]'], ['2026', 'Scale', '[WMS / OMNI / enterprise direction awaiting confirmation]']] },
    leadership: { title: 'The people leading Tensoract.', intro: 'This list is limited to confirmed key roles and does not represent the whole team.', people: [['Võ Quốc Thịnh', 'Founder'], ['[Name to confirm]', '[Leadership role]'], ['[Name to confirm]', '[Leadership role]']] },
    vision: { title: 'Building technology products in Vietnam for the region.', body: 'Tensoract aims to turn a deep understanding of operational problems in Vietnam into SaaS products that can scale across Southeast Asia.' },
    insights: { title: 'Latest insights', intro: 'Notes on products, engineering, and building the company.', empty: 'No posts have been published yet.', cta: 'View all insights' },
    careers: { title: 'Build products with Tensoract', body: 'We are looking for people who want to solve real problems through technology products.', cta: '[Open roles to be updated]' },
    investor: { title: 'Let’s discuss what comes next.', body: 'Tensoract welcomes partners and investors who want to learn more about the products, market, and direction.', cta: '[Contact channel to be confirmed]' },
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

const ecomboxLetters = [...'ECOMBOX']

const awardSlidePool = [
  '/assets/demo-day-uii/img-2007.jpg',
  '/assets/demo-day-uii/img-5057.jpg',
  '/assets/demo-day-uii/img-5065.jpg',
  '/assets/demo-day-uii/vnp-0106.jpg',
  '/assets/demo-day-uii/vnp-0114.jpg',
  '/assets/demo-day-uii/vnp-0150.jpg',
  '/assets/demo-day-uii/muoimedia-04015.jpg',
  '/assets/demo-day-uii/muoimedia-04781.jpg',
  '/assets/demo-day-uii/team-ecombox-champion-01.jpg',
  '/assets/demo-day-uii/team-ecombox-champion-02.jpg',
  '/assets/demo-day-uii/phk-00922.jpg',
  '/assets/demo-day-uii/r6ne-7178.jpg',
] as const

const buildAwardSlides = (
  items: ReadonlyArray<readonly [string, string, string]>,
): AwardSlide[] => {
  const captioned: AwardSlide[] = items.slice(0, awardSlidePool.length).map(
    ([year, name, detail], index): AwardSlide => ({
      alt: name,
      detail,
      image: awardSlidePool[index]!,
      name,
      year,
    }),
  )
  const padding: AwardSlide[] = awardSlidePool
    .slice(captioned.length)
    .map((image) => ({ alt: '', image }))
  return [...captioned, ...padding]
}

function SectionBackground() {
  return <div aria-hidden="true" className="wire-section__background" data-section-background />
}

function Heading({ intro, title }: { intro?: string; title: string }) {
  return <div className="wire-heading" data-section-animate><h2>{title}</h2>{intro && <p>{intro}</p>}</div>
}

export function WireframeHomepage({ locale, posts }: { locale: Locale; posts: Insight[] }) {
  const copy = content[locale]

  return <div className="wire-home">
    <TensoractHero affiliations={affiliations} copy={copy.hero} />

    <SectionScrollTransitions>
      <section className="wire-section wire-about-section" data-section-panel id="about">
        <SectionBackground />
        <div className="wire-container wire-about">
          <div className="wire-about__content">
            <div className="wire-about__intro" data-section-animate>
              <h2>
                {copy.about.title}
              </h2>
              <p className="wire-about__copy">{copy.about.body}</p>
              <Link className="wire-about__link" href={`/${locale}#ecombox`}>
                {copy.about.cta} <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>

          <figure className="wire-about__media" data-section-animate data-section-fade-only>
            <Image
              alt={copy.about.visualAlt}
              className="wire-about__image"
              fill
              quality={85}
              sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 64rem) 44vw, 36rem"
              src="/assets/demo-day-uii/muoimedia-04015.jpg"
            />
          </figure>
        </div>
      </section>

      <section
        className="wire-section wire-ecombox-section"
        data-brand-reveal
        data-section-header-color="#ffedd5"
        data-section-hold="1.6"
        data-section-panel
        id="ecombox"
      >
        <SectionBackground />
        <div className="wire-container wire-ecombox">
          <h2 aria-label={copy.product.title} className="wire-ecombox__wordmark">
            {ecomboxLetters.map((letter, index) => (
              <span
                aria-hidden="true"
                data-brand-letter
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
          </h2>

          <figure className="wire-ecombox__media" data-brand-media>
            <Image
              alt={copy.product.imageAlt}
              className="wire-ecombox__image"
              fill
              loading="eager"
              quality={85}
              sizes="(max-width: 48rem) calc(100vw - 2rem), min(58vw, 48rem)"
              src="/assets/demo-day-uii/img-2639.jpg"
            />
          </figure>

          <div aria-hidden="true" className="wire-ecombox__cutout" data-brand-cutout>
            <Image
              alt=""
              className="wire-ecombox__cutout-image"
              fill
              loading="eager"
              quality={90}
              sizes="(max-width: 48rem) calc(100vw - 2rem), min(58vw, 48rem)"
              src="/assets/demo-day-uii/ecombox-duo-cutout.png"
            />
          </div>

          <p className="wire-ecombox__note" data-brand-note>{copy.product.imageNote}</p>

          <div className="wire-ecombox__story" data-brand-story>
            <h3>{copy.product.headline}</h3>
            <p>{copy.product.body}</p>
            <a
              className="wire-ecombox__link"
              href="https://ecombox.vn"
              rel="noreferrer"
              target="_blank"
            >
              {copy.product.cta} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div aria-hidden="true" className="wire-ecombox__tensoract">
            <span data-brand-tensoract>TENSORACT</span>
          </div>
        </div>
      </section>
    </SectionScrollTransitions>

    <AwardsWaveGallery
      intro={copy.recognition.intro}
      slides={buildAwardSlides(copy.recognition.items)}
      title={copy.recognition.title}
    />

    <div aria-hidden="true" className="wire-awards-wave__tail" />

    <SectionScrollTransitions>
      <section className="wire-section wire-section--muted" data-section-panel id="journey">
        <SectionBackground />
        <div className="wire-container"><Heading title={copy.journey.title} /><ol className="wire-journey">{copy.journey.items.map(([year, title, body]) => <li data-section-animate key={year}><span>{year}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div>
      </section>

      <section className="wire-section" data-section-panel id="leadership">
        <SectionBackground />
        <div className="wire-container"><Heading intro={copy.leadership.intro} title={copy.leadership.title} /><div className="wire-leaders">{copy.leadership.people.map(([name, role], index) => <article data-section-animate key={`${name}-${index}`}><div className="wire-portrait">PORTRAIT</div><h3>{name}</h3><p>{role}</p></article>)}</div></div>
      </section>

      <section className="wire-section wire-statement" data-section-panel id="vision"><SectionBackground /><div className="wire-container"><h2 data-section-animate>{copy.vision.title}</h2><p data-section-animate>{copy.vision.body}</p></div></section>

      <section className="wire-section wire-section--muted" data-section-panel id="insights"><SectionBackground /><div className="wire-container"><Heading intro={copy.insights.intro} title={copy.insights.title} />{posts.length ? <div className="wire-grid wire-grid--3">{posts.map((post) => <article className="wire-card" data-section-animate key={post.id}><p className="wire-label">{post.publishedAt ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(post.publishedAt)) : '—'}</p><h3><Link href={`/${locale}/posts/${post.slug}`}>{post.title}</Link></h3><p>{post.meta?.description}</p></article>)}</div> : <div className="wire-empty" data-section-animate>{copy.insights.empty}</div>}<Link className="wire-text-link" data-section-animate href={`/${locale}/posts`}>{copy.insights.cta} →</Link></div></section>

      <section className="wire-section" data-section-panel id="careers"><SectionBackground /><div className="wire-container wire-split"><Heading title={copy.careers.title} /><div data-section-animate><p className="wire-lead wire-lead--small">{copy.careers.body}</p><span className="wire-button wire-button--disabled">{copy.careers.cta}</span></div></div></section>

      <section className="wire-section wire-cta" data-section-panel id="partners"><SectionBackground /><div className="wire-container"><h2 data-section-animate>{copy.investor.title}</h2><p data-section-animate>{copy.investor.body}</p><span className="wire-button wire-button--disabled" data-section-animate>{copy.investor.cta}</span></div></section>
    </SectionScrollTransitions>
  </div>
}
