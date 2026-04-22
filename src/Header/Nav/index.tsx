'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { DigitalClock } from '@/components/DigitalClock'

export const HeaderInfos: React.FC<{ data: HeaderType }> = ({ data }) => {
  const phoneNumber = data?.phoneNumber || ''
  const email = data?.email || ''
  const companyName = data?.companyName || ''

  return (
    <nav className="gap-1 md:gap-2 grid justify-between grid-cols-12 w-full items-start ">
      <div className="col-span-3 md:col-span-2">
        <Link href="/" >
          <p >{companyName}</p>
        </Link>
      </div>
      <div className="col-span-4 md:col-span-2">
        <p>TEL</p>
        <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="font-mono p">
          {phoneNumber}
        </a>
      </div>
      <div className="col-span-4 md:col-span-6">
        <p>EMAIL</p>
        <a href={`mailto:${email}`} className="font-mono p">
          {email}
        </a>
      </div>

      <div className="hidden md:block md:col-span-2 text-right">
        <p>BKK TIME</p>
        <DigitalClock className="font-mono" />
      </div>
    </nav>
  )
}
