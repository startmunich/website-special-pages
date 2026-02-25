"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileCommunityOpen, setIsMobileCommunityOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCommunityOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark-blue">
      <div className="mx-auto px-10 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/startlogo.svg"
              alt="START Munich"
              width={120}
              height={54}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/home"
              className="text-white font-bold text-base hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              HOME
            </Link>

            {/* Community Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
            >
              <button
                onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                className="text-white font-bold text-base hover:text-brand-pink transition-colors uppercase tracking-wide flex items-center space-x-1"
              >
                <span>COMMUNITY</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isCommunityOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isCommunityOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-brand-dark-blue border border-white/20 shadow-2xl rounded-xl overflow-hidden animate-fadeIn">
                  <div className="py-2">
                    <Link
                      href="/member-journey"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Member Journey
                      </span>
                    </Link>
                    <Link
                      href="/member-network"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Member Network
                      </span>
                    </Link>
                    <Link
                      href="/members"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Our Members
                      </span>
                    </Link>
                    <Link
                      href="/partners"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Our Partners
                      </span>
                    </Link>
                    <Link
                      href="/jobs"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Our Jobs
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/startups"
              className="text-white font-bold text-base hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              OUR STARTUPS
            </Link>

            <Link
              href="/events"
              className="text-white font-bold text-base hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              EVENTS
            </Link>

            <Link
              href="/for-partners"
              className="text-white font-bold text-base hover:text-brand-pink transition-colors uppercase tracking-wide"
            >
              FOR PARTNERS
            </Link>
          </div>

          {/* Apply Now Button - Desktop */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/apply"
              className="bg-white text-brand-dark-blue px-6 py-2.5 font-black text-base rounded hover:bg-brand-pink hover:text-white transition-all duration-300 uppercase tracking-wide"
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

            {/* Mobile Community Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileCommunityOpen(!isMobileCommunityOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              >
                <span>COMMUNITY</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isMobileCommunityOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobileCommunityOpen && (
                <div className="bg-white/5 space-y-1">
                  <Link
                    href="/member-journey"
                    className="block px-8 py-2 text-white text-sm hover:text-brand-pink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Member Journey
                  </Link>
                  <Link
                    href="/member-network"
                    className="block px-8 py-2 text-white text-sm hover:text-brand-pink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Member Network
                  </Link>
                  <Link
                    href="/members"
                    className="block px-8 py-2 text-white text-sm hover:text-brand-pink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Members
                  </Link>
                  <Link
                    href="/partners"
                    className="block px-8 py-2 text-white text-sm hover:text-brand-pink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Partners
                  </Link>
                  <Link
                    href="/jobs"
                    className="block px-8 py-2 text-white text-sm hover:text-brand-pink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Jobs
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/startups"
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              OUR STARTUPS
            </Link>

            <Link
              href="/events"
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              EVENTS
            </Link>

            <Link
              href="/for-partners"
              className="block px-4 py-3 text-white font-bold text-sm hover:bg-white/5 hover:text-brand-pink transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FOR PARTNERS
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
