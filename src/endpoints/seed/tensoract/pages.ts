import type { Locale } from '@/i18n/config'

import { doc, h, p } from './lexical'

const pick = <T,>(locale: Locale, vi: T, en: T): T => (locale === 'vi' ? vi : en)

/* -------------------------------------------------------------------------- */
/* Home                                                                        */
/* -------------------------------------------------------------------------- */

export const homePage = (locale: Locale) => ({
  slug: 'home',
  _status: 'published' as const,
  title: pick(locale, 'Trang chủ', 'Home'),
  hero: { type: 'none' as const },
  meta: {
    title: pick(
      locale,
      'Tensoract — SaaS cho thương mại điện tử',
      'Tensoract — SaaS for e-commerce',
    ),
    description: pick(
      locale,
      'Công ty SaaS tự nuôi tại Thủ Đức, TP.HCM. Chúng tôi làm phần mềm cho người bán hàng online: video đóng gói, quản lý vận đơn và thiết kế bằng AI.',
      'A bootstrapped SaaS company in Thu Duc, Ho Chi Minh City. We build software for online sellers: packing video, parcel management, and AI-assisted design.',
    ),
  },
  layout: [
    {
      blockType: 'manifestHero' as const,
      eyebrow: pick(
        locale,
        'SaaS tự nuôi · Thủ Đức, TP.HCM · Từ 2022',
        'Bootstrapped SaaS · Thu Duc, HCMC · Since 2022',
      ),
      headline: pick(
        locale,
        'Bảy người,\nnăm phần mềm\nđang chạy thật.',
        'Seven people,\nfive products\nrunning today.',
      ),
      lead: pick(
        locale,
        'Tensoract làm SaaS cho thương mại điện tử: quay video đóng gói để giảm tranh chấp hoàn hàng, quản lý vận đơn, và dựng thiết kế bằng AI. Tự nuôi từ 2022, không gọi vốn ngoài.',
        'Tensoract builds SaaS for e-commerce: video proof of packing to cut return disputes, parcel management, and AI-assisted design. Bootstrapped since 2022, no outside capital.',
      ),
      links: [
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Xem sản phẩm', 'See the products'),
            url: '/products',
            appearance: 'default' as const,
          },
        },
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Liên hệ', 'Get in touch'),
            url: '/lien-he',
            appearance: 'outline' as const,
          },
        },
      ],
      labelCode: 'TSR-2022',
      labelTitle: 'Tensoract Co., Ltd',
      labelStamp: pick(locale, 'Tự nuôi', 'Bootstrapped'),
      labelRows: [
        {
          label: pick(locale, 'Trụ sở', 'Registered'),
          value: pick(locale, 'Thủ Đức, TP. Hồ Chí Minh', 'Thu Duc, Ho Chi Minh City'),
        },
        {
          label: pick(locale, 'Thành lập', 'Founded'),
          value: pick(locale, '2022 · Không vốn ngoài', '2022 · No outside capital'),
        },
        { label: pick(locale, 'Đội ngũ', 'Team'), value: pick(locale, '7 người', '7 people') },
        {
          label: pick(locale, 'Sản phẩm', 'Products'),
          value: pick(locale, '5 đang vận hành', '5 in operation'),
        },
      ],
    },
    {
      blockType: 'manifestStrip' as const,
      items: [
        { value: '2022', label: pick(locale, 'Năm thành lập', 'Founded') },
        { value: '7', label: pick(locale, 'Người trong đội', 'People on the team') },
        { value: '5', label: pick(locale, 'Sản phẩm đang chạy', 'Products running') },
        { value: '100+', label: pick(locale, 'Buổi seminar đã tổ chức', 'Seminars run') },
      ],
    },
    {
      blockType: 'productLabels' as const,
      eyebrow: pick(locale, 'Danh mục sản phẩm', 'Product manifest'),
      heading: pick(
        locale,
        'Mỗi sản phẩm giải một việc cụ thể.',
        'Each product solves one specific job.',
      ),
      intro: pick(
        locale,
        'Không có nền tảng tất-cả-trong-một. Mỗi sản phẩm bắt đầu từ một việc mà người bán hàng đang phải làm tay mỗi ngày.',
        'No all-in-one platform. Each product started from something a seller was still doing by hand every day.',
      ),
      source: 'featured' as const,
      limit: 6,
      links: [
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Tất cả sản phẩm', 'All products'),
            url: '/products',
            appearance: 'outline' as const,
          },
        },
      ],
    },
    {
      blockType: 'approach' as const,
      eyebrow: pick(locale, 'Cách làm việc', 'How we work'),
      heading: pick(locale, 'Tự nuôi mình nghĩa là gì', 'What bootstrapped actually means'),
      intro: pick(
        locale,
        'Không có vốn ngoài, nên mọi thứ chúng tôi xây đều phải tự sống được. Điều đó quyết định cách chúng tôi chọn việc.',
        'With no outside capital, everything we build has to pay for itself. That decides what we take on.',
      ),
      items: [
        {
          title: pick(locale, 'Sản phẩm phải tự nuôi được', 'A product has to pay for itself'),
          description: pick(
            locale,
            'Chúng tôi không xây tính năng để đi gọi vốn. Một sản phẩm chỉ đi tiếp nếu có người trả tiền để dùng nó.',
            'We do not build features to raise money. A product only continues if someone pays to use it.',
          ),
        },
        {
          title: pick(locale, 'AI đặt đúng chỗ', 'AI where it earns its place'),
          description: pick(
            locale,
            'Chúng tôi dùng AI ở khâu tốn công nhất — đọc video đóng gói, dựng bản thiết kế nháp, gợi ý tổ hợp môn — chứ không dán nhãn AI lên mọi nút bấm.',
            'We use AI on the most laborious step — reading packing footage, drafting artwork, suggesting subject combinations — not as a badge on every button.',
          ),
        },
        {
          title: pick(locale, 'Ra bản nhỏ, ra sớm', 'Ship small, ship early'),
          description: pick(
            locale,
            'Bảy người thì không giấu được một sản phẩm suốt nửa năm. Chúng tôi đưa bản dùng được ra sớm rồi sửa theo người dùng thật.',
            'Seven people cannot hide a product for six months. We put a usable version out early and fix it against real users.',
          ),
        },
        {
          title: pick(locale, 'Hạ tầng thì thuê, sản phẩm thì tự viết', 'Rent the rack, own the product'),
          description: pick(
            locale,
            'Máy chủ, CDN và phần mô hình đều thuê. Toàn bộ logic sản phẩm thì đội tự viết, vì đó là phần khách hàng trả tiền.',
            'Servers, CDN, and model capacity are rented. The product logic we write ourselves, because that is what customers pay for.',
          ),
        },
      ],
    },
    {
      blockType: 'statement' as const,
      eyebrow: pick(locale, 'Tầm nhìn', 'Vision'),
      text: pick(
        locale,
        'Trở thành công ty Bootstrapped SaaS tiên phong tại Việt Nam, bằng những sản phẩm đơn giản và mạnh.',
        'To become the leading bootstrapped SaaS company in Vietnam, through products that stay simple and stay strong.',
      ),
      attribution: 'Võ Quốc Thịnh',
      attributionRole: pick(locale, 'Nhà sáng lập', 'Founder'),
    },
    {
      blockType: 'awards' as const,
      eyebrow: pick(locale, 'Ghi nhận', 'Recognition'),
      heading: pick(locale, 'Giải thưởng & ghi nhận', 'Awards & recognition'),
      intro: pick(
        locale,
        'Những lần chúng tôi mang sản phẩm ra khỏi văn phòng và để người khác chấm.',
        'The times we took a product out of the office and let someone else judge it.',
      ),
      items: [
        {
          year: '2024',
          title: 'Startup Wheel 2024',
          organisation: pick(
            locale,
            'BSSC — Trung tâm Hỗ trợ Thanh niên Khởi nghiệp',
            'BSSC — Business Startup Support Centre',
          ),
          result: pick(locale, 'Dự thi', 'Entered'),
          description: pick(
            locale,
            'Nhà sáng lập Võ Quốc Thịnh mang Ecombox tới Startup Wheel, cuộc thi khởi nghiệp lớn nhất Đông Nam Á.',
            'Founder Vo Quoc Thinh took Ecombox to Startup Wheel, the largest startup competition in Southeast Asia.',
          ),
        },
      ],
    },
    {
      blockType: 'partners' as const,
      eyebrow: pick(locale, 'Đối tác', 'Partners'),
      heading: pick(locale, 'Chúng tôi dựng trên hạ tầng của ai', 'Whose infrastructure we build on'),
      intro: pick(
        locale,
        'Một đội bảy người không tự xây trung tâm dữ liệu. Đây là nơi chúng tôi thuê hạ tầng, và những tổ chức đã đồng hành.',
        'A seven-person team does not build a data centre. These are the platforms we rent from, and the organisations that have backed us.',
      ),
      groups: [
        {
          label: pick(locale, 'Hạ tầng & nền tảng', 'Infrastructure & platforms'),
          items: [
            { name: 'Google Cloud', url: 'https://cloud.google.com' },
            { name: 'Microsoft', url: 'https://microsoft.com' },
            { name: 'AWS', url: 'https://aws.amazon.com' },
            { name: 'Cloudflare', url: 'https://cloudflare.com' },
          ],
        },
        {
          label: pick(locale, 'Chương trình & cộng đồng', 'Programmes & community'),
          items: [
            { name: 'Startup Wheel' },
            { name: 'VinUniversity' },
            { name: 'UII' },
            { name: 'King Attorney' },
          ],
        },
      ],
    },
    {
      blockType: 'cta' as const,
      richText: doc(
        h(
          'h2',
          pick(
            locale,
            'Đang có một việc lặp đi lặp lại mỗi ngày?',
            'Something you repeat by hand every day?',
          ),
        ),
        p(
          pick(
            locale,
            'Kể cho chúng tôi nghe. Phần lớn sản phẩm của Tensoract bắt đầu đúng từ một câu chuyện như vậy.',
            'Tell us about it. Most Tensoract products started from exactly that kind of story.',
          ),
        ),
      ),
      links: [
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Liên hệ', 'Contact us'),
            url: '/lien-he',
            appearance: 'default' as const,
          },
        },
      ],
    },
  ],
})

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

export const aboutPage = (locale: Locale) => ({
  slug: 've-chung-toi',
  _status: 'published' as const,
  title: pick(locale, 'Về chúng tôi', 'About'),
  hero: { type: 'none' as const },
  meta: {
    title: pick(locale, 'Về Tensoract', 'About Tensoract'),
    description: pick(
      locale,
      'Tensoract là công ty SaaS tự nuôi thành lập năm 2022 tại Thủ Đức, TP.HCM, làm phần mềm cho lĩnh vực thương mại điện tử.',
      'Tensoract is a bootstrapped SaaS company founded in 2022 in Thu Duc, Ho Chi Minh City, building software for e-commerce.',
    ),
  },
  layout: [
    {
      blockType: 'manifestHero' as const,
      eyebrow: pick(locale, 'Hồ sơ công ty', 'Company record'),
      headline: pick(locale, 'Một công ty\nnhỏ, làm việc\ncông khai.', 'A small company,\nworking\nin the open.'),
      lead: pick(
        locale,
        'Tensoract thành lập năm 2022 tại Thủ Đức, TP.HCM. Chúng tôi làm phần mềm dạng SaaS cho lĩnh vực thương mại điện tử và tự trang trải bằng doanh thu từ sản phẩm.',
        'Tensoract was founded in 2022 in Thu Duc, Ho Chi Minh City. We build SaaS software for e-commerce and pay for it with revenue from the products.',
      ),
      links: [
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Xem sản phẩm', 'See the products'),
            url: '/products',
            appearance: 'default' as const,
          },
        },
      ],
      labelCode: 'TSR-HS-01',
      labelTitle: 'Tensoract Co., Ltd',
      labelStamp: pick(locale, 'Đang hoạt động', 'Active'),
      labelRows: [
        {
          label: pick(locale, 'Địa chỉ', 'Address'),
          value: pick(
            locale,
            '215 đường 138, P. Tăng Nhơn Phú, TP.HCM',
            '215 Street 138, Tang Nhon Phu Ward, HCMC',
          ),
        },
        {
          label: pick(locale, 'Lĩnh vực', 'Field'),
          value: pick(locale, 'Phần mềm SaaS · Thương mại điện tử', 'SaaS software · E-commerce'),
        },
        {
          label: pick(locale, 'Mô hình', 'Model'),
          value: pick(locale, 'Tự nuôi, không vốn ngoài', 'Bootstrapped, no outside capital'),
        },
      ],
    },
    {
      blockType: 'statement' as const,
      eyebrow: pick(locale, 'Sứ mệnh', 'Mission'),
      text: pick(
        locale,
        'Tạo ra các sản phẩm SaaS đơn giản và mạnh mẽ.',
        'Make SaaS products that are simple and strong.',
      ),
    },
    {
      blockType: 'content' as const,
      columns: [
        {
          size: 'twoThirds' as const,
          richText: doc(
            h('h2', pick(locale, 'Chúng tôi bắt đầu từ đâu', 'Where we started')),
            p(
              pick(
                locale,
                'Công ty ra đời năm 2022 với một quan sát đơn giản: phần lớn phần mềm cho người bán hàng online ở Việt Nam hoặc quá lớn và đắt, hoặc là một file Excel. Khoảng giữa gần như bỏ trống.',
                'The company started in 2022 from a simple observation: most software for online sellers in Vietnam is either too large and expensive, or it is a spreadsheet. The middle was mostly empty.',
              ),
            ),
            p(
              pick(
                locale,
                'Chúng tôi chọn chỗ đó. Mỗi sản phẩm nhắm vào một việc cụ thể mà người bán đang phải làm tay, và được định giá để một cửa hàng nhỏ vẫn trả nổi.',
                'We took that middle. Each product targets one specific job a seller is still doing by hand, priced so that a small shop can afford it.',
              ),
            ),
            h('h2', pick(locale, 'Vì sao không gọi vốn', 'Why we did not raise')),
            p(
              pick(
                locale,
                'Không gọi vốn nghĩa là chúng tôi phải có doanh thu từ sớm, và điều đó buộc chúng tôi nói chuyện với người dùng thật ngay từ tháng đầu. Đội ngũ nhỏ hơn, tốc độ chậm hơn, nhưng những gì còn lại đều đã được ai đó trả tiền.',
                'Not raising money meant we needed revenue early, which forced us to talk to real users from the first month. The team is smaller and the pace is slower, but everything still standing has been paid for by someone.',
              ),
            ),
            h('h2', pick(locale, 'Ngoài sản phẩm', 'Beyond the products')),
            p(
              pick(
                locale,
                'Chúng tôi tổ chức seminar và khoá học ngắn về kỹ thuật và vận hành thương mại điện tử — hơn một trăm buổi cho tới nay. Đó cũng là cách chúng tôi gặp phần lớn người dùng đầu tiên.',
                'We run seminars and short courses on e-commerce engineering and operations — over a hundred sessions so far. It is also how we met most of our early users.',
              ),
            ),
          ),
        },
      ],
    },
    {
      blockType: 'manifestStrip' as const,
      items: [
        { value: '2022', label: pick(locale, 'Năm thành lập', 'Founded') },
        { value: '7', label: pick(locale, 'Người trong đội', 'People on the team') },
        { value: '5', label: pick(locale, 'Sản phẩm', 'Products') },
        { value: '3', label: pick(locale, 'Khoá học đã mở', 'Courses run') },
      ],
    },
    {
      blockType: 'cta' as const,
      richText: doc(
        h('h2', pick(locale, 'Muốn nói chuyện với đội?', 'Want to talk to the team?')),
        p(
          pick(
            locale,
            'Chúng tôi đọc mọi thư gửi tới và thường trả lời trong vài ngày làm việc.',
            'We read everything that comes in and usually reply within a few working days.',
          ),
        ),
      ),
      links: [
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Liên hệ', 'Contact us'),
            url: '/lien-he',
            appearance: 'default' as const,
          },
        },
      ],
    },
  ],
})

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contactPage = ({ formId, locale }: { formId: string; locale: Locale }) => ({
  slug: 'lien-he',
  _status: 'published' as const,
  title: pick(locale, 'Liên hệ', 'Contact'),
  hero: { type: 'none' as const },
  meta: {
    title: pick(locale, 'Liên hệ Tensoract', 'Contact Tensoract'),
    description: pick(
      locale,
      'Gửi câu hỏi cho đội Tensoract, hoặc ghé văn phòng tại Thủ Đức, TP.HCM.',
      'Send the Tensoract team a question, or visit the office in Thu Duc, Ho Chi Minh City.',
    ),
  },
  layout: [
    {
      blockType: 'manifestHero' as const,
      eyebrow: pick(locale, 'Liên hệ', 'Contact'),
      headline: pick(locale, 'Kể cho\nchúng tôi\nnghe.', 'Tell us\nwhat you\nneed.'),
      lead: pick(
        locale,
        'Bạn đang bán hàng và có một khâu tốn công mỗi ngày? Hoặc muốn hợp tác? Điền vào biểu mẫu bên dưới, hoặc viết thẳng email.',
        'Selling online and stuck with a step that costs you every day? Or looking to work together? Use the form below, or just email us.',
      ),
      labelCode: 'TSR-LH',
      labelTitle: pick(locale, 'Văn phòng', 'Office'),
      labelStamp: pick(locale, 'Mở cửa', 'Open'),
      labelRows: [
        {
          label: pick(locale, 'Địa chỉ', 'Address'),
          value: pick(
            locale,
            '215 đường 138, P. Tăng Nhơn Phú, TP. Hồ Chí Minh',
            '215 Street 138, Tang Nhon Phu Ward, Ho Chi Minh City',
          ),
        },
        { label: 'Email', value: 'hello@tensoract.vn' },
        {
          label: pick(locale, 'Giờ làm việc', 'Hours'),
          value: pick(locale, 'Thứ 2 – Thứ 6, 9:00 – 18:00', 'Mon – Fri, 9:00 – 18:00'),
        },
      ],
    },
    {
      blockType: 'formBlock' as const,
      enableIntro: true,
      form: formId,
      introContent: doc(
        h('h2', pick(locale, 'Gửi tin nhắn', 'Send a message')),
        p(
          pick(
            locale,
            'Càng cụ thể càng tốt — bạn đang bán gì, khâu nào đang tắc.',
            'The more specific the better — what you sell, and where it gets stuck.',
          ),
        ),
      ),
    },
  ],
})

/* -------------------------------------------------------------------------- */
/* Globals                                                                     */
/* -------------------------------------------------------------------------- */

export const headerGlobal = (locale: Locale) => ({
  navItems: [
    {
      link: {
        type: 'custom' as const,
        label: pick(locale, 'Sản phẩm', 'Products'),
        url: '/products',
      },
    },
    { link: { type: 'custom' as const, label: 'Blog', url: '/posts' } },
    {
      link: {
        type: 'custom' as const,
        label: pick(locale, 'Về chúng tôi', 'About'),
        url: '/ve-chung-toi',
      },
    },
  ],
  ctaLinks: [
    {
      link: {
        type: 'custom' as const,
        label: pick(locale, 'Liên hệ', 'Contact'),
        url: '/lien-he',
      },
    },
  ],
})

export const footerGlobal = (locale: Locale) => ({
  tagline: pick(
    locale,
    'Công ty SaaS tự nuôi tại Thủ Đức, TP.HCM. Chúng tôi làm phần mềm cho người bán hàng online.',
    'A bootstrapped SaaS company in Thu Duc, Ho Chi Minh City. We build software for online sellers.',
  ),
  columns: [
    {
      label: pick(locale, 'Sản phẩm', 'Products'),
      navItems: [
        { link: { type: 'custom' as const, label: 'Ecombox', url: '/products/ecombox' } },
        {
          link: {
            type: 'custom' as const,
            label: 'Gói Hàng Chuẩn',
            url: '/products/goi-hang-chuan',
          },
        },
        { link: { type: 'custom' as const, label: 'Deligent', url: '/products/deligent' } },
        { link: { type: 'custom' as const, label: 'TVTS 10', url: '/products/tvts-10' } },
      ],
    },
    {
      label: pick(locale, 'Công ty', 'Company'),
      navItems: [
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Về chúng tôi', 'About'),
            url: '/ve-chung-toi',
          },
        },
        { link: { type: 'custom' as const, label: 'Blog', url: '/posts' } },
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Liên hệ', 'Contact'),
            url: '/lien-he',
          },
        },
      ],
    },
  ],
  contact: {
    label: pick(locale, 'Liên hệ', 'Contact'),
    address: pick(
      locale,
      '215 đường 138, P. Tăng Nhơn Phú\nTP. Hồ Chí Minh, Việt Nam',
      '215 Street 138, Tang Nhon Phu Ward\nHo Chi Minh City, Vietnam',
    ),
    email: 'hello@tensoract.vn',
  },
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/tensoractio' },
    { label: 'GitHub', url: 'https://github.com/tensoract-production' },
  ],
  legal: 'Tensoract Co., Ltd',
})
