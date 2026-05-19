'use client';

import React, { useState, useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCommunityOpen, setIsMobileCommunityOpen] = useState(false);
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false);
  const [isMobilePartnerOpen, setIsMobilePartnerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const eventsDropdownRef = useRef<HTMLDivElement>(null);
  const partnerDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCommunityOpen(false);
      }
      if (eventsDropdownRef.current && !eventsDropdownRef.current.contains(event.target as Node)) {
        setIsEventsOpen(false);
      }
      if (
        partnerDropdownRef.current &&
        !partnerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPartnerOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark-blue">
      <div className="mx-auto px-10 lg:px-20">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <Image
              src="/startlogo.svg"
              alt="START Munich"
              width={120}
              height={54}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-8 lg:flex">
            <Link
              href="/"
              className="text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
            >
              HOME
            </Link>

            {/* Community Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                className="flex items-center space-x-1 text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
              >
                <span>COMMUNITY</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isCommunityOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isCommunityOpen && (
                <div className="animate-fadeIn absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-white/20 bg-brand-dark-blue shadow-2xl">
                  <div className="py-2">
                    <Link
                      href="/about-us"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-pink"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        About Us
                      </span>
                    </Link>
                    <Link
                      href="/member-journey"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-pink"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Member Journey
                      </span>
                    </Link>
                    <Link
                      href="/members"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-pink"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Our Members
                      </span>
                    </Link>
                    <Link
                      href="https://jobs.startmunich.de/jobs"
                      onClick={() => setIsCommunityOpen(false)}
                      className="group block px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-pink"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
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
              className="text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
            >
              OUR STARTUPS
            </Link>

            {/* Events Dropdown */}
            <div ref={eventsDropdownRef} className="relative">
              <button
                onClick={() => setIsEventsOpen(!isEventsOpen)}
                className="flex items-center space-x-1 text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
              >
                <span>EVENTS</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isEventsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isEventsOpen && (
                <div className="animate-fadeIn absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-white/20 bg-brand-dark-blue shadow-2xl">
                  <div className="py-2">
                    <Link
                      href="/events"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-pink"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        All Events
                      </span>
                    </Link>
                    <div className="mx-4 my-1 border-t border-white/15" />
                    <a
                      href="https://europe-embodied.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-brand-pink hover:text-white"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Europe Embodied
                      </span>
                    </a>
                    <a
                      href="https://www.hacking-legal.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-brand-pink hover:text-white"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Munich Hacking Legal
                      </span>
                    </a>
                    <a
                      href="https://www.munich-startup.de/veranstaltung/isar-unfiltered/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-brand-pink hover:text-white"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Isar Unfiltered
                      </span>
                    </a>
                    <Link
                      href="/eventpage/rtss"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-brand-pink hover:text-white"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Road to START Summit
                      </span>
                    </Link>
                    <Link
                      href="/eventpage/rtsh"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-brand-pink hover:text-white"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Road to START Hack
                      </span>
                    </Link>
                    <Link
                      href="/labs"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsEventsOpen(false)}
                      className="group block px-6 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-brand-pink hover:text-white"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        START Labs
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Partner Dropdown */}
            <div ref={partnerDropdownRef} className="relative">
              <button
                onClick={() => setIsPartnerOpen(!isPartnerOpen)}
                className="flex items-center space-x-1 text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
              >
                <span>PARTNERS</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isPartnerOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isPartnerOpen && (
                <div className="animate-fadeIn absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-white/20 bg-brand-dark-blue shadow-2xl">
                  <div className="py-2">
                    <Link
                      href="/for-partners"
                      onClick={() => setIsPartnerOpen(false)}
                      className="group block px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-pink"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        For Partners
                      </span>
                    </Link>
                    <Link
                      href="/partners"
                      onClick={() => setIsPartnerOpen(false)}
                      className="group block px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-pink"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
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
          <div className="hidden items-center lg:flex">
            <div className="flex gap-[2px] overflow-hidden rounded bg-brand-dark-blue">
              <Link
                href="/apply"
                onClick={() => posthog.capture('nav_apply_clicked', { location: 'desktop' })}
                className="bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-brand-dark-blue transition-all duration-300 hover:bg-brand-pink hover:text-white"
              >
                APPLY NOW
              </Link>
              <a
                href="https://jobs.startmunich.de/jobs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('nav_jobs_clicked', { location: 'desktop' })}
                className="bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-brand-dark-blue transition-all duration-300 hover:bg-brand-pink hover:text-white"
              >
                JOBS
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-brand-dark-blue lg:hidden">
            {/* Header row with logo and close button */}
            <div className="flex h-20 shrink-0 items-center justify-between px-10">
              <Link
                href="/"
                className="flex items-center transition-opacity hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
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
                className="p-2 text-white"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <div className="flex grow flex-col space-y-1 border-t border-white/10 px-10 py-6">
              <Link
                href="/"
                className="block border-b border-white/10 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>

              {/* Mobile Community Dropdown */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setIsMobileCommunityOpen(!isMobileCommunityOpen)}
                  className="flex w-full items-center justify-between py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
                >
                  <span>COMMUNITY</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${isMobileCommunityOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isMobileCommunityOpen && (
                  <div className="space-y-1 pb-3">
                    <Link
                      href="/about-us"
                      className="block py-2.5 pl-4 text-base font-semibold text-white/80 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/member-journey"
                      className="block py-2.5 pl-4 text-base font-semibold text-white/80 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Member Journey
                    </Link>
                    <Link
                      href="/members"
                      className="block py-2.5 pl-4 text-base font-semibold text-white/80 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Members
                    </Link>
                    <Link
                      href="https://jobs.startmunich.de/jobs"
                      className="block py-2.5 pl-4 text-base font-semibold text-white/80 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Jobs
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/startups"
                className="block border-b border-white/10 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                OUR STARTUPS
              </Link>

              {/* Mobile Events Dropdown */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                  className="flex w-full items-center justify-between py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
                >
                  <span>EVENTS</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${isMobileEventsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isMobileEventsOpen && (
                  <div className="space-y-1 pb-3">
                    <Link
                      href="/events"
                      className="block py-2.5 pl-4 text-base font-semibold text-white/80 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      All Events
                    </Link>
                    <a
                      href="https://europe-embodied.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 pl-4 text-sm font-medium text-white/50 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Europe Embodied
                    </a>
                    <a
                      href="https://www.hacking-legal.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 pl-4 text-sm font-medium text-white/50 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Munich Hacking Legal
                    </a>
                    <a
                      href="https://www.munich-startup.de/veranstaltung/isar-unfiltered/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 pl-4 text-sm font-medium text-white/50 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Isar Unfiltered
                    </a>
                    <Link
                      href="/eventpage/rtss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 pl-4 text-sm font-medium text-white/50 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Road to START Summit
                    </Link>
                    <Link
                      href="/eventpage/rtsh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 pl-4 text-sm font-medium text-white/50 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Road to START Hack
                    </Link>
                    <Link
                      href="/labs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 pl-4 text-sm font-medium text-white/50 transition-colors hover:text-brand-pink"
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
                  className="flex w-full items-center justify-between py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-pink"
                >
                  <span>PARTNER</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${isMobilePartnerOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isMobilePartnerOpen && (
                  <div className="space-y-1 pb-3">
                    <Link
                      href="/for-partners"
                      className="block py-2.5 pl-4 text-base font-semibold text-white/80 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      For Partners
                    </Link>
                    <Link
                      href="/partners"
                      className="block py-2.5 pl-4 text-base font-semibold text-white/80 transition-colors hover:text-brand-pink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Partners
                    </Link>
                  </div>
                )}
              </div>

              {/* Apply Now / All Jobs Split Button - Mobile */}
              <div className="flex gap-[2px] overflow-hidden rounded bg-brand-dark-blue pt-10">
                <Link
                  href="/apply"
                  className="flex-1 bg-white px-6 py-4 text-center text-base font-black uppercase text-brand-dark-blue transition-all duration-300 hover:bg-brand-pink hover:text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    posthog.capture('nav_apply_clicked', { location: 'mobile' });
                  }}
                >
                  APPLY NOW
                </Link>
                <a
                  href="https://jobs.startmunich.de/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white px-6 py-4 text-center text-base font-black uppercase text-brand-dark-blue transition-all duration-300 hover:bg-brand-pink hover:text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    posthog.capture('nav_jobs_clicked', { location: 'mobile' });
                  }}
                >
                  JOBS
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
