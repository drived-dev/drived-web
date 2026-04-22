'use client'

import React, { memo, useCallback, useEffect, useState } from 'react'

interface DigitalClockProps {
  className?: string
  timeZone?: string
}

interface TimeState {
  h: string
  m: string
  s: string
  tick: boolean
}

const DigitalClockInner: React.FC<DigitalClockProps> = ({ className, timeZone = 'Asia/Bangkok' }) => {
  const [time, setTime] = useState<TimeState | null>(null)

  const updateTime = useCallback(() => {
    try {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })

      const parts = formatter.formatToParts(now)
      const h = parts.find((p) => p.type === 'hour')?.value || '00'
      const m = parts.find((p) => p.type === 'minute')?.value || '00'
      const s = parts.find((p) => p.type === 'second')?.value || '00'

      // Merge tick into the same state update to avoid a double-render
      setTime((prev) => ({ h, m, s, tick: !prev?.tick }))
    } catch (error) {
      console.error('Error updating time:', error)
    }
  }, [timeZone])

  useEffect(() => {
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [updateTime])

  if (!time) return <p className={className}>--:--:--</p>

  return (
    <p className={className}>
      {time.h}
      <span className={`transition-opacity duration-500 ${time.tick ? 'opacity-100' : 'opacity-50'}`}>
        :
      </span>
      {time.m}
      <span className={`transition-opacity duration-500 ${time.tick ? 'opacity-100' : 'opacity-50'}`}>
        :
      </span>
      {time.s}
    </p>
  )
}

// memo prevents re-renders of sibling/parent components caused by the clock's
// internal 1-second state updates from propagating up the tree.
export const DigitalClock = memo(DigitalClockInner)
