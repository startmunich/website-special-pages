import React from 'react'

interface HeroCardProps {
  children: React.ReactNode
  className?: string
}

export default function HeroCard({ children, className = "" }: HeroCardProps) {
  return (
    <div className={`relative bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/20 w-full ${className}`}>
      <div className="relative text-center">
        {children}
      </div>
    </div>
  )
}
