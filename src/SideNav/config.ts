import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateSideNav } from './hooks/revalidateSideNav'

export const SideNav: GlobalConfig = {
  slug: 'side-nav',
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
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/SideNav/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSideNav],
  },
}
