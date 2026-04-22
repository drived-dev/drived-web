import type { Block } from 'payload'


export const TrustMarquee: Block = {
  slug: 'trust-marquee',
  interfaceName: 'TrustMarqueeBlock',
  labels: {
    singular: 'Trust Marquee',
    plural: 'Trust Marquees',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Marquee Title (Optional)',
    },
    {
      name: 'clientNames',
      type: 'text',
      hasMany: true,
      label: 'Names to Display',
      required: true,
    },
  ],
}
