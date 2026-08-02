import { doc, h, p, ul } from './lexical'

type LocalizedPost = {
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  meta: { title: string; description: string }
}

export type PostSeed = {
  slug: string
  categoryKey: 'product' | 'engineering' | 'operations'
  vi: LocalizedPost
  en: LocalizedPost
}

export const categories = [
  { key: 'product', slug: 'san-pham', vi: 'Sản phẩm', en: 'Product' },
  { key: 'engineering', slug: 'ky-thuat', vi: 'Kỹ thuật', en: 'Engineering' },
  { key: 'operations', slug: 'van-hanh', vi: 'Vận hành', en: 'Operations' },
] as const

export const posts: PostSeed[] = [
  {
    slug: 'vi-sao-chung-toi-quay-video-moi-don-hang',
    categoryKey: 'product',
    vi: {
      title: 'Vì sao chúng tôi quay video mọi đơn hàng',
      content: doc(
        p(
          'Ý tưởng đầu tiên của Ecombox không phải là AI. Nó là một câu hỏi rất cụ thể mà người bán hàng hỏi chúng tôi: "làm sao chứng minh là tôi đã bỏ đủ hàng vào hộp?"',
        ),
        h('h2', 'Bằng chứng phải tra được, không chỉ phải tồn tại'),
        p(
          'Nhiều kho đã gắn camera từ lâu. Vấn đề là khi khiếu nại xảy ra sau ba ngày, không ai đủ kiên nhẫn tua lại tám tiếng băng để tìm đúng ba mươi giây cần thiết. Bằng chứng có tồn tại, nhưng chi phí lấy ra cao hơn giá trị đơn hàng, nên trên thực tế nó không tồn tại.',
        ),
        p(
          'Nên phần khó không nằm ở chỗ ghi hình. Nó nằm ở chỗ nối đoạn ghi với mã đơn, để việc tra cứu tốn vài giây thay vì cả buổi chiều.',
        ),
        h('h2', 'AI nằm ở đúng một chỗ'),
        p(
          'Chúng tôi dùng mô hình để đọc mã vận đơn xuất hiện trong khung hình và cắt đoạn tương ứng. Chỉ vậy. Phần còn lại là việc lưu trữ và tra cứu bình thường — và đó là phần quyết định sản phẩm có dùng được hay không.',
        ),
      ),
      meta: {
        title: 'Vì sao chúng tôi quay video mọi đơn hàng',
        description:
          'Bằng chứng đóng gói chỉ có giá trị khi tra ra được trong vài giây. Ghi chép về bài toán đứng sau Ecombox.',
      },
    },
    en: {
      title: 'Why we film every parcel',
      content: doc(
        p(
          'The first idea behind Ecombox was not AI. It was a very specific question sellers kept asking us: "how do I prove I put everything in the box?"',
        ),
        h('h2', 'Evidence has to be findable, not just recorded'),
        p(
          'Plenty of warehouses already have cameras. The problem is that when a claim arrives three days later, nobody will scrub through eight hours of footage for the thirty seconds that matter. The evidence exists, but retrieving it costs more than the order is worth — so in practice it does not exist.',
        ),
        p(
          'The hard part is not recording. It is binding the clip to the order code so that a lookup takes seconds instead of an afternoon.',
        ),
        h('h2', 'AI in exactly one place'),
        p(
          'We use a model to read the tracking code that appears in frame and cut the matching clip. That is all. Everything else is ordinary storage and retrieval — and that is what decides whether the product is usable.',
        ),
      ),
      meta: {
        title: 'Why we film every parcel',
        description:
          'Packing evidence is only worth anything if it can be found in seconds. Notes on the problem behind Ecombox.',
      },
    },
  },
  {
    slug: 'bay-nguoi-thi-to-chuc-viec-the-nao',
    categoryKey: 'operations',
    vi: {
      title: 'Bảy người thì tổ chức việc thế nào',
      content: doc(
        p(
          'Chúng tôi có bảy người và năm sản phẩm đang chạy. Con số đó buộc mọi quyết định về quy trình phải rất tiết kiệm.',
        ),
        h('h2', 'Ba quy ước chúng tôi giữ'),
        ul([
          'Một sản phẩm có đúng một người chịu trách nhiệm cuối. Không có ban điều phối.',
          'Việc gì lặp lại lần thứ ba thì viết script, không làm tay lần thứ tư.',
          'Không có tính năng nào được bắt đầu nếu chưa biết ai sẽ dùng nó trong tháng này.',
        ]),
        h('h2', 'Cái giá phải trả'),
        p(
          'Cách làm này khiến chúng tôi từ chối khá nhiều thứ nghe hay. Đổi lại, mỗi sản phẩm đều có người biết rõ nó đến từng ngóc ngách, và không có phần nào của hệ thống là "của cả nhóm" theo nghĩa không ai đụng vào.',
        ),
      ),
      meta: {
        title: 'Bảy người thì tổ chức việc thế nào',
        description:
          'Ba quy ước giúp một đội bảy người duy trì năm sản phẩm mà không cần thêm tầng quản lý.',
      },
    },
    en: {
      title: 'How seven people organise the work',
      content: doc(
        p(
          'We are seven people with five products in operation. That number forces every process decision to be frugal.',
        ),
        h('h2', 'Three rules we keep'),
        ul([
          'Each product has exactly one person accountable for it. There is no coordination layer.',
          'Anything done by hand a third time gets scripted before the fourth.',
          'No feature starts until we can name someone who will use it this month.',
        ]),
        h('h2', 'What it costs'),
        p(
          'This makes us turn down a lot of things that sound good. In exchange, every product has someone who knows it in detail, and no part of the system belongs to "the team" in the sense that nobody touches it.',
        ),
      ),
      meta: {
        title: 'How seven people organise the work',
        description:
          'Three rules that let a seven-person team maintain five products without adding a management layer.',
      },
    },
  },
  {
    slug: 'chon-ha-tang-khi-khong-co-von-ngoai',
    categoryKey: 'engineering',
    vi: {
      title: 'Chọn hạ tầng khi không có vốn ngoài',
      content: doc(
        p(
          'Tự nuôi mình có một hệ quả rất trực tiếp lên kỹ thuật: hoá đơn hạ tầng tháng này là tiền thật của tháng này, không phải một dòng trong bảng đốt vốn.',
        ),
        h('h2', 'Thuê thì thuê hẳn'),
        p(
          'Chúng tôi không tự dựng trung tâm dữ liệu, không tự vận hành cụm Kubernetes cho vui. Máy chủ, CDN và phần mô hình đều thuê của Google Cloud, AWS, Microsoft và Cloudflare — những chỗ mà chi phí có thể dự đoán và có thể tắt bớt khi cần.',
        ),
        h('h2', 'Phần nào thì tự viết'),
        p(
          'Ngược lại, toàn bộ logic sản phẩm là của đội. Đó là phần khách hàng trả tiền, và cũng là phần duy nhất mà việc phụ thuộc vào nhà cung cấp sẽ khiến chúng tôi mất quyền quyết định.',
        ),
        p(
          'Ranh giới đó không phải triết lý. Nó đơn giản là chỗ chúng tôi vẽ ra để hoá đơn cuối tháng còn dự đoán được.',
        ),
      ),
      meta: {
        title: 'Chọn hạ tầng khi không có vốn ngoài',
        description:
          'Vì sao chúng tôi thuê toàn bộ hạ tầng và chỉ tự viết phần logic sản phẩm.',
      },
    },
    en: {
      title: 'Choosing infrastructure without investor money',
      content: doc(
        p(
          'Being bootstrapped has a very direct consequence for engineering: this month’s infrastructure bill is this month’s real money, not a line in a burn chart.',
        ),
        h('h2', 'If you rent, rent properly'),
        p(
          'We do not run a data centre, and we do not operate a Kubernetes cluster for the fun of it. Servers, CDN, and model capacity are rented from Google Cloud, AWS, Microsoft, and Cloudflare — places where the cost is predictable and can be turned down when it needs to be.',
        ),
        h('h2', 'What we write ourselves'),
        p(
          'The product logic, on the other hand, is entirely ours. That is what customers pay for, and it is the one place where depending on a vendor would cost us the ability to decide.',
        ),
        p(
          'That line is not a philosophy. It is simply where we drew it so the end-of-month bill stays predictable.',
        ),
      ),
      meta: {
        title: 'Choosing infrastructure without investor money',
        description: 'Why we rent all of our infrastructure and only write the product logic.',
      },
    },
  },
]
