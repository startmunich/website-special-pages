"use client"

import React, { useState, useEffect, useRef } from 'react'
import posthog from 'posthog-js'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isPartnerOpen, setIsPartnerOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileCommunityOpen, setIsMobileCommunityOpen] = useState(false)
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false)
  const [isMobilePartnerOpen, setIsMobilePartnerOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const eventsDropdownRef = useRef<HTMLDivElement>(null)
  const partnerDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCommunityOpen(false)
      }
      if (eventsDropdownRef.current && !eventsDropdownRef.current.contains(event.target as Node)) {
        setIsEventsOpen(false)
      }
      if (partnerDropdownRef.current && !partnerDropdownRef.current.contains(event.target as Node)) {
        setIsPartnerOpen(false)
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
              href="/"
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
                      href="/about-us"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        About Us
                      </span>
                    </Link>
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
                      href="https://jobs.startmunich.de/jobs"
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

            {/* Events Dropdown */}
            <div
              ref={eventsDropdownRef}
              className="relative"
            >
              <button
                onClick={() => setIsEventsOpen(!isEventsOpen)}
                className="text-white font-bold text-base hover:text-brand-pink transition-colors uppercase tracking-wide flex items-center space-x-1"
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

              {isEventsOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-brand-dark-blue border border-white/20 shadow-2xl rounded-xl overflow-hidden animate-fadeIn">
                  <div className="py-2">
                    <Link
                      href="/events"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        All Events
                      </span>
                    </Link>
                    <div className="mx-4 my-1 border-t border-white/15" />
                    <a
                      href="https://www.hacking-legal.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-white/70 text-sm font-semibold hover:bg-brand-pink hover:text-white transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-3.5 h-3.5 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Munich Hacking Legal
                      </span>
                    </a>
                    <Link
                      href="/eventpage/rtss"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-white/70 text-sm font-semibold hover:bg-brand-pink hover:text-white transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-3.5 h-3.5 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Road to START Summit
                      </span>
                    </Link>
                    <Link
                      href="/eventpage/rtsh"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-white/70 text-sm font-semibold hover:bg-brand-pink hover:text-white transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-3.5 h-3.5 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Road to START Hack
                      </span>
                    </Link>
                    <Link
                      href="/labs"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-white/70 text-sm font-semibold hover:bg-brand-pink hover:text-white transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-3.5 h-3.5 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        START Labs
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Partner Dropdown */}
            <div
              ref={partnerDropdownRef}
              className="relative"
            >
              <button
                onClick={() => setIsPartnerOpen(!isPartnerOpen)}
                className="text-white font-bold text-base hover:text-brand-pink transition-colors uppercase tracking-wide flex items-center space-x-1"
              >
                <span>PARTNERS</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isPartnerOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isPartnerOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-brand-dark-blue border border-white/20 shadow-2xl rounded-xl overflow-hidden animate-fadeIn">
                  <div className="py-2">
                    <Link
                      href="/for-partners"
                      onClick={() => setIsPartnerOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        For Partners
                      </span>
                    </Link>
                    <Link
                      href="/partners"
                      onClick={() => setIsPartnerOpen(false)}
                      className="group block px-6 py-3.5 text-white text-base font-bold hover:bg-brand-pink transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Our Partners
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Apply Now / All Jobs Split Button - Desktop */}
          <div className="hidden lg:flex items-center">
            <div className="flex rounded overflow-hidden gap-[2px] bg-brand-dark-blue">
              <Link
                href="/apply"
                onClick={() => posthog.capture('nav_apply_clicked', { location: 'desktop' })}
                className="bg-white text-brand-dark-blue px-4 py-1.5 font-bold text-sm hover:bg-brand-pink hover:text-white transition-all duration-300 uppercase tracking-wide"
              >
                APPLY NOW
              </Link>
              <a
                href="https://jobs.startmunich.de/jobs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('nav_jobs_clicked', { location: 'desktop' })}
                className="bg-white text-brand-dark-blue px-4 py-1.5 font-bold text-sm hover:bg-brand-pink hover:text-white transition-all duration-300 uppercase tracking-wide"
              >
                JOBS
              </a>
            </div>
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

        {/* Mobile Menu - Full Screen Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-brand-dark-blue flex flex-col overflow-y-auto">
            {/* Header row with logo and close button */}
            <div className="flex items-center justify-between px-10 h-20 shrink-0">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/startlogo.svg"
                  alt="START Munich"
                  width={120}
                  height={54}
                  className="h-12 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <div className="flex flex-col px-10 py-6 space-y-1 border-t border-white/10 grow">
              <Link
                href="/"
                className="block py-4 text-white font-bold text-lg hover:text-brand-pink transition-colors uppercase tracking-wide border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>

              {/* Mobile Community Dropdown */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setIsMobileCommunityOpen(!isMobileCommunityOpen)}
                  className="w-full flex items-center justify-between py-4 text-white font-bold text-lg hover:text-brand-pink transition-colors uppercase tracking-wide"
                >
                  <span>COMMUNITY</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isMobileCommunityOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMobileCommunityOpen && (
                  <div className="pb-3 space-y-1">
                    <Link
                      href="/about-us"
                      className="block pl-4 py-2.5 text-white/80 text-base font-semibold hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/member-journey"
                      className="block pl-4 py-2.5 text-white/80 text-base font-semibold hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Member Journey
                    </Link>
                    <Link
                      href="/members"
                      className="block pl-4 py-2.5 text-white/80 text-base font-semibold hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Members
                    </Link>
                    <Link
                      href="https://jobs.startmunich.de/jobs"
                      className="block pl-4 py-2.5 text-white/80 text-base font-semibold hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Jobs
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/startups"
                className="block py-4 text-white font-bold text-lg hover:text-brand-pink transition-colors uppercase tracking-wide border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                OUR STARTUPS
              </Link>

              {/* Mobile Events Dropdown */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                  className="w-full flex items-center justify-between py-4 text-white font-bold text-lg hover:text-brand-pink transition-colors uppercase tracking-wide"
                >
                  <span>EVENTS</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isMobileEventsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMobileEventsOpen && (
                  <div className="pb-3 space-y-1">
                    <Link
                      href="/events"
                      className="block pl-4 py-2.5 text-white/80 text-base font-semibold hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      All Events
                    </Link>
                    <a
                      href="https://www.hacking-legal.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block pl-4 py-2 text-white/50 text-sm font-medium hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Munich Hacking Legal
                    </a>
                    <Link
                      href="/eventpage/rtss"
                      className="block pl-4 py-2 text-white/50 text-sm font-medium hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Road to START Summit
                    </Link>
                    <Link
                      href="/eventpage/rtsh"
                      className="block pl-4 py-2 text-white/50 text-sm font-medium hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Road to START Hack
                    </Link>
                    <Link
                      href="/labs"
                      className="block pl-4 py-2 text-white/50 text-sm font-medium hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      START Labs
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Partner Dropdown */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setIsMobilePartnerOpen(!isMobilePartnerOpen)}
                  className="w-full flex items-center justify-between py-4 text-white font-bold text-lg hover:text-brand-pink transition-colors uppercase tracking-wide"
                >
                  <span>PARTNER</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isMobilePartnerOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMobilePartnerOpen && (
                  <div className="pb-3 space-y-1">
                    <Link
                      href="/for-partners"
                      className="block pl-4 py-2.5 text-white/80 text-base font-semibold hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      For Partners
                    </Link>
                    <Link
                      href="/partners"
                      className="block pl-4 py-2.5 text-white/80 text-base font-semibold hover:text-brand-pink transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Partners
                    </Link>
                  </div>
                )}
              </div>

              {/* Apply Now / All Jobs Split Button - Mobile */}
              <div className="pt-10 flex rounded overflow-hidden gap-[2px] bg-brand-dark-blue">
                <Link
                  href="/apply"
                  className="flex-1 text-center bg-white text-brand-dark-blue px-6 py-4 font-black text-base hover:bg-brand-pink hover:text-white transition-all duration-300 uppercase"
                  onClick={() => { setIsMobileMenuOpen(false); posthog.capture('nav_apply_clicked', { location: 'mobile' }) }}
                >
                  APPLY NOW
                </Link>
                <a
                  href="https://jobs.startmunich.de/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-white text-brand-dark-blue px-6 py-4 font-black text-base hover:bg-brand-pink hover:text-white transition-all duration-300 uppercase"
                  onClick={() => { setIsMobileMenuOpen(false); posthog.capture('nav_jobs_clicked', { location: 'mobile' }) }}
                >
                  JOBS
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
