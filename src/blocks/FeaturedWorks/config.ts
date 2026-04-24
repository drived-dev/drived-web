import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FeaturedWorks: Block = {
  slug: 'featured-works',
  interfaceName: 'FeaturedWorksBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Title Section',
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
      label: 'Variant',
    },
    {
      name: 'works',
      type: 'relationship',
      relationTo: 'works',
      hasMany: true,
      minRows: 2,    
      maxDepth: 2,
      required: true,
      label: 'Select Works',
    },
  ],
}
