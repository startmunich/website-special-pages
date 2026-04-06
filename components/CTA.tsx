"use client"

import { ReactNode } from 'react'
import Link from 'next/link'

interface CTAButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

interface CTAProps {
  title: string | ReactNode
  description: string | ReactNode
  buttons: CTAButton[]
  layout?: 'centered' | 'split'
  className?: string
}

export default function CTA({
  title,
  description,
  buttons,
  layout = 'centered',
  className = ''
}: CTAProps) {
  const renderButton = (button: CTAButton, index: number) => {
    const isPrimary = button.variant === 'primary' || (index === 0 && !button.variant)
    const baseClasses = "px-8 py-3 font-bold rounded-full transition-all duration-300"
    const primaryClasses = "bg-[#d0006f] hover:bg-[#d0006f]/90 text-white hover:shadow-lg hover:shadow-[#d0006f]/50"
    const secondaryClasses = "border border-[#d0006f] text-[#d0006f] hover:bg-[#d0006f]/10"

    return (
      <Link
        key={index}
        href={button.href}
        className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
      >
        {button.label}
      </Link>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a3e] via-[#00002c] to-[#0d0d1f] border-2 border-[#d0006f]/50 shadow-2xl shadow-[#d0006f]/20 ${className}`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d0006f]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d0006f]/5 rounded-full blur-3xl"></div>

      <div className="relative p-8 md:p-12">
        {layout === 'centered' ? (
          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                {title}
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {buttons.map(renderButton)}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Side - Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                {title}
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl">
                {description}
              </p>
            </div>

            {/* Right Side - Buttons */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4">
              {buttons.map(renderButton)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
