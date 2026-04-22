import type { Block } from 'payload'

export const Blog: Block = {
  slug: 'blog-posts',
  interfaceName: 'BlogPostsBlock',
  labels: {
    singular: 'Blog Posts Section',
    plural: 'Blog Posts Sections',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section Label',
      defaultValue: 'Latest Posts',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 6,
      min: 1,
      max: 12,
    },
    {
      name: 'selectedCategories',
      type: 'relationship',
      label: 'Filter by Categories',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Leave empty to show posts from all categories.',
      },
    },
  ],
}
