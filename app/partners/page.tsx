"use client"

import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'
import { cn } from "@/lib/utils"
import Hero from "@/components/Hero"

export const dynamic = 'force-dynamic'

interface Partner {
  id: string
  name: string
  category: string
  logoUrl: string
}

// Fetch partners from API
async function fetchPartners(): Promise<Partner[]> {
  try {
    // Use absolute URL in production, relative in development
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/partners`, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch partners');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}

interface PartnersByCategory {
  [category: string]: Partner[]
}

const CATEGORY_ORDER = [
  'TECHNOLOGY',
  'VENTURE CAPITAL',
  'ECOSYSTEM',
  'INITIATIVES',
  'STARTUP',
  'INDUSTRY',
  'OTHER'
];

export default function PartnersPage() {
  const [loading, setLoading] = useState(true)
  const [partners, setPartners] = useState<Partner[]>([])
  const [partnersByCategory, setPartnersByCategory] = useState<PartnersByCategory>({})
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Animation states for numbers
  const [animatedPartners, setAnimatedPartners] = useState(0)
  const [animatedCategories, setAnimatedCategories] = useState(0)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const loadPartners = async () => {
      setLoading(true)
      const data = await fetchPartners()
      setPartners(data)

      // Group partners by category
      const grouped = data.reduce((acc: PartnersByCategory, partner) => {
        const category = partner.category ? partner.category.toUpperCase() : 'OTHER'
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(partner)
        return acc
      }, {})

      setPartnersByCategory(grouped)
      setLoading(false)
    }

    loadPartners()
  }, [])

  // Calculate stats
  const totalPartners = partners.length;
  // Count unique categories actually present in data
  const totalCategories = Object.keys(partnersByCategory).length;

  // Animate numbers
  useEffect(() => {
    if (!loading && !hasAnimatedRef.current && totalPartners > 0) {
      hasAnimatedRef.current = true

      const duration = 1500 // 1.5 seconds
      const steps = 60
      const interval = duration / steps

      const partnersIncrement = totalPartners / steps
      const categoriesIncrement = totalCategories / steps

      let partnersCurrent = 0
      let categoriesCurrent = 0
      let step = 0

      const timer = setInterval(() => {
        step++
        partnersCurrent += partnersIncrement
        categoriesCurrent += categoriesIncrement

        if (step >= steps) {
          setAnimatedPartners(totalPartners)
          setAnimatedCategories(totalCategories)
          clearInterval(timer)
        } else {
          setAnimatedPartners(partnersCurrent)
          setAnimatedCategories(categoriesCurrent)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [loading, totalPartners, totalCategories])

  // Sort categories based on predefined order
  const sortedCategories = Object.keys(partnersByCategory).sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  const scrollToCategory = (category: string) => {
    setActiveCategory(category)
    if (category === 'ALL') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = categoryRefs.current[category]
    if (element) {
      const yOffset = -120; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  const filteredPartners = (category: string) => {
    const categoryPartners = partnersByCategory[category] || [];
    if (!searchQuery) return categoryPartners;
    return categoryPartners.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-dark-blue py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-2xl font-bold text-white tracking-widest animate-pulse">LOADING PARTNERS...</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <Script id="iframe-height-sender" strategy="afterInteractive">
        {`
          function sendHeight() {
            const h = Math.max(
              document.documentElement.scrollHeight,
              document.body.scrollHeight
            );
            parent.postMessage({ type: "EMBED_HEIGHT", height: h }, "*");
          }

          window.addEventListener("load", sendHeight);
          const ro = new ResizeObserver(sendHeight);
          ro.observe(document.documentElement);
          document.addEventListener("DOMContentLoaded", sendHeight);
        `}
      </Script>

      <main className="min-h-screen bg-brand-dark-blue selection:bg-brand-pink selection:text-white">

        {/* Hero Section - Restored Old Style with Stats Added */}
        <Hero
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          title={
            <>
              OUR
              <br />
              <span className="outline-text">PARTNERS</span>
            </>
          }
          description="Powering the next generation of entrepreneurs through world-class collaboration."
        >
          {/** Stat 1 **/}
          <div className="group relative backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/20 hover:border-brand-pink/50 transition transform hover:scale-105 w-full">
            <div className="absolute top-3 right-3 w-12 h-12 bg-brand-pink/20 rounded-full blur-xl group-hover:bg-brand-pink/30 transition"></div>
            <div className="relative text-center">
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-brand-pink transition">
                  {Math.floor(animatedPartners)}
                </span>
                <span className="text-3xl font-bold text-brand-pink">+</span>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Partners</p>
            </div>
          </div>

          {/** Stat 2 **/}
          <div className="group relative backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/20 hover:border-brand-pink/50 transition transform hover:scale-105">
            <div className="absolute top-3 right-3 w-12 h-12 bg-brand-pink/20 rounded-full blur-xl group-hover:bg-brand-pink/30 transition"></div>
            <div className="relative text-center">
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-brand-pink transition">
                  {Math.floor(animatedCategories)}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Industries</p>
            </div>
          </div>
        </Hero>

        {/* Mobile Stats (static, below hero) */}
        <div className="lg:hidden backdrop-blur-md bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-3xl font-black text-white mb-1">
                  {Math.floor(animatedPartners)}+
                </p>
                <p className="text-xs font-bold text-gray-300 uppercase">Partners</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white mb-1">
                  {Math.floor(animatedCategories)}
                </p>
                <p className="text-xs font-bold text-gray-300 uppercase">Industries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Filter & Search Bar */}
        <div className="sticky top-0 z-50 bg-brand-dark-blue/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

              {/* Category Pills */}
              <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide gap-2 no-scrollbar">
                <button
                  onClick={() => scrollToCategory('ALL')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border",
                    activeCategory === 'ALL'
                      ? "bg-brand-pink border-brand-pink text-white shadow-[0_0_15px_rgba(208,0,111,0.5)]"
                      : "bg-transparent border-white/20 text-gray-400 hover:text-white hover:border-white/50"
                  )}
                >
                  All
                </button>
                {sortedCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border",
                      activeCategory === category
                        ? "bg-brand-pink border-brand-pink text-white shadow-[0_0_15px_rgba(208,0,111,0.5)]"
                        : "bg-transparent border-white/20 text-gray-400 hover:text-white hover:border-white/50"
                    )}
                  >
                    {category.charAt(0) + category.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search partner..."
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-white/5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-brand-pink transition duration-150 ease-in-out sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-24">

          {sortedCategories.map((categoryName) => {
            const partnersToShow = filteredPartners(categoryName);
            if (partnersToShow.length === 0) return null;

            return (
              <div
                key={categoryName}
                ref={(el) => {
                  categoryRefs.current[categoryName] = el;
                }}
                className="scroll-mt-32"
              >
                <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-4">
                  <h2 className="text-3xl md:text-4xl font-black text-white">
                    {categoryName.toUpperCase().split(' ')[0]}{' '}
                    <span className="outline-text">
                      {categoryName.toUpperCase().split(' ').slice(1).join(' ') || ''}
                    </span>
                  </h2>
                  <span className="text-gray-500 text-lg font-mono mb-2">
                    ({partnersToShow.length})
                  </span>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {partnersToShow.map((partner: Partner) => (
                    <div
                      key={partner.id}
                      className="group relative"
                    >
                      {/* Logo Card - Reverted to Original Styling */}
                      <div className="relative bg-white rounded-lg p-6 h-32 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-brand-pink/20 group-hover:scale-105 border-2 border-transparent group-hover:border-brand-pink">
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain transition-all duration-300"
                          onError={(e) => {
                            // Fallback to initials if logo fails to load
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = document.createElement('div')
                              fallback.className = 'text-2xl font-bold text-gray-600'
                              fallback.textContent = partner.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </div>

                      {/* Partner Name */}
                      <div className="mt-3 text-center">
                        <p className="text-white font-bold text-sm group-hover:text-brand-pink transition-colors duration-300">
                          {partner.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Become a Partner CTA */}
          <section className="relative mt-32 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-pink via-[#a00055] to-brand-secondary-blue opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

            <div className="relative z-10 px-8 py-20 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                JOIN THE <span className="text-brand-dark-blue">ECOSYSTEM</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
                Become a partner and connect with the most ambitious young founders in Europe.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="/for-partners"
                  className="px-8 py-4 bg-white text-brand-pink font-bold rounded-full text-lg shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                >
                  View Partnership Benefits
                </a>
                <a
                  href="mailto:partnerships@start.tum.de"
                  className="px-8 py-4 bg-brand-dark-blue/30 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-brand-dark-blue hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
