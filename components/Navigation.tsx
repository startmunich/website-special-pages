"use client"

import React, { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark-blue border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-dark-blue" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-black text-lg tracking-wider">START</span>
              <span className="text-white font-medium text-xs tracking-wider">MUNICH</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white font-bold text-sm hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              HOME
            </Link>
            
            <Link 
              href="/about" 
              className="text-white font-bold text-sm hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              ABOUT US
            </Link>
            
            <Link 
              href="/batches" 
              className="text-white font-bold text-sm hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              BATCHES
            </Link>
            
            <Link 
              href="/startups" 
              className="text-white font-bold text-sm hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              OUR STARTUPS
            </Link>
            
            {/* Events Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsEventsOpen(true)}
              onMouseLeave={() => setIsEventsOpen(false)}
            >
              <button 
                className="text-white font-bold text-sm hover:text-brand-pink transition-colors uppercase tracking-wide flex items-center space-x-1"
              >
                <span>EVENTS</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isEventsOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isEventsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-brand-dark-blue border border-white/20 shadow-xl rounded-lg overflow-hidden">
                  <Link 
                    href="/events" 
                    className="block px-6 py-3 text-white text-sm hover:bg-brand-pink hover:text-white transition-colors"
                  >
                    All Events
                  </Link>
                  <Link 
                    href="/events/upcoming" 
                    className="block px-6 py-3 text-white text-sm hover:bg-brand-pink hover:text-white transition-colors"
                  >
                    Upcoming Events
                  </Link>
                  <Link 
                    href="/events/past" 
                    className="block px-6 py-3 text-white text-sm hover:bg-brand-pink hover:text-white transition-colors"
                  >
                    Past Events
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/jobs" 
              className="text-white font-bold text-sm hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              JOBS
            </Link>
            
            <Link 
              href="/donate" 
              className="text-white font-bold text-sm hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              DONATE
            </Link>
          </div>

          {/* Apply Now Button - Desktop */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="/apply"
              className="bg-white text-brand-dark-blue px-6 py-2.5 font-black text-sm rounded hover:bg-brand-pink hover:text-white transition-all duration-300 uppercase tracking-wide"
            >
              APPLY NOW
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-white/10">
            <Link 
              href="/" 
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              HOME
            </Link>
            
            <Link 
              href="/about" 
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
            
            <Link 
              href="/batches" 
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BATCHES
            </Link>
            
            <Link 
              href="/startups" 
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              OUR STARTUPS
            </Link>
            
            {/* Mobile Events Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              >
                <span>EVENTS</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isMobileEventsOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMobileEventsOpen && (
                <div className="bg-white/5 space-y-1">
                  <Link 
                    href="/events" 
                    className="block px-8 py-2 text-white text-sm hover:text-brand-pink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    All Events
                  </Link>
                  <Link 
                    href="/events/upcoming" 
                    className="block px-8 py-2 text-white text-sm hover:text-brand-pink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Upcoming Events
                  </Link>
                  <Link 
                    href="/events/past" 
                    className="block px-8 py-2 text-white text-sm hover:text-brand-pink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Past Events
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/jobs" 
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              JOBS
            </Link>
            
            <Link 
              href="/donate" 
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              DONATE
            </Link>

            {/* Apply Now Button - Mobile */}
            <Link 
              href="/apply"
              className="block mx-4 mt-4 text-center bg-white text-brand-dark-blue px-6 py-3 font-black text-sm rounded hover:bg-brand-pink hover:text-white transition-all duration-300 uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              APPLY NOW
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
