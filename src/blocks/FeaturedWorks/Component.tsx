import type { FeaturedWorksBlock as FeaturedWorksBlockProps, Work } from '@/payload-types'
import React from 'react'
import { WorkCard } from '@/components/WorkCard'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CarouselSection } from './CarouselSection'

export const FeaturedWorksBlock: React.FC<
  FeaturedWorksBlockProps & {
    id?: string
  }
> = ({ title, variant, works, id }) => {
  return (
    <div className="" id={`block-${id}`}>
      {title && <RichText className="mb-8" data={title} enableGutter={false} />}

      {variant === 'carousel' ? (
        <CarouselSection works={works as Work[]} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {(works as Work[]).map((work, index) => {
            const rowPos = index % 4
            const isSquare = rowPos === 1 || rowPos === 2
            const colSpan = isSquare ? 'lg:col-span-5' : 'lg:col-span-7'
            const aspectClass = isSquare
              ? 'aspect-3/2 lg:aspect-square lg:max-h-[600px] max-h-auto h-full'
              : 'aspect-3/2 lg:aspect-auto lg:max-h-[600px] h-full'

            return (
              <WorkCard key={index} doc={work} isSquare={isSquare} className={cn(colSpan, aspectClass)} />
            )
          })}
        </div>
      )}
    </div>
  )
}
