import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    // An array rather than a group so that "no header action" is a valid state.
    linkGroup({
      appearances: false,
      overrides: {
        name: 'ctaLinks',
        label: 'Header action',
        maxRows: 1,
        admin: {
          initCollapsed: true,
          description: 'The single emphasised link on the right of the nav. Leave empty to omit.',
        },
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
