import type { Product } from '@/payload-types'

import { doc, h, p } from './lexical'

type Localized = {
  title: string
  tagline: string
  summary: string
  highlights: { title: string; description: string }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  meta: { title: string; description: string }
}

export type ProductSeed = {
  slug: string
  code: string
  status: Product['status']
  category: NonNullable<Product['category']>
  externalUrl?: string
  featured: boolean
  order: number
  vi: Localized
  en: Localized
}

/**
 * Drawn from what Tensoract publishes about itself. Deliberately free of
 * invented metrics, customer names, and integration claims — an editor should
 * be able to publish this as-is without checking a single number.
 */
export const products: ProductSeed[] = [
  {
    slug: 'ecombox',
    code: 'TSR-01',
    status: 'live',
    category: 'ecommerce',
    featured: true,
    order: 10,
    vi: {
      title: 'Ecombox',
      tagline: 'Video AI cho khâu đóng gói, để bớt tranh chấp hoàn hàng.',
      summary:
        'Ecombox ghi lại quá trình đóng gói và gắn đoạn video vào đúng mã đơn. Khi khách báo thiếu hàng hoặc sai hàng, người bán có thứ để đối soát thay vì chịu thiệt.',
      highlights: [
        {
          title: 'Video gắn theo mã đơn',
          description:
            'Mỗi đơn có một đoạn ghi riêng. Tra bằng mã vận đơn, không phải tua lại cả ngày làm việc.',
        },
        {
          title: 'Đối soát khiếu nại',
          description:
            'Cắt đúng đoạn cần thiết và gửi đi khi phải làm việc với sàn hoặc với khách.',
        },
        {
          title: 'Nhìn lại thao tác',
          description:
            'Xem lại băng để biết bước nào hay bị bỏ qua, rồi sửa quy trình cho cả kho.',
        },
      ],
      content: doc(
        h('h2', 'Vấn đề Ecombox xử lý'),
        p(
          'Với người bán online, phần lớn tranh chấp không nằm ở chất lượng hàng mà ở chuyện "đã bỏ vào hộp hay chưa". Không có bằng chứng thì phần thiệt gần như luôn thuộc về người bán.',
        ),
        p(
          'Ecombox biến khâu đóng gói thành một bản ghi tra cứu được: camera chạy liên tục, hệ thống cắt và gắn đoạn tương ứng vào mã đơn, người bán tìm lại trong vài giây.',
        ),
      ),
      meta: {
        title: 'Ecombox — video AI cho khâu đóng gói',
        description:
          'Ghi lại quá trình đóng gói và gắn video vào đúng mã đơn, để người bán online có bằng chứng khi phát sinh khiếu nại.',
      },
    },
    en: {
      title: 'Ecombox',
      tagline: 'AI video for the packing bench, so fewer returns turn into disputes.',
      summary:
        'Ecombox records the packing process and attaches the clip to the right order code. When a buyer reports a missing or wrong item, the seller has something to check against instead of absorbing the loss.',
      highlights: [
        {
          title: 'Clips tied to order codes',
          description:
            'Every order gets its own clip. Look it up by tracking number rather than scrubbing through a whole shift.',
        },
        {
          title: 'Settle claims with evidence',
          description: 'Cut the moment that matters and send it to the marketplace or the buyer.',
        },
        {
          title: 'Review how packing is done',
          description:
            'Watch the footage back to see which step gets skipped, then fix the process for the whole floor.',
        },
      ],
      content: doc(
        h('h2', 'What Ecombox is for'),
        p(
          'For online sellers, most disputes are not about product quality — they are about whether an item went into the box. Without evidence, the seller almost always pays.',
        ),
        p(
          'Ecombox turns packing into a searchable record: the camera runs, the system attaches the matching clip to the order code, and the seller finds it in seconds.',
        ),
      ),
      meta: {
        title: 'Ecombox — AI video for packing',
        description:
          'Record the packing process and attach the video to the order code, so online sellers have evidence when a claim comes in.',
      },
    },
  },
  {
    slug: 'goi-hang-chuan',
    code: 'TSR-02',
    status: 'live',
    category: 'ecommerce',
    externalUrl: 'https://goihangchuan.vn',
    featured: true,
    order: 20,
    vi: {
      title: 'Gói Hàng Chuẩn',
      tagline: 'Quản lý vận đơn cho người bán online, gọn trong một chỗ.',
      summary:
        'Một nơi để theo dõi vận đơn, in tem và biết đơn nào đang kẹt — thay vì mở lần lượt trang của từng hãng vận chuyển mỗi sáng.',
      highlights: [
        {
          title: 'Gom vận đơn về một bảng',
          description: 'Không phải nhớ đơn nào đi hãng nào để mở đúng trang tra cứu.',
        },
        {
          title: 'In tem hàng loạt',
          description: 'Chuẩn bị tem cho cả lô hàng trong một lượt, thay vì in từng cái.',
        },
        {
          title: 'Thấy đơn đang kẹt',
          description: 'Đơn đứng yên quá lâu được đẩy lên đầu bảng để xử lý trước.',
        },
      ],
      content: doc(
        h('h2', 'Vì sao có sản phẩm này'),
        p(
          'Người bán vừa đủ lớn để chạy nhiều hãng vận chuyển thì cũng vừa đủ bận để không kịp mở từng trang tra cứu. Việc theo dõi vận đơn rơi vào file Excel, rồi rơi khỏi file Excel.',
        ),
        p(
          'Gói Hàng Chuẩn gom phần đó lại thành một bảng làm việc duy nhất, đủ để biết sáng nay cần xử lý đơn nào.',
        ),
      ),
      meta: {
        title: 'Gói Hàng Chuẩn — quản lý vận đơn cho người bán online',
        description:
          'Theo dõi vận đơn nhiều hãng, in tem hàng loạt và phát hiện đơn kẹt, trong một bảng làm việc duy nhất.',
      },
    },
    en: {
      title: 'Gói Hàng Chuẩn',
      tagline: 'Parcel management for online sellers, in one place.',
      summary:
        'One place to track shipments, print labels, and see which parcels are stuck — instead of opening a different carrier site every morning.',
      highlights: [
        {
          title: 'Every carrier in one table',
          description: 'No need to remember which carrier an order went out with to look it up.',
        },
        {
          title: 'Print labels in batches',
          description: 'Prepare labels for a whole run at once rather than one at a time.',
        },
        {
          title: 'Surface stuck parcels',
          description: 'Anything that has not moved for too long is pushed to the top of the list.',
        },
      ],
      content: doc(
        h('h2', 'Why this exists'),
        p(
          'A seller large enough to use several carriers is also busy enough to stop checking each carrier site. Shipment tracking falls into a spreadsheet, and then out of it.',
        ),
        p(
          'Gói Hàng Chuẩn collapses that into a single working table — enough to know which parcels need attention this morning.',
        ),
      ),
      meta: {
        title: 'Gói Hàng Chuẩn — parcel management for online sellers',
        description:
          'Track multi-carrier shipments, print labels in batches, and catch stuck parcels from one table.',
      },
    },
  },
  {
    slug: 'deligent',
    code: 'TSR-03',
    status: 'live',
    category: 'ai',
    featured: true,
    order: 30,
    vi: {
      title: 'Deligent',
      tagline: 'Nền tảng thiết kế bằng trí tuệ nhân tạo cho doanh nghiệp.',
      summary:
        'Dựng nhanh ấn phẩm cho chiến dịch bán hàng — banner, ảnh sản phẩm, bộ nhận diện — từ mô tả bằng chữ, rồi chỉnh lại theo bộ thương hiệu của doanh nghiệp.',
      highlights: [
        {
          title: 'Từ mô tả ra bản nháp',
          description: 'Viết yêu cầu bằng tiếng Việt, nhận về bản nháp để sửa tiếp.',
        },
        {
          title: 'Giữ đúng bộ nhận diện',
          description: 'Màu, phông và bố cục theo quy chuẩn thương hiệu đã khai báo sẵn.',
        },
        {
          title: 'Xuất theo nhiều khổ',
          description: 'Một nội dung, nhiều kích thước cho từng kênh đăng.',
        },
      ],
      content: doc(
        h('h2', 'Deligent dùng cho việc gì'),
        p(
          'Doanh nghiệp nhỏ chạy chiến dịch bán hàng thường kẹt ở khâu ấn phẩm: cần nhanh, cần nhiều khổ, mà không đủ ngân sách thuê thiết kế cho từng đợt.',
        ),
        p(
          'Deligent lo phần nháp và phần lặp lại, để người phụ trách chỉ phải quyết định phần còn lại.',
        ),
      ),
      meta: {
        title: 'Deligent — nền tảng thiết kế bằng AI',
        description:
          'Dựng ấn phẩm cho chiến dịch bán hàng từ mô tả bằng chữ, giữ đúng bộ nhận diện của doanh nghiệp.',
      },
    },
    en: {
      title: 'Deligent',
      tagline: 'An AI design platform for businesses.',
      summary:
        'Draft campaign material fast — banners, product shots, identity pieces — from a written brief, then adjust it against the company brand kit.',
      highlights: [
        {
          title: 'Brief in, draft out',
          description: 'Describe what you need in plain language and get a draft to work from.',
        },
        {
          title: 'Stays on brand',
          description: 'Colours, type, and layout follow the brand rules already set up.',
        },
        {
          title: 'Export every size',
          description: 'One piece of content, sized for each channel it has to run on.',
        },
      ],
      content: doc(
        h('h2', 'What Deligent is for'),
        p(
          'Small businesses running a sales campaign get stuck on artwork: it has to be fast, it has to come in several sizes, and there is rarely budget to brief a designer for every round.',
        ),
        p('Deligent takes the drafting and the repetition, leaving the decisions to a person.'),
      ),
      meta: {
        title: 'Deligent — AI design platform',
        description:
          'Draft campaign material from a written brief while staying inside the company brand kit.',
      },
    },
  },
  {
    slug: 'tvts-10',
    code: 'TSR-04',
    status: 'live',
    category: 'education',
    featured: true,
    order: 40,
    vi: {
      title: 'TVTS 10',
      tagline: 'Tư vấn tổ hợp môn lớp 10 bằng AI, kèm quản lý tuyển sinh trực tuyến.',
      summary:
        'Học sinh trả lời một bộ câu hỏi và nhận gợi ý tổ hợp môn phù hợp. Trường dùng phần quản lý đi kèm để nhận và xử lý hồ sơ tuyển sinh.',
      highlights: [
        {
          title: 'Gợi ý tổ hợp môn',
          description: 'Dựa trên năng lực và định hướng học sinh tự khai, không phải bốc thăm.',
        },
        {
          title: 'Hồ sơ nộp trực tuyến',
          description: 'Phụ huynh nộp từ điện thoại, trường không phải nhập lại bằng tay.',
        },
        {
          title: 'Theo dõi đợt tuyển sinh',
          description: 'Nhà trường thấy được tiến độ từng đợt thay vì đếm hồ sơ giấy.',
        },
      ],
      content: doc(
        h('h2', 'Bối cảnh'),
        p(
          'Từ khi chương trình phổ thông mới cho phép chọn tổ hợp môn, học sinh lớp 9 phải đưa ra một quyết định khá lớn mà thường không có đủ thông tin, còn nhà trường thì phải xử lý hồ sơ trong thời gian ngắn.',
        ),
        p('TVTS 10 giải quyết cả hai đầu: phần tư vấn cho học sinh, phần quản lý cho nhà trường.'),
      ),
      meta: {
        title: 'TVTS 10 — tư vấn tổ hợp môn và quản lý tuyển sinh',
        description:
          'Gợi ý tổ hợp môn lớp 10 cho học sinh bằng AI, kèm công cụ nhận và xử lý hồ sơ tuyển sinh cho nhà trường.',
      },
    },
    en: {
      title: 'TVTS 10',
      tagline: 'AI subject-combination guidance for Vietnamese Grade 10, with online admissions.',
      summary:
        'Students answer a set of questions and get a suggested subject combination. Schools use the admin side to receive and process admission files.',
      highlights: [
        {
          title: 'Suggested combinations',
          description: "Based on the student's own stated strengths and direction, not a lottery.",
        },
        {
          title: 'Applications online',
          description: 'Parents submit from a phone; the school does not re-type anything.',
        },
        {
          title: 'Track the intake',
          description: 'Schools see progress through each round instead of counting paper files.',
        },
      ],
      content: doc(
        h('h2', 'Context'),
        p(
          'Since the new curriculum let students pick subject combinations, Grade 9 students have had to make a consequential choice without much information, while schools process the paperwork in a short window.',
        ),
        p('TVTS 10 handles both ends: guidance for the student, administration for the school.'),
      ),
      meta: {
        title: 'TVTS 10 — subject guidance and admissions',
        description:
          'AI subject-combination guidance for Grade 10 students, with admission processing tools for schools.',
      },
    },
  },
]
