import type { Block } from 'payload'

export const ImageGallery: Block = {
  slug: 'imageGallery',
  interfaceName: 'ImageGalleryBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'single',
      options: [
        {
          label: 'Single Image',
          value: 'single',
        },
        {
          label: 'Split (2 Images)',
          value: 'split',
        },
        {
          label: 'Columns (3 Images)',
          value: 'columns',
        },
        {
          label: 'Carousel',
          value: 'carousel',
        },
      ],
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 1,
      required: true,
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'square',
      options: [
        {
          label: 'Square (1:1)',
          value: 'square',
        },
        {
          label: 'Video (16:9)',
          value: 'video',
        },
        {
          label: 'Portrait (3:4)',
          value: 'portrait',
        },
        {
          label: 'Natural',
          value: 'natural',
        },
      ],
    },
  ],
}
