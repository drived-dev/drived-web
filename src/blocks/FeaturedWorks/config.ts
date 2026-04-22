import type { Block } from 'payload'

export const FeaturedWorks: Block = {
  slug: 'featured-works',
  interfaceName: 'FeaturedWorksBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title Section',
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
