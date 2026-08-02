import type { Locale } from '@/i18n/config'

import { doc, h, p } from './lexical'

const pick = <T,>(locale: Locale, vi: T, en: T): T => (locale === 'vi' ? vi : en)

/**
 * Written for the audience PRODUCT.md confirms: investors judging execution and
 * enterprises judging whether this can run inside their operation.
 *
 * Two things are load-bearing and must not drift back:
 * - no claim about funding posture, in either language;
 * - no copy addressed to individual online sellers, who buy on the product sites.
 */

const EMAIL = 'hello@tensoract.vn'

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
      'Tensoract — phần mềm vận hành cho thương mại điện tử',
      'Tensoract — operations software for e-commerce',
    ),
    description: pick(
      locale,
      'Công ty phần mềm tại Thủ Đức, TP.HCM. Bốn sản phẩm đang vận hành trong khâu đóng gói, vận đơn, thiết kế và tuyển sinh.',
      'A software company in Thu Duc, Ho Chi Minh City. Four products running in packing, shipping, design and school admissions.',
    ),
  },
  layout: [
    {
      blockType: 'manifestHero' as const,
      headline: pick(
        locale,
        'Chúng tôi làm\nphần mềm vận hành\ncho thương mại\nđiện tử.',
        'We build\noperations software\nfor e-commerce.',
      ),
      lead: pick(
        locale,
        'Tensoract là công ty phần mềm tại Thủ Đức, TP.HCM. Sản phẩm chủ lực Ecombox ghi nhận khâu đóng gói bằng AI và được triển khai theo quy mô kho của doanh nghiệp. Một đội bảy người xây và tự vận hành.',
        'Tensoract is a software company in Thu Duc, Ho Chi Minh City. Its flagship, Ecombox, records the packing process with AI and is deployed at the scale of the warehouse. Built and operated by a team of seven.',
      ),
      links: [
        {
          link: {
            type: 'custom' as const,
            label: EMAIL,
            url: `mailto:${EMAIL}`,
            appearance: 'default' as const,
          },
        },
        {
          link: {
            type: 'custom' as const,
            label: pick(locale, 'Xem sản phẩm', 'See the products'),
            url: '/products',
            appearance: 'outline' as const,
          },
        },
      ],
      labelCode: 'TSR-2022',
      labelTitle: 'Tensoract Co., Ltd',
      labelStamp: pick(locale, 'Đăng ký 2022', 'Registered 2022'),
      labelRows: [
        {
          label: pick(locale, 'Trụ sở', 'Registered'),
          value: pick(locale, 'Thủ Đức, TP. Hồ Chí Minh', 'Thu Duc, Ho Chi Minh City'),
        },
        { label: pick(locale, 'Đội ngũ', 'Team'), value: pick(locale, '7 người', '7 people') },
        {
          label: pick(locale, 'Chủ lực', 'Flagship'),
          value: 'Ecombox',
        },
        {
          label: pick(locale, 'Sản phẩm', 'Products'),
          value: pick(locale, '4 · 3 đang vận hành', '4 · 3 live'),
        },
      ],
    },
    {
      blockType: 'productLabels' as const,
      heading: pick(
        locale,
        'Ecombox, và những gì đi cùng nó.',
        'Ecombox, and what ships with it.',
      ),
      intro: pick(
        locale,
        'Ecombox là sản phẩm chủ lực, triển khai cho doanh nghiệp theo quy mô kho thật. Vài phần mềm nhỏ hơn chúng tôi vẫn duy trì, nhưng không dẫn câu chuyện bằng chúng.',
        'Ecombox is the flagship, deployed to the real scale of a warehouse. We maintain a few smaller products, but we do not lead with them.',
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
      blockType: 'releases' as const,
      heading: pick(locale, 'Bản phát hành gần đây', 'Recent releases'),
      intro: pick(
        locale,
        'Sản phẩm đi tới đâu, ghi lại ở đây — không lẫn vào bài viết.',
        'Where the products actually got to, kept out of the essays.',
      ),
      limit: 4,
    },
    {
      blockType: 'awards' as const,
      heading: pick(locale, 'Ghi nhận', 'Recognition'),
      intro: pick(
        locale,
        'Những lần chúng tôi mang sản phẩm ra khỏi văn phòng và để bên ngoài chấm.',
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
      heading: pick(
        locale,
        'Chúng tôi dựng trên hạ tầng của ai',
        'Whose infrastructure we build on',
      ),
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
      blockType: 'approach' as const,
      heading: pick(locale, 'Chúng tôi cung cấp gì', 'What we provide'),
      intro: pick(
        locale,
        'Ba việc, và chúng tôi nói không với phần còn lại.',
        'Three things, and we say no to the rest.',
      ),
      items: [
        {
          title: pick(locale, 'Triển khai Ecombox cho doanh nghiệp', 'Ecombox, deployed'),
          description: pick(
            locale,
            'Lắp đặt và vận hành Ecombox theo quy mô kho thật: số điểm đóng gói, sản lượng đơn mỗi ngày, và cách đội kho đang làm việc.',
            'Installing and running Ecombox at the scale of a real warehouse: how many packing stations, how many orders a day, and how the floor team already works.',
          ),
        },
        {
          title: pick(locale, 'Ghép nối vào hệ thống sẵn có', 'Fitting it to what you run'),
          description: pick(
            locale,
            'Doanh nghiệp đã có hệ quản lý kho và vận đơn riêng. Chúng tôi ghép Ecombox vào đó thay vì bắt đổi quy trình cho vừa phần mềm.',
            'Enterprises already run their own warehouse and shipping systems. We fit Ecombox to those rather than asking the process to bend around the software.',
          ),
        },
        {
          title: pick(locale, 'Đào tạo và chuyển giao', 'Training and handover'),
          description: pick(
            locale,
            'Hơn một trăm buổi seminar và ba khoá học về kỹ thuật, vận hành thương mại điện tử — cùng phần chuyển giao cho đội vận hành tại chỗ.',
            'Over a hundred seminars and three courses on e-commerce engineering and operations, plus handover to the team that will run it.',
          ),
        },
      ],
    },
    {
      blockType: 'approach' as const,
      heading: pick(locale, 'Tư duy định hướng', 'How we think'),
      intro: pick(
        locale,
        'Bảy người không thể làm mọi thứ, nên phần lớn công việc là chọn đúng thứ để làm.',
        'Seven people cannot do everything, so most of the work is choosing the right thing to do.',
      ),
      items: [
        {
          title: pick(locale, 'Mỗi sản phẩm giải đúng một việc', 'One product, one job'),
          description: pick(
            locale,
            'Chúng tôi không gộp bốn sản phẩm thành một nền tảng. Mỗi cái có khách riêng, vòng đời riêng, và có thể bị dừng riêng nếu không còn ai cần.',
            'We do not merge four products into a platform. Each has its own customers, its own lifecycle, and can be retired on its own if nobody needs it.',
          ),
        },
        {
          title: pick(locale, 'AI đặt ở khâu tốn công nhất', 'AI where the work actually is'),
          description: pick(
            locale,
            'Đọc video đóng gói, dựng bản thiết kế nháp, gợi ý tổ hợp môn. Đó là những chỗ mô hình thay được sức người; phần còn lại vẫn là phần mềm bình thường và nên như vậy.',
            'Reading packing footage, drafting artwork, suggesting subject combinations. Those are the places a model replaces real labour; the rest is ordinary software and should stay that way.',
          ),
        },
        {
          title: pick(locale, 'Ra bản dùng được sớm', 'Ship something usable early'),
          description: pick(
            locale,
            'Một đội nhỏ không giấu được sản phẩm suốt nửa năm. Chúng tôi đưa bản chạy được ra tay người dùng thật rồi sửa theo cái họ thực sự làm.',
            'A small team cannot hide a product for six months. We put a working version in real hands and fix it against what people actually do.',
          ),
        },
        {
          title: pick(locale, 'Hạ tầng thuê, logic tự viết', 'Rent the rack, own the logic'),
          description: pick(
            locale,
            'Máy chủ, CDN và phần mô hình thuê của Google Cloud, AWS, Microsoft và Cloudflare. Toàn bộ logic sản phẩm do đội tự viết, vì đó là phần không thể thuê ngoài.',
            'Servers, CDN and model capacity are rented from Google Cloud, AWS, Microsoft and Cloudflare. The product logic is written in-house, because that is the part nobody can rent out.',
          ),
        },
      ],
    },
    {
      blockType: 'statement' as const,
      text: pick(
        locale,
        'Làm ra những phần mềm đơn giản và mạnh, cho đúng những khâu vận hành mà hệ thống lớn bỏ qua.',
        'Make software that stays simple and stays strong, for the operational steps large systems leave alone.',
      ),
      attribution: 'Võ Quốc Thịnh',
      attributionRole: pick(locale, 'Nhà sáng lập', 'Founder'),
    },
    {
      blockType: 'cta' as const,
      richText: doc(
        h('h2', pick(locale, 'Muốn làm việc cùng chúng tôi?', 'Want to work with us?')),
        p(
          pick(
            locale,
            'Viết thư thẳng cho đội. Không có biểu mẫu sàng lọc, không có lịch hẹn phải đặt trước — chúng tôi đọc hết và thường trả lời trong vài ngày làm việc.',
            'Write to the team directly. No qualification form, no calendar to book — we read everything and usually reply within a few working days.',
          ),
        ),
      ),
      links: [
        {
          link: {
            type: 'custom' as const,
            label: EMAIL,
            url: `mailto:${EMAIL}`,
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
      'Tensoract thành lập năm 2022 tại Thủ Đức, TP.HCM, làm phần mềm vận hành cho lĩnh vực thương mại điện tử.',
      'Tensoract was founded in 2022 in Thu Duc, Ho Chi Minh City, building operations software for e-commerce.',
    ),
  },
  layout: [
    {
      blockType: 'manifestHero' as const,
      headline: pick(
        locale,
        'Một công ty nhỏ,\nlàm việc công khai.',
        'A small company,\nworking in the open.',
      ),
      lead: pick(
        locale,
        'Thành lập năm 2022 tại Thủ Đức, TP.HCM. Chúng tôi xây và tự vận hành phần mềm dạng SaaS cho ngành thương mại điện tử, và công bố những gì có thể kiểm chứng được.',
        'Founded in 2022 in Thu Duc, Ho Chi Minh City. We build and operate SaaS software for e-commerce, and publish what can be checked.',
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
      labelStamp: pick(locale, 'Đăng ký 2022', 'Registered 2022'),
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
      ],
    },
    {
      blockType: 'statement' as const,
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
                'Công ty ra đời năm 2022 từ một quan sát đơn giản: phần mềm cho ngành thương mại điện tử ở Việt Nam hoặc quá lớn và đắt, hoặc là một file Excel. Khoảng giữa gần như bỏ trống.',
                'The company started in 2022 from a simple observation: software for Vietnamese e-commerce is either too large and expensive, or it is a spreadsheet. The middle was mostly empty.',
              ),
            ),
            p(
              pick(
                locale,
                'Chúng tôi chọn khoảng giữa đó. Mỗi sản phẩm nhắm vào một khâu vận hành cụ thể, và được định giá để một doanh nghiệp vừa vẫn trả nổi.',
                'We took that middle. Each product targets one specific operational step, priced so a mid-sized business can afford it.',
              ),
            ),
            h('h2', pick(locale, 'Đội ngũ', 'The team')),
            p(
              pick(
                locale,
                'Bảy người, tất cả đều làm việc trực tiếp trên sản phẩm. Mỗi sản phẩm có đúng một người chịu trách nhiệm cuối, không có tầng điều phối ở giữa.',
                'Seven people, all working directly on the products. Each product has exactly one person accountable for it, with no coordination layer in between.',
              ),
            ),
            h('h2', pick(locale, 'Ngoài sản phẩm', 'Beyond the products')),
            p(
              pick(
                locale,
                'Chúng tôi tổ chức seminar và khoá học ngắn về kỹ thuật và vận hành thương mại điện tử — hơn một trăm buổi cho tới nay.',
                'We run seminars and short courses on e-commerce engineering and operations — over a hundred sessions so far.',
              ),
            ),
          ),
        },
      ],
    },
    {
      blockType: 'manifestStrip' as const,
      items: [
        { value: '2022', label: pick(locale, 'thành lập', 'founded') },
        { value: '7', label: pick(locale, 'người trong đội', 'people on the team') },
        { value: '4', label: pick(locale, 'sản phẩm', 'products') },
        { value: '3', label: pick(locale, 'khoá học đã mở', 'courses run') },
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
            label: EMAIL,
            url: `mailto:${EMAIL}`,
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
      'Viết thư cho đội Tensoract, hoặc ghé văn phòng tại Thủ Đức, TP.HCM.',
      'Write to the Tensoract team, or visit the office in Thu Duc, Ho Chi Minh City.',
    ),
  },
  layout: [
    {
      blockType: 'manifestHero' as const,
      headline: pick(locale, 'Viết thư\ncho chúng tôi.', 'Write to us.'),
      lead: pick(
        locale,
        'Cách nhanh nhất là gửi email thẳng cho đội. Nếu bạn thích biểu mẫu hơn thì dùng phần bên dưới, cùng đến một hộp thư.',
        'The fastest route is an email straight to the team. If you prefer a form, the one below lands in the same inbox.',
      ),
      links: [
        {
          link: {
            type: 'custom' as const,
            label: EMAIL,
            url: `mailto:${EMAIL}`,
            appearance: 'default' as const,
          },
        },
      ],
      labelCode: 'TSR-LH',
      labelTitle: pick(locale, 'Văn phòng', 'Office'),
      labelStamp: pick(locale, 'Thứ 2 – Thứ 6', 'Mon – Fri'),
      labelRows: [
        {
          label: pick(locale, 'Địa chỉ', 'Address'),
          value: pick(
            locale,
            '215 đường 138, P. Tăng Nhơn Phú, TP. Hồ Chí Minh',
            '215 Street 138, Tang Nhon Phu Ward, Ho Chi Minh City',
          ),
        },
        { label: 'Email', value: EMAIL },
        {
          label: pick(locale, 'Giờ làm việc', 'Hours'),
          value: '9:00 – 18:00',
        },
      ],
    },
    {
      blockType: 'formBlock' as const,
      enableIntro: true,
      form: formId,
      introContent: doc(
        h('h2', pick(locale, 'Hoặc gửi qua biểu mẫu', 'Or use the form')),
        p(
          pick(
            locale,
            'Càng cụ thể càng tốt — bạn là bên nào, đang cần gì ở chúng tôi.',
            'The more specific the better — who you are, and what you need from us.',
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
    'Công ty phần mềm tại Thủ Đức, TP.HCM. Chúng tôi xây và vận hành sản phẩm SaaS cho ngành thương mại điện tử.',
    'A software company in Thu Duc, Ho Chi Minh City. We build and operate SaaS products for e-commerce.',
  ),
  columns: [
    {
      label: pick(locale, 'Sản phẩm', 'Products'),
      navItems: [
        { link: { type: 'custom' as const, label: 'Ecombox', url: '/products/ecombox' } },
        {
          link: {
            type: 'custom' as const,
            label: 'Ecombox ORMI',
            url: '/products/ecombox-ormi',
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
    email: EMAIL,
  },
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/tensoractio' },
    { label: 'GitHub', url: 'https://github.com/tensoract-production' },
  ],
  legal: 'Tensoract Co., Ltd',
})
