import React from 'react'

interface HeroCardProps {
  children: React.ReactNode
  className?: string
  accentColor?: string
}

/**
 * HeroCard Component
 * A reusable card component for hero sections with glassmorphism effect and hover animations
 * Used for displaying statistics, contact cards, and other hero content
 *
 * @param children - The content to display inside the card
 * @param className - Optional additional CSS classes
 * @param accentColor - Optional accent color override (defaults to #d0006f pink)
 */
export default function HeroCard({ children, className = "", accentColor = "[#d0006f]" }: HeroCardProps) {
  return (
    <div className={`group relative backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/20 hover:border-${accentColor}/50 transition transform hover:scale-105 w-full ${className}`}>
      <div className={`absolute top-3 right-3 w-12 h-12 bg-${accentColor}/20 rounded-full blur-xl group-hover:bg-${accentColor}/30 transition`}></div>
      <div className="relative text-center">
        {children}
      </div>
    </div>
  )
}
