import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Drive D is a creative technology studio specializing in interactive campaigns built for Gen Z, designed to earn attention and deliver measurable results.',
  images: [
    {
      url: `${getServerSideURL()}/OG.webp`,
    },
  ],
  siteName: 'Drive D',
  title: 'Drive D',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
