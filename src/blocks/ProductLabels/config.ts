import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const ProductLabels: Block = {
  slug: 'productLabels',
  interfaceName: 'ProductLabelsBlock',
  labels: { singular: 'Product labels', plural: 'Product label sections' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'featured',
      options: [
        { label: 'Featured products', value: 'featured' },
        { label: 'All products', value: 'all' },
        { label: 'Pick manually', value: 'manual' },
      ],
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { condition: (_, { source } = {}) => source === 'manual' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        condition: (_, { source } = {}) => source !== 'manual',
        step: 1,
      },
    },
    linkGroup({ appearances: ['outline'], overrides: { maxRows: 1 } }),
  ],
}
