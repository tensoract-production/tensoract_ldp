import type { Block } from 'payload'

export const ManifestStrip: Block = {
  slug: 'manifestStrip',
  interfaceName: 'ManifestStripBlock',
  labels: { singular: 'Manifest strip', plural: 'Manifest strips' },
  admin: {
    // Full-bleed ink band. Reads as the barcode row on a printed label.
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { width: '35%', description: 'e.g. 2022, 7, 5' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              admin: { width: '65%' },
            },
          ],
        },
      ],
    },
  ],
}
