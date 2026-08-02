import type { Locale } from './config'

/**
 * Interface chrome only. Everything an editor should be able to change lives in
 * Payload — this file holds the words the components themselves need.
 */
export const dictionaries = {
  vi: {
    skipToContent: 'Bỏ qua, tới nội dung chính',
    nav: {
      products: 'Sản phẩm',
      blog: 'Blog',
      about: 'Về chúng tôi',
      contact: 'Liên hệ',
      search: 'Tìm kiếm',
      menu: 'Menu',
      close: 'Đóng',
    },
    products: {
      all: 'Tất cả sản phẩm',
      others: 'Sản phẩm khác',
      visit: 'Mở trang sản phẩm',
      readMore: 'Xem chi tiết',
      status: {
        live: 'Đang chạy',
        beta: 'Thử nghiệm',
        building: 'Đang phát triển',
        archived: 'Đã dừng',
      },
      category: {
        ecommerce: 'Thương mại điện tử',
        ai: 'Công cụ AI',
        education: 'Giáo dục',
      },
      empty: 'Chưa có sản phẩm nào được đăng.',
      indexTitle: 'Sản phẩm',
      indexLead: 'Những phần mềm chúng tôi đang vận hành và bảo trì.',
      whatItDoes: 'Sản phẩm làm được gì',
      launched: 'Ra mắt',
    },
    blog: {
      title: 'Blog',
      lead: 'Ghi chép về sản phẩm, kỹ thuật và chuyện vận hành một đội nhỏ.',
      readPost: 'Đọc bài',
      empty: 'Chưa có bài viết nào.',
      relatedTitle: 'Bài liên quan',
    },
    awards: {
      source: 'Nguồn',
    },
    footer: {
      company: 'Công ty',
      products: 'Sản phẩm',
      contact: 'Liên hệ',
      rights: 'Bảo lưu mọi quyền.',
      theme: 'Giao diện',
    },
    langSwitch: 'Chuyển ngôn ngữ',
    backHome: 'Về trang chủ',
    notFound: {
      title: 'Không tìm thấy trang',
      body: 'Đường dẫn này không tồn tại, hoặc đã được chuyển đi nơi khác.',
    },
  },
  en: {
    skipToContent: 'Skip to main content',
    nav: {
      products: 'Products',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      search: 'Search',
      menu: 'Menu',
      close: 'Close',
    },
    products: {
      all: 'All products',
      others: 'Other products',
      visit: 'Open product site',
      readMore: 'View details',
      status: {
        live: 'Live',
        beta: 'Beta',
        building: 'In development',
        archived: 'Archived',
      },
      category: {
        ecommerce: 'E-commerce',
        ai: 'AI tooling',
        education: 'Education',
      },
      empty: 'No products published yet.',
      indexTitle: 'Products',
      indexLead: 'The software we run and maintain.',
      whatItDoes: 'What it does',
      launched: 'Launched',
    },
    blog: {
      title: 'Blog',
      lead: 'Notes on product, engineering, and running a small team.',
      readPost: 'Read post',
      empty: 'No posts yet.',
      relatedTitle: 'Related posts',
    },
    awards: {
      source: 'Source',
    },
    footer: {
      company: 'Company',
      products: 'Products',
      contact: 'Contact',
      rights: 'All rights reserved.',
      theme: 'Theme',
    },
    langSwitch: 'Switch language',
    backHome: 'Back to home',
    notFound: {
      title: 'Page not found',
      body: 'This address does not exist, or it has moved somewhere else.',
    },
  },
} as const

export type Dictionary = (typeof dictionaries)['vi']

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary
}
