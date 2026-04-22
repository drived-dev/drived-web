import type { Block } from 'payload'

import { link } from '../../fields/link'

export const Services: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section Label',
      defaultValue: 'Services',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Service Items',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Service Name',
          required: true,
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            label: 'Link',
          },
        }),
      ],
    },
  ],
}
