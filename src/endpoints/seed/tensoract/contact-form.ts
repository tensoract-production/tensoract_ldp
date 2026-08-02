import type { RequiredDataFromCollectionSlug } from 'payload'

import { doc, h, p } from './lexical'

/**
 * The form-builder collection is not localised, so this stays in Vietnamese —
 * the audience most likely to fill it in. Duplicate the form and swap the
 * labels if an English variant is needed.
 */
export const contactForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Liên hệ Tensoract',
  confirmationType: 'message',
  confirmationMessage: doc(
    h('h3', 'Đã nhận được tin nhắn của bạn.'),
    p('Chúng tôi thường trả lời trong vài ngày làm việc.'),
  ),
  submitButtonLabel: 'Gửi tin nhắn',
  fields: [
    {
      blockType: 'text',
      name: 'ho-ten',
      label: 'Họ và tên',
      required: true,
      width: 50,
    },
    {
      blockType: 'email',
      name: 'email',
      label: 'Email',
      required: true,
      width: 50,
    },
    {
      blockType: 'text',
      name: 'cua-hang',
      label: 'Cửa hàng hoặc công ty',
      required: false,
      width: 100,
    },
    {
      blockType: 'textarea',
      name: 'noi-dung',
      label: 'Bạn đang cần gì?',
      required: true,
      width: 100,
    },
  ],
}
