import React from 'react'

import type { ServicesBlock as ServicesBlockProps, Page, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type ServiceItem = {
  name: string
  link?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
    | ({ relationTo: 'pages'; value: number | Page } | null)
    | ({ relationTo: 'posts'; value: number | Post } | null)
    url?: string | null
  }
  id?: string | null
}

export const ServicesBlock: React.FC<ServicesBlockProps & { id?: string }> = ({
  sectionLabel,
  items,
  id,
}) => {
  return (
    <section id={`block-${id}`} className="space-y-4 w-full">
      {sectionLabel && (
        <h2>
          {sectionLabel}
        </h2>
      )}

      <ul className="list-none divide-y divide-border">
        {(items as ServiceItem[] | null | undefined || []).map((item, index) => (
          <li key={item.id ?? index}>
            <CMSLink
              className="flex items-center justify-between w-full py-5 md:py-6 text-lg md:text-2xl font-normal transition-opacity duration-200 ease-in-out hover:opacity-50 no-underline! group"
              appearance="inline"
              type={item.link?.type}
              reference={
                item.link?.reference as
                | { relationTo: 'pages' | 'posts'; value: Page | Post | string | number }
                | null
                | undefined
              }
              url={item.link?.url}
              newTab={item.link?.newTab}
            >
              <span className="flex-1">{item.name}</span>
              <span
                className="inline-block text-xl shrink-0 ml-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </CMSLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
