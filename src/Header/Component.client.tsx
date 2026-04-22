'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderInfos } from './Nav'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useGSAP(
    () => {
      const heroEl = document.getElementById('hero')
      const triggerEl = heroEl || document.body
      const startStr = heroEl ? '44% 44%' : 'top top'

      gsap.to(headerRef.current, {
        scale: 0.98,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: triggerEl,
          start: startStr,
          scrub: true,
          end: '+=200',
          // markers: true,
        },
      })
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return (
    <header ref={headerRef} className="container pt-4 md:pt-10 z-0 sticky top-0 transition-all duration-300" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-2 flex justify-between">
        <HeaderInfos data={data} />
      </div>
    </header>
  )
}
