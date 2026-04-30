'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useState } from 'react'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { className, fill, imgClassName, onClick, resource, videoClassName } = props

  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

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
      <div className={cn('relative w-full h-full', className, fill && 'absolute inset-0')}>
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/10 backdrop-blur-sm">
            <LoadingSpinner />
          </div>
        )}
        <video
          autoPlay
          className={cn(
            fill && 'absolute inset-0 w-full h-full object-cover',
            videoClassName,
            imgClassName,
            'pointer-events-none transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
          )}
          controls={false}
          height={!fill ? height || undefined : undefined}
          loop
          muted
          onClick={onClick}
          onLoadedData={() => setIsLoading(false)}
          playsInline
          ref={videoRef}
          width={!fill ? width || undefined : undefined}
        >
          <source src={getMediaUrl(url || `/media/${filename}`, resource.updatedAt)} />
        </video>
      </div>
    )
  }

  return null
}
