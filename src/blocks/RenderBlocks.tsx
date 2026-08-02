import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { ApproachBlockComponent } from '@/blocks/Approach/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { AwardsBlockComponent } from '@/blocks/Awards/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { ManifestHeroBlockComponent } from '@/blocks/ManifestHero/Component'
import { ManifestStripBlockComponent } from '@/blocks/ManifestStrip/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PartnersBlockComponent } from '@/blocks/Partners/Component'
import { ProductLabelsBlockComponent } from '@/blocks/ProductLabels/Component'
import { ReleasesBlockComponent } from '@/blocks/Releases/Component'
import { StatementBlockComponent } from '@/blocks/Statement/Component'

const blockComponents = {
  approach: ApproachBlockComponent,
  archive: ArchiveBlock,
  awards: AwardsBlockComponent,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  manifestHero: ManifestHeroBlockComponent,
  manifestStrip: ManifestStripBlockComponent,
  mediaBlock: MediaBlock,
  partners: PartnersBlockComponent,
  productLabels: ProductLabelsBlockComponent,
  releases: ReleasesBlockComponent,
  statement: StatementBlockComponent,
}

/**
 * The marketing sections own their vertical rhythm and their own hairline
 * separators; the blocks inherited from the template still need the wrapper.
 */
const selfSpaced = new Set([
  'approach',
  'awards',
  'cta',
  'manifestHero',
  'manifestStrip',
  'partners',
  'productLabels',
  'releases',
  'statement',
])

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: Locale
}> = ({ blocks, locale }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (!blockType || !(blockType in blockComponents)) return null

        const Block = blockComponents[blockType]

        if (!Block) return null

        const rendered = (
          // @ts-expect-error the union of block props is wider than any single block accepts
          <Block {...block} disableInnerContainer locale={locale} />
        )

        return selfSpaced.has(blockType) ? (
          <Fragment key={index}>{rendered}</Fragment>
        ) : (
          <div className="my-16" key={index}>
            {rendered}
          </div>
        )
      })}
    </Fragment>
  )
}
