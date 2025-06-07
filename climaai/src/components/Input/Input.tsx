'use client'

import { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/util'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-blue-700 font-medium">{label}</label>}
      <input
        className={cn(
          'border border-blue-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition w-full',
          className
        )}
        {...props}
      />
    </div>
  )
}

export default Input
