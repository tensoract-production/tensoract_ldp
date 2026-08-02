import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateRelease } from './hooks/revalidateRelease'

/**
 * Shipping history, kept apart from the blog on purpose: an investor scanning
 * for momentum should not have to read essays to find out what shipped.
 */
export const Releases: CollectionConfig<'releases'> = {
  slug: 'releases',
  labels: { singular: 'Release', plural: 'Releases' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    version: true,
    title: true,
    releasedAt: true,
    product: true,
  },
  admin: {
    defaultColumns: ['version', 'title', 'releasedAt', 'product'],
    useAsTitle: 'version',
    group: 'Content',
  },
  fields: [
    {
      name: 'version',
      type: 'text',
      required: true,
      admin: { description: 'e.g. 2.4 or 2026.01' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'One line: what this release changed.' },
    },
    {
      name: 'releasedAt',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' }, position: 'sidebar' },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          InlineToolbarFeature(),
          FixedToolbarFeature(),
        ],
      }),
    },
  ],
  hooks: {
    afterChange: [revalidateRelease],
  },
  versions: {
    drafts: { autosave: { interval: 100 } },
    maxPerDoc: 20,
  },
}
