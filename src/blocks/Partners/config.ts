import type { Block } from 'payload'

export const Partners: Block = {
  slug: 'partners',
  interfaceName: 'PartnersBlock',
  labels: { singular: 'Partners', plural: 'Partner sections' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'groups',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Group', plural: 'Groups' },
      admin: {
        initCollapsed: true,
        description: 'e.g. one group for infrastructure, one for programmes and community.',
      },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          labels: { singular: 'Partner', plural: 'Partners' },
          admin: { initCollapsed: true },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                { name: 'url', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional. Falls back to the name set in type.' },
            },
          ],
        },
      ],
    },
  ],
}
