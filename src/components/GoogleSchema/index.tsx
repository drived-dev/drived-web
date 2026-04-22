import React from 'react'
import type { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import type { BlogPosting, CreativeWork, WebPage, WithContext } from 'schema-dts'

export type GoogleSchemaProps = {
  doc: any
  collection: 'pages' | 'posts' | 'works'
}

export const GoogleSchema: React.FC<GoogleSchemaProps> = ({ doc, collection }) => {
  const serverURL = getServerSideURL()
  const slug = doc.slug === 'home' ? '' : doc.slug
  const url =
    collection === 'posts'
      ? `${serverURL}/posts/${slug}`
      : collection === 'works'
        ? `${serverURL}/works/${slug}`
        : `${serverURL}/${slug}`

  const title = doc.meta?.title || doc.title
  const description = doc.meta?.description || ''
  const image = typeof doc.meta?.image === 'object' ? doc.meta.image?.url : ''

  if (collection === 'posts' || collection === 'works') {
    const schema: WithContext<BlogPosting | CreativeWork> = {
      '@context': 'https://schema.org',
      '@type': collection === 'posts' ? 'BlogPosting' : 'CreativeWork',
      headline: title,
      description: description,
      image: image ? `${serverURL}${image}` : undefined,
      datePublished: doc.publishedAt || doc.createdAt,
      dateModified: doc.updatedAt,
      author: doc.populatedAuthors?.map((author: any) => ({
        '@type': 'Person',
        name: typeof author === 'object' ? author.name : 'Author',
      })),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    )
  }

  const schema: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
