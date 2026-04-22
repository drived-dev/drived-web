import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Work } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const WorkHero: React.FC<{
  work: Work
}> = ({ work }) => {
  const { heroImage, populatedAuthors, publishedAt, title, client } = work

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="mx-auto">
      <div className="flex flex-col">
        <div className="mb-4 md:mb-8 ">
          {client && (
            <p className="text-primary/60">
              {client}
            </p>
          )}
          <h1 className="mb-4">
            {title}
          </h1>

        </div>
      </div>
    </div>
  )
}
