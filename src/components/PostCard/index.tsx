'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'

export type PostCardData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

export const PostCard: React.FC<{
  className?: string
  doc?: PostCardData
  relationTo?: 'posts' | 'works'
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo = 'posts', title: titleFromProps } = props

  const { slug, heroImage, title } = doc || {}
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group flex flex-col gap-4 hover:cursor-pointer hover:opacity-75 transition-opacity duration-200',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-square w-full overflow-hidden border border-border">
        {heroImage && typeof heroImage !== 'string' ? (
          <Media
            resource={heroImage}
            fill
            imgClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
      </div>

      <div className="flex items-center justify-between gap-6 overflow-hidden px-1">
        <div className="relative flex-1 overflow-hidden min-w-0">
          <Link
            href={href}
            ref={link.ref}
          >
            <h2
              className="block whitespace-nowrap tracking-tight "
            >
              {titleToUse}
            </h2>
          </Link>

          {/* Luxury Blur Truncation: Multi-layered progressive blur mask */}
          <div className="absolute top-0 right-0 bottom-0 pointer-events-none flex" style={{ width: '40%' }}>
            <div className="absolute inset-0 z-1 bg-linear-to-r from-transparent via-background/50 to-background" />

            {/* <div
              className="absolute inset-0 z-2 backdrop-blur-[2px]"
              style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)' }}
            />
            <div
              className="absolute inset-0 z-3 backdrop-blur-[6px]"
              style={{ maskImage: 'linear-gradient(to right, transparent 40%, black 70%)', WebkitMaskImage: 'linear-gradient(to right, transparent 40%, black 70%)' }}
            />
            <div
              className="absolute inset-0 z-4 backdrop-blur-md"
              style={{ maskImage: 'linear-gradient(to right, transparent 70%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 70%, black 100%)' }}
            /> */}
          </div>
        </div>

        <div className="shrink-0">
          <span
            className="inline-block text-xl shrink-0 ml-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </article>
  )
}
