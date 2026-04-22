import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { SideNav as SideNavType } from '@/payload-types'
import { SideNavClient } from './Component.client'

export async function SideNav() {
  const sideNavData: SideNavType = await getCachedGlobal('side-nav', 1)()
  return <SideNavClient data={sideNavData} />
}
