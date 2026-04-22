import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from '@/app/(frontend)/works/page.client'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const works = await payload.find({
    collection: 'works',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
  })

  return (
    <div className="pt-16 pb-24 min-h-[65vh]">
      <PageClient />

      <div className="container">
        <PageRange
          collection="works"
          currentPage={works.page}
          limit={12}
          totalDocs={works.totalDocs}
        />
      </div>

      <CollectionArchive posts={works.docs as any} relationTo="works" />

      <div className="container">
        {works.totalPages > 1 && works.page && (
          <Pagination page={works.page} totalPages={works.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  const serverURL = getServerSideURL()
  return {
    title: `Works | Drive D`,
    alternates: {
      canonical: `${serverURL}/works`,
    },
  }
}
