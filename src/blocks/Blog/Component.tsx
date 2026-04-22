import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

import type { BlogPostsBlock as BlogPostsBlockProps, Category, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { PostCard } from '@/components/PostCard'

export const BlogPostsBlock: React.FC<BlogPostsBlockProps & { id?: string }> = async ({
  id,
  sectionLabel,
  layout = 'grid',
  limit = 6,
  selectedCategories,
}) => {
  const payload = await getPayload({ config })

  const categoryIds =
    selectedCategories
      ?.map((cat) => (typeof cat === 'number' ? cat : cat.id))
      .filter(Boolean) ?? []

  const posts = await payload.find({
    collection: 'posts',
    limit: limit ?? 6,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
      ...(categoryIds.length > 0
        ? { categories: { in: categoryIds } }
        : {}),
    },
    depth: 1,
  })

  const isList = layout === 'list'

  return (
    <section id={`block-${id}`} className="w-full space-y-6">
      {sectionLabel && (
        <h2 className="">
          {sectionLabel}
        </h2>
      )}

      {posts.docs.length === 0 ? (
        <p className="text-muted-foreground font-mono text-sm">No posts found.</p>
      ) : isList ? (
        /* ── List layout ─────────────────────────────────────────── */
        <ul className="divide-y divide-border list-none">
          {posts.docs.map((post) => {
            const image = post.heroImage as MediaType | null | undefined
            const cats = (post.categories as Category[] | null) ?? []
            const date = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
              : null

            return (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex gap-6 py-6 items-center no-underline hover:opacity-75 transition-opacity duration-200"
                >
                  {/* Thumbnail */}
                  {image && typeof image !== 'number' && (
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-muted border border-border">
                      <Media resource={image} fill className="object-cover" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {date ?? '—'}
                      {cats.length > 0 && (
                        <>
                          {' · '}
                          {cats.map((c) => c.title).join(', ')}
                        </>
                      )}
                    </p>
                    <h2 className="text-base font-semibold leading-snug truncate group-hover:underline">
                      {post.title}
                    </h2>
                    {post.meta?.description && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {post.meta.description}
                      </p>
                    )}
                  </div>

                  <span className="inline-block shrink-0 text-xl ml-4 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        /* ── Grid layout ──────────────────────────────────────────── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {posts.docs.map((post) => (
            <PostCard key={post.id} doc={post as any} />
          ))}
        </div>
      )}
    </section>
  )
}
