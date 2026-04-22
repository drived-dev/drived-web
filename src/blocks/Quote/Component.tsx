import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { QuoteBlock as QuoteBlockProps } from '@/payload-types'

type Props = QuoteBlockProps & {
  className?: string
}

export const QuoteBlock: React.FC<Props> = ({ image, quote, author, className }) => {
  return (
    <div className={cn('flex flex-col sm:flex-row items-center gap-2 sm:gap-10 my-10', className)}>
      {/* Left: image */}
      <div className="w-full sm:w-2/5 shrink-0 aspect-square bg-[#f0f0f0] overflow-hidden">
        {image && typeof image === 'object' ? (
          <Media
            resource={image}
            imgClassName="w-full h-full object-cover"
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-[#f0f0f0]" />
        )}
      </div>

      {/* Right: quote content */}
      <div className="flex flex-col gap-4 flex-1 translate-y-[-10px]">
        {quote && (
          <RichText
            data={quote}
            enableGutter={false}
            enableProse={false}
          />
        )}
        {author && (
          <p className="text-sm m-0! text-foreground/70">
            — {author}
          </p>
        )}
      </div>
    </div>
  )
}

