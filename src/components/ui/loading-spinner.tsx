import { cn } from '@/utilities/ui'
import { Loader2 } from 'lucide-react'
import React from 'react'

export interface LoadingSpinnerProps {
  className?: string
  size?: number
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className, size = 24 }) => {
  return (
    <div className={cn('flex items-center justify-center w-full h-full', className)}>
      <Loader2 className="animate-spin text-muted-foreground" size={size} />
    </div>
  )
}
