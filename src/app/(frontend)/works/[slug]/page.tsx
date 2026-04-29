import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { notFound } from 'next/navigation'

import type { Work } from '@/payload-types'

import { WorkHero } from '@/heros/WorkHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from '@/app/(frontend)/works/[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { GoogleSchema } from '@/components/GoogleSchema'
import { cn } from '@/utilities/ui'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const works = await payload.find({
    collection: 'works',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      hasCaseStudy: {
        equals: true,
      },
    },
    select: {
      slug: true,
    },
  })

  const params = works.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Work({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/works/' + decodedSlug
  const work = await queryWorkBySlug({ slug: decodedSlug })

  if (!work || (!work.hasCaseStudy && !draft)) return notFound()

  return (
    <article className="py-8 md:py-16">
      <GoogleSchema doc={work} collection="works" />
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div id="hero">
        <WorkHero work={work} />
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <div className="">
          <RichText className={cn(
            "w-full",
            "[&>p,&>h1,&>h2,&>h3,&>h4,&>h5,&>h6]:max-w-[48rem]",
            "[&>p,&>h1,&>h2,&>h3,&>h4,&>h5,&>h6]:mx-auto"
          )} data={work.content} enableGutter={false} />
          {/* Related Works could be added here similar to Related Posts if a component exists */}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const work = await queryWorkBySlug({ slug: decodedSlug })

  return generateMeta({ doc: work, collectionSlug: 'works' })
}

const queryWorkBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'works',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
