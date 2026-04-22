'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { fill, imgClassName, onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { filename, height, url, width } = resource

    return (
      <video
        autoPlay
        className={cn(
          fill && 'absolute inset-0 w-full h-full object-cover',
          videoClassName,
          imgClassName,
          'pointer-events-none',
        )}
        controls={false}
        height={!fill ? height || undefined : undefined}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
        width={!fill ? width || undefined : undefined}
      >
        <source src={getMediaUrl(url || `/media/${filename}`, resource.updatedAt)} />
      </video>
    )
  }

  return null
}
