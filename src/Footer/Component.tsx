import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { DigitalClock } from '@/components/DigitalClock'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const phoneNumber = footerData?.phoneNumber || ''
  const email = footerData?.email || ''
  const location = footerData?.location || ''

  return (
    <footer className="gap-2 grid  gap-y-12 md:gap-y-2 grid-cols-12 py-8 md:py-12 w-full items-start container">

      <div className='md:col-span-2 col-span-3 '>
        <p>2026 ©<br /> DRIVE D</p>
      </div>

      <div className='md:col-span-3 col-span-9 md:col-start-3'>
        <p>MEET US</p>
        <p className='font-mono'>{location}</p>
      </div>

      <div className='md:col-span-3 col-span-4 md:col-start-7 col-start-4'>
        <p>CONTACT</p>
        <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className='font-mono block hover:opacity-60 transition-opacity'>
          {phoneNumber}
        </a>
        <a href={`mailto:${email}`} className='font-mono block hover:opacity-60 transition-opacity'>
          {email}
        </a>
      </div>


      <div className='col-span-3 md:text-right md:col-start-11 col-start-8'>
        <p>BKK TIME</p>
        <DigitalClock />
      </div>
    </footer >
  )
}
