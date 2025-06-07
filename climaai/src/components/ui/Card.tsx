import { cn } from '../../lib/util'
import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-4 shadow-md", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn("p-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}
