import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const ReleasesBlock: Block = {
  slug: 'releases',
  interfaceName: 'ReleasesBlock',
  labels: { singular: 'Releases', plural: 'Release sections' },
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
      admin: { description: 'How many of the most recent releases to list.' },
    },
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
  ],
}
