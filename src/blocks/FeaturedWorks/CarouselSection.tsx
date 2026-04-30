"use client"

import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { WorkCard } from '@/components/WorkCard'
import type { Work } from '@/payload-types'

export const CarouselSection: React.FC<{ works: Work[] }> = ({ works }) => {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
    []
  )

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[plugin]}
      className="w-full relative"
    >
      <CarouselContent>
        {works.map((work, index) => (
          <CarouselItem key={index} className=" md:basis-[70%] lg:basis-1/2">
            <WorkCard
              doc={work}
              isSquare={false}
              className="aspect-square sm:aspect-3/2 lg:aspect-5/4 object-cover h-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-3" />
      <CarouselNext className="-right-3" />
    </Carousel>
  )
}
