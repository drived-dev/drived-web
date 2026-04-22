'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { RefObject } from 'react'

interface UseMouseFollowProps {
  containerRef: RefObject<Element | null>
  targetRef: RefObject<Element | null>
  strength?: number
  duration?: number
  ease?: string
}

export const useMouseFollow = ({
  containerRef,
  targetRef,
  strength = 0.03,
  duration = 0.8,
  ease = 'power3',
}: UseMouseFollowProps) => {
  useGSAP(
    () => {
      if (!targetRef.current) return

      const xTo = gsap.quickTo(targetRef.current, 'x', { duration, ease })
      const yTo = gsap.quickTo(targetRef.current, 'y', { duration, ease })

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const moveX = (clientX - centerX) * strength
        const moveY = (clientY - centerY) * strength

        xTo(moveX)
        yTo(moveY)
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    },
    { scope: containerRef },
  )
}
