'use client'

import React, { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export const LayoutSeparator = () => {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === '/home'
  const separatorRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(separatorRef.current, {
        marginTop: isHome ? '4vh' : '4vh',
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          ScrollTrigger.refresh()
        },
      })
    },
    { dependencies: [pathname, isHome] },
  )

  return <Separator ref={separatorRef} className="col-span-full" />
}
