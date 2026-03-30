import React from 'react'

interface HeroCardProps {
  children: React.ReactNode
  className?: string
}

export default function HeroCard({ children, className = "" }: HeroCardProps) {
  return (
    <div className={`relative bg-white/[0.08] backdrop-blur-md p-6 sm:p-8 rounded-[1.5rem] border border-white/15 w-full shadow-xl shadow-black/20 ${className}`}>
      <div className="relative text-center">
        {children}
      </div>
    </div>
  )
}
