'use client'

import type { TrustMarqueeBlock as TrustMarqueeBlockProps } from '@/payload-types'
import React from 'react'

export const TrustMarqueeBlock: React.FC<
  TrustMarqueeBlockProps & {
    id?: string
  }
> = (props) => {
  const { title, clientNames, id } = props

  if (!clientNames || clientNames.length === 0) return null

  // Triplicate to ensure we always have enough content to fill the screen during animation
  const namesToRender = [...clientNames, ...clientNames, ...clientNames]

  return (
    <section className="space-y-6" id={`block-${id}`}>
      {title && (
        <h2 className="">
          {title}
        </h2>
      )}

      <div className="relative flex select-none overflow-hidden">
        {/* Marquee Container */}
        <div className="flex animate-marquee whitespace-nowrap py-2 gap-4 will-change-transform">
          {namesToRender.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
            >
              <h4 className="">
                {name}
              </h4>

              {/* Optional: Add a diamond or dot separator between names for extra flair */}
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary" />
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
