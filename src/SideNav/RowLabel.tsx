'use client'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    link?: {
      label?: string
    }
  }>()

  return data?.link?.label || `Item ${String(rowNumber).padStart(2, '0')}`
}
