import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateProduct } from './hooks/revalidateProduct'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    code: true,
    status: true,
    tagline: true,
    category: true,
    externalUrl: true,
    logo: true,
  },
  admin: {
    defaultColumns: ['code', 'title', 'status', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug, collection: 'products', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'products', req }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              admin: {
                description: 'One line, shown under the product name on the label card.',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Two or three sentences for the products index.',
              },
            },
            {
              type: 'row',
              fields: [
                { name: 'logo', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
                { name: 'cover', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
              ],
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'What it does',
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
            {
              name: 'metrics',
              type: 'array',
              label: 'Numbers',
              maxRows: 4,
              admin: {
                initCollapsed: true,
                description: 'Only add a number you can stand behind publicly.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { width: '40%' } },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      localized: true,
                      admin: { width: '60%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              localized: true,
              label: false,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  BlocksFeature({ blocks: [MediaBlock] }),
                  InlineToolbarFeature(),
                  FixedToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Tracking code printed on the label, e.g. TSR-01.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'live',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Live', value: 'live' },
        { label: 'Beta', value: 'beta' },
        { label: 'In development', value: 'building' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      defaultValue: 'side',
      admin: {
        position: 'sidebar',
        description:
          'Flagship leads the company story; companions ship alongside it; side products are maintained but not led with.',
      },
      options: [
        { label: 'Flagship', value: 'flagship' },
        { label: 'Companion to the flagship', value: 'companion' },
        { label: 'Side product', value: 'side' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'ecommerce',
      admin: { position: 'sidebar' },
      options: [
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'AI tooling', value: 'ai' },
        { label: 'Education', value: 'education' },
      ],
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Product website',
      admin: { position: 'sidebar', description: 'Full URL, e.g. https://goihangchuan.vn' },
    },
    {
      name: 'launchedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'monthOnly' } },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the home page.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Lower numbers sort first.' },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
