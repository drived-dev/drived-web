import { cn } from '@/utilities/ui'
import React from 'react'
import type { Post } from '@/payload-types'

import { PostCard, PostCardData } from '@/components/PostCard'

export type Props = {
  posts: PostCardData[]
  relationTo?: 'posts' | 'works'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, relationTo } = props

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-12 gap-x-8">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <PostCard doc={result} relationTo={relationTo} />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
