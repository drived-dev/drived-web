'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Logo } from '@/components/Logo/Logo'
import { Separator } from '@/components/ui/separator'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div className="relative flex flex-col col-span-full">
      <div className='size-10 mb-6 md:mb-8 md:hidden '>
        <Logo />
      </div>

      {richText && (
        <RichText
          className="items-start mx-0 md:max-w-[80%] md:mb-6"
          data={richText}
          enableGutter={false}
        />
      )}
      {Array.isArray(links) && links.length > 0 && (
        <ul className="flex gap-4 mt-4">
          {links.map(({ link }, i) => {
            return (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
