import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className=" max-w-[52rem] mx-auto">
      <div className="flex flex-col">
        <div className="mb-4 md:mb-8 ">
          <h1 className="">
            {title}
          </h1>

          <div className="flex flex-row md:items-center justify-between py-2 border-b border-border text-muted-foreground gap-4">
            <p className="flex items-center gap-1.5">
              {hasAuthors && (
                <>
                  <span>By {formatAuthors(populatedAuthors)}</span>
                  <span className="opacity-40">·</span>
                </>
              )}
            </p>

            <p>
              Published {publishedAt && <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>}
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-video md:aspect-21/10 bg-muted overflow-hidden">
          {heroImage && typeof heroImage !== 'string' && (
            <Media
              fill
              priority
              imgClassName="object-cover"
              resource={heroImage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
