'use client'

import React, { useEffect, useState, useRef } from 'react'
import type { SideNav as SideNavType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export const SideNavClient: React.FC<{ data: SideNavType }> = ({ data }) => {

  const navItems = data?.navItems || []
  const spacerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === '/home'
  const navRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (isHome) {
        const heroEl = document.getElementById('hero')
        const triggerEl = heroEl || document.body
        const startStr = heroEl ? '10% 10%' : 'center top'

        const tl = gsap.timeline({
          ease: 'power2.in',
          scrollTrigger: {
            trigger: triggerEl,
            start: startStr,
            end: '+=400',
            scrub: true,
          },
        })

        tl.fromTo(
          spacerRef.current,
          {
            height: '16rem',
          },
          {
            height: 0,
          },
          0,
        )

        tl.fromTo(
          logoRef.current,
          {
            scale: 1,
          },
          {
            scale: 0.6,
            transformOrigin: 'left top',
          },
          0,
        )
      } else {
        gsap.to(spacerRef.current, {
          height: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
        gsap.to(logoRef.current, {
          scale: 0.6,
          transformOrigin: 'left top',
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      ScrollTrigger.refresh()
    },
    { dependencies: [pathname, isHome], revertOnUpdate: true, scope: navRef },
  )

  return (
    <nav ref={navRef} className={`sticky top-48 pt-16 flex flex-col gap-4 items-start`}>
      <Link href="/" >
        <div ref={logoRef}>
          <Logo className="size-14" />
        </div>
      </Link>

      <div ref={spacerRef} className="h-64" />

      <div className="flex flex-col h-full">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} className="hover:text-primary py-4 text-black transition-colors" />
        })}
      </div>
    </nav>
  )
}
