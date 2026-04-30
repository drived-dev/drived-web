'use client'
import React from 'react'
import type { Work } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { formatDateTime } from '@/utilities/formatDateTime'
import Link from 'next/link'
import useClickableCard from '@/utilities/useClickableCard'

export type WorkCardProps = {
  className?: string
  doc: Work
  isSquare?: boolean
}

export const WorkCard: React.FC<WorkCardProps> = ({ className, doc, isSquare }) => {
  const { card, link } = useClickableCard({})
  const { title, client, publishedAt, hasCaseStudy, slug, heroImageSquare, heroImageWide } = doc

  return (
    <article
      className={cn(
        'relative group bg-muted overflow-hidden border border-border flex flex-col',
        hasCaseStudy && 'cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="flex-1 bg-muted/50 relative">
        {isSquare && heroImageSquare && typeof heroImageSquare !== 'string' ? (
          <Media
            resource={heroImageSquare}
            fill
            imgClassName="object-cover transition-transform duration-500 "
            htmlElement={null}
          />
        ) : (
          heroImageWide &&
          typeof heroImageWide !== 'string' && (
            <Media
              resource={heroImageWide}
              fill
              imgClassName={cn('object-cover transition-transform duration-500 ')}
              htmlElement={null}
            />
          )
        )}
      </div>

      {/* Click to view overlay for cards with case study */}
      {hasCaseStudy && (
        <>
          <Link
            href={`/works/${slug}`}
            ref={link.ref}
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View {title}</span>
          </Link>
          <div className="absolute top-4 right-4 bg-muted-foreground/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 delay-100 px-2 font-mono text-sm py-0.5">
            click to view
          </div>
        </>
      )}

      {/* Info Bar at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-muted-foreground/70 backdrop-blur-sm p-2 text-sm opacity-100 ">
        <div className="grid grid-cols-3 gap-2 text-xs uppercase tracking-wider font-medium text-black/50 mb-1">
          <div>Project</div>
          <div className={cn('text-center')}>Client</div>
          <div className="text-right">Date</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-black font-mono">
          <div>{title}</div>
          <div className={cn('text-center')}>{client}</div>
          <div className="text-right">{publishedAt ? formatDateTime(publishedAt) : ''}</div>
        </div>
      </div>
    </article>
  )
}
