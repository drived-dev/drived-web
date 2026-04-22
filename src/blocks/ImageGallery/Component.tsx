'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '../../components/Media'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Media as MediaType, ImageGalleryBlock as ImageGalleryProps } from '@/payload-types'

type Props = ImageGalleryProps & {
  className?: string
}

export const ImageGallery: React.FC<Props> = (props) => {
  const { className, layout, images, aspectRatio = 'square' } = props

  if (!images || images.length === 0) return null

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
        ? 'aspect-video'
        : aspectRatio === 'portrait'
          ? 'aspect-[3/4]'
          : 'aspect-auto'

  return (
    <div className={cn('py-1', className)}>
      {layout === 'single' && (
        <div className={cn('w-full not-prose relative overflow-hidden', aspectClass)}>
          <Media resource={images[0].image} fill imgClassName="object-cover" />
        </div>
      )}

      {layout === 'split' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 not-prose">
          {images.slice(0, 2).map((item, index: number) => (
            <div key={index} className={cn('w-full overflow-hidden relative', aspectClass)}>
              <Media resource={item.image} fill imgClassName="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {layout === 'columns' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 not-prose">
          {images.slice(0, 3).map((item, index: number) => (
            <div key={index} className={cn('w-full overflow-hidden relative', aspectClass)}>
              <Media resource={item.image} fill imgClassName="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {layout === 'carousel' && (
        <div className="not-prose">
          <Carousel
            className="w-full -ml-1 relative"
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((item, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-1">
                  <div className={cn('p-1 relative overflow-hidden ', aspectClass)}>
                    <Media resource={item.image} fill imgClassName="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="absolute bottom-4 left-4 z-40" />
          </Carousel>
        </div>
      )}
    </div>
  )
}
