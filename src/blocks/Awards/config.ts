import type { Block } from 'payload'

export const Awards: Block = {
  slug: 'awards',
  interfaceName: 'AwardsBlock',
  labels: { singular: 'Awards', plural: 'Award sections' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      labels: { singular: 'Award', plural: 'Awards' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'year',
              type: 'text',
              required: true,
              admin: { width: '25%', description: 'e.g. 2024' },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              admin: { width: '75%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'organisation',
              type: 'text',
              required: true,
              admin: { width: '50%', description: 'Who gave it.' },
            },
            {
              name: 'result',
              type: 'text',
              localized: true,
              admin: { width: '50%', description: 'e.g. Top 10, Finalist.' },
            },
          ],
        },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'url', type: 'text', admin: { description: 'Link to proof or coverage.' } },
        { name: 'media', type: 'upload', relationTo: 'media', label: 'Photo or certificate' },
      ],
    },
  ],
}
