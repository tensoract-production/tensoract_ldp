import type { Block } from 'payload'

export const Statement: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Statement', plural: 'Statements' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Set large. Keep it to one or two sentences.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'attribution', type: 'text', localized: true, admin: { width: '50%' } },
        { name: 'attributionRole', type: 'text', localized: true, admin: { width: '50%' } },
      ],
    },
  ],
}
