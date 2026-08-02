import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const ManifestHero: Block = {
  slug: 'manifestHero',
  interfaceName: 'ManifestHeroBlock',
  labels: { singular: 'Manifest hero', plural: 'Manifest heroes' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: { description: 'Small mono line above the headline.' },
    },
    {
      name: 'headline',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'One line per row. Line breaks are kept exactly as typed.' },
    },
    {
      name: 'lead',
      type: 'textarea',
      localized: true,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: { maxRows: 2 },
    }),
    {
      type: 'collapsible',
      label: 'Shipping label',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'labelCode',
              type: 'text',
              defaultValue: 'TSR-2022',
              admin: { width: '50%', description: 'Tracking code printed on the label.' },
            },
            {
              name: 'labelTitle',
              type: 'text',
              localized: true,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'labelRows',
          type: 'array',
          maxRows: 4,
          admin: { initCollapsed: true },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: { width: '40%' },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: { width: '60%' },
                },
              ],
            },
          ],
        },
        {
          name: 'labelStamp',
          type: 'text',
          localized: true,
          admin: { description: 'Green stamp text, e.g. "Đã xác thực".' },
        },
      ],
    },
  ],
}
