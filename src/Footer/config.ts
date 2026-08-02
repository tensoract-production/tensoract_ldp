import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      admin: { description: 'One or two lines under the wordmark.' },
    },
    {
      name: 'columns',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Column', plural: 'Columns' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        {
          name: 'navItems',
          type: 'array',
          maxRows: 8,
          fields: [link({ appearances: false })],
          admin: {
            initCollapsed: true,
            components: { RowLabel: '@/Footer/RowLabel#RowLabel' },
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'address', type: 'textarea', localized: true },
        { name: 'email', type: 'text' },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      maxRows: 6,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'url', type: 'text', required: true, admin: { width: '60%' } },
          ],
        },
      ],
    },
    {
      name: 'legal',
      type: 'text',
      localized: true,
      admin: { description: 'Registered company name shown in the bottom rule.' },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
