import { Metadata } from 'next'
import React from 'react'
import NotFoundClient from './NotFoundClient'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Drive D',
  description: "The page you are looking for doesn't exist.",
}

export default function NotFound() {
  return <NotFoundClient />
}
