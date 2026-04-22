import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

const collectionPrefixes: Record<string, string> = {
  pages: '',
  posts: '/posts',
  works: '/works',
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  collectionSlug?: string
}): Promise<Metadata> => {
  const { doc, collectionSlug } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? 'Drive D | ' + doc?.meta?.title : 'Drive D'

  const prefix = collectionSlug ? collectionPrefixes[collectionSlug] : ''
  const slug = doc?.slug === 'home' ? '' : doc?.slug
  const path = `${prefix}/${slug || ''}`.replace(/\/+/g, '/') || '/'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path,
    }),
    title,
    alternates: {
      canonical: path,
    },
  }
}
