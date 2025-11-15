"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Script from "next/script"

interface Founder {
  name: string
  role: string
  batch: string
  imageUrl: string
  linkedinUrl?: string
}

interface Company {
  id: number
  name: string
  website: string
  summary: string
  description: string
  logoUrl: string
  foundingYear: number | string
  category: string[]
  founders: Founder[]
  totalRaised?: string
  employees?: number
  isSpotlight?: boolean
  isYCombinator?: boolean
  companyLinkedin?: string
  investmentRound?: string
  milestones?: string
  supportingPrograms?: string
}

// Fetch companies from API
async function fetchCompanies(): Promise<Company[]> {
  try {
    const response = await fetch('/api/startups');
    if (!response.ok) throw new Error('Failed to fetch startups');
    return await response.json();
  } catch (error) {
    console.error('Error fetching startups:', error);
    return [];
  }
}

// Helper function to get preview text (first 30 words)
function getPreviewText(text: string): string {
  if (!text) return '';
  
  const words = text.split(/\s+/);
  const maxWords = 30;
  
  if (words.length <= maxWords) {
    return text;
  }
  
  return words.slice(0, maxWords).join(' ') + '...';
}

export default function StartupsPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBatch, setSelectedBatch] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // Reduced to approximate 3000px height (about 5-6 cards)

  // Load companies on mount
  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true)
      const data = await fetchCompanies()
      setCompanies(data)
      setLoading(false)
    }
    loadCompanies()
  }, [])

  // Extract unique batches from all founders
  const allBatches = Array.from(
    new Set(
      companies.flatMap(company => 
        company.founders.map(founder => founder.batch)
      )
    )
  ).sort()

  // Extract unique categories
  const allCategories = Array.from(
    new Set(
      companies.flatMap(company => company.category)
    )
  ).sort()

  // Extract unique founding years
  const allYears = Array.from(
    new Set(
      companies.map(company => company.foundingYear.toString())
    )
  ).sort()

  // Filter companies based on all selected filters
  const filteredCompanies = companies.filter(company => {
    const matchesBatch = selectedBatch === "all" || 
      company.founders.some(founder => founder.batch === selectedBatch)
    
    const matchesCategory = selectedCategory === "all" || 
      company.category.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()))
    
    const matchesYear = selectedYear === "all" || 
      company.foundingYear.toString() === selectedYear

    return matchesBatch && matchesCategory && matchesYear
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedBatch, selectedCategory, selectedYear])

  const toggleCard = (id: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Calculate total statistics
  const totalStartups = companies.length
  const totalRaised = companies.reduce((sum, company) => {
    const amount = parseInt(company.totalRaised?.replace(/[€,]/g, '') || '0')
    return sum + amount
  }, 0)
  const totalEmployees = companies.reduce((sum, company) => sum + (company.employees || 0), 0)

  // Get spotlight startups
  const spotlightStartups = companies.filter(company => company.isSpotlight).slice(0, 3)
  
  // Get Y Combinator startups
  const yCombinatorStartups = companies.filter(company => company.isYCombinator).slice(0, 6)

  if (loading) {
    return (
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-[#00002c]">Loading startups...</p>
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

          // initial + on changes
          window.addEventListener("load", sendHeight);
          const ro = new ResizeObserver(sendHeight);
          ro.observe(document.documentElement);
          document.addEventListener("DOMContentLoaded", sendHeight);
        `}
      </Script>
      
      <main className="min-h-screen bg-[#00002c]">
        {/* Hero Section with Gradient Background */}
        <div className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 -left-20 w-72 h-72 bg-[#d0006f] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-40 -right-20 w-72 h-72 bg-[#d0006f] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-[#d0006f] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>

          {/* Main Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header Section */}
            <div className="mb-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d0006f]/10 border border-[#d0006f]/30 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#d0006f] rounded-full animate-pulse"></div>
                <p className="text-[#d0006f] font-semibold text-xs tracking-widest uppercase">OUR STARTUPS</p>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6 leading-tight">
                START Munich
                <br />
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Startups
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Discover the innovative companies built by our community of ambitious student entrepreneurs
              </p>
            </div>

            {/* Statistics Section - Enhanced */}
            <div className="mb-16 relative">
              {/* Background Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10"></div>
              
              <div className="relative py-16 px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Stat 1 - Companies Founded */}
                  <div className="group text-center">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-[#d0006f] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-baseline justify-center gap-1 mb-2">
                          <span className="text-7xl md:text-8xl font-black text-white group-hover:scale-110 transition-transform duration-300 inline-block">
                            {totalStartups}
                          </span>
                          <span className="text-3xl font-bold text-[#d0006f] mb-4">+</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-300 uppercase tracking-widest">Companies</p>
                      <p className="text-xs text-gray-500">Founded by our alumni</p>
                    </div>
                    <div className="mt-4 h-1 w-16 bg-gradient-to-r from-transparent via-[#d0006f] to-transparent mx-auto opacity-50"></div>
                  </div>

                  {/* Stat 2 - Total Funding */}
                  <div className="group text-center border-x border-white/10 md:border-x md:border-white/10">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-[#d0006f] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-baseline justify-center gap-1 mb-2">
                          <span className="text-4xl font-bold text-[#d0006f]">€</span>
                          <span className="text-7xl md:text-8xl font-black bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                            {(totalRaised / 1000000).toFixed(1)}
                          </span>
                          <span className="text-4xl font-bold text-[#d0006f] mb-4">M</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-300 uppercase tracking-widest">Total Funding</p>
                      <p className="text-xs text-gray-500">Publicly communicated</p>
                    </div>
                    <div className="mt-4 h-1 w-16 bg-gradient-to-r from-transparent via-[#d0006f] to-transparent mx-auto opacity-50"></div>
                  </div>

                  {/* Stat 3 - Employees */}
                  <div className="group text-center">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-[#d0006f] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-baseline justify-center gap-1 mb-2">
                          <span className="text-7xl md:text-8xl font-black text-white group-hover:scale-110 transition-transform duration-300 inline-block">
                            {totalEmployees || "300"}
                          </span>
                          <span className="text-3xl font-bold text-[#d0006f] mb-4">+</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-300 uppercase tracking-widest">Employees</p>
                      <p className="text-xs text-gray-500">Current workforce</p>
                    </div>
                    <div className="mt-4 h-1 w-16 bg-gradient-to-r from-transparent via-[#d0006f] to-transparent mx-auto opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Growth Champions Section */}
          {spotlightStartups.length > 0 && (
            <div className="mb-16">
              <div className="mb-10 flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Growth Champions
                </h2>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                  <span className="text-yellow-400 text-xl font-bold">🏆</span>
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Featured</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {spotlightStartups.map((company, index) => (
                  <a
                    key={company.id}
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 hover:from-yellow-500/10 hover:to-yellow-500/15 border border-yellow-500/20 hover:border-yellow-500/40 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <div className="flex justify-center items-center bg-white p-8 h-48">
                      <img
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                        <span className="text-yellow-400 text-xs font-bold px-2 py-1 bg-yellow-500/20 rounded">★</span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">{company.summary}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Y Combinator Section */}
          {yCombinatorStartups.length > 0 && (
            <div className="mb-16">
              <div className="mb-10 flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Y Combinator Alumni
                </h2>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
                  <span className="text-orange-400 text-xl font-bold">Y</span>
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">YC</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {yCombinatorStartups.map((company, index) => (
                  <a
                    key={company.id}
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-gradient-to-br from-orange-500/5 to-orange-500/10 hover:from-orange-500/10 hover:to-orange-500/15 border border-orange-500/20 hover:border-orange-500/40 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <div className="flex justify-center items-center bg-white p-8 h-48">
                      <img
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                        <span className="text-orange-400 text-xs font-bold px-2 py-1 bg-orange-500/20 rounded">YC</span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">{company.summary}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Filter Section */}
          <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Batch Filter */}
              <div>
                <label htmlFor="batch-filter" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Batch
                </label>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white focus:ring-1 focus:ring-white/30 hover:bg-white/10 transition-all">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    {allBatches.map((batch) => (
                      <SelectItem key={batch} value={batch}>
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category-filter" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white focus:ring-1 focus:ring-white/30 hover:bg-white/10 transition-all">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {allCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Founding Year Filter */}
              <div>
                <label htmlFor="year-filter" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Founded
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white focus:ring-1 focus:ring-white/30 hover:bg-white/10 transition-all">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {allYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedBatch("all")
                    setSelectedCategory("all")
                    setSelectedYear("all")
                  }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-all rounded border border-white/20 hover:border-white/30"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Company List - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCompanies.map((company, index) => {
              const isExpanded = expandedCards.has(company.id)
              return (
                <div
                  key={company.id}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg overflow-hidden transition-all duration-300"
                >
                  {/* Logo Section */}
                  <a 
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-center justify-center bg-white p-8 h-48">
                      <img
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </a>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold text-white mb-2 leading-tight">
                        {company.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {company.category.slice(0, 2).map((cat, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                        {isExpanded ? company.description : getPreviewText(company.description)}
                      </p>
                      {getPreviewText(company.description) !== company.description && (
                        <button 
                          className="text-white/70 hover:text-white text-xs mt-2 underline"
                          onClick={() => toggleCard(company.id)}
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-4">
                      <span>Founded {company.foundingYear}</span>
                      {company.totalRaised && company.totalRaised !== "€0" && (
                        <>
                          <span>•</span>
                          <span>{company.totalRaised} raised</span>
                        </>
                      )}
                      {company.investmentRound && (
                        <>
                          <span>•</span>
                          <span>{company.investmentRound}</span>
                        </>
                      )}
                    </div>

                    {/* Founders Section */}
                    {company.founders.length > 0 && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                          {company.founders.length > 1 ? 'Founders' : 'Founder'}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {company.founders.map((founder, founderIdx) => (
                            <div key={founderIdx} className="flex items-center gap-2">
                              {founder.linkedinUrl ? (
                                <a 
                                  href={founder.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block"
                                >
                                  <img
                                    src={founder.imageUrl}
                                    alt={founder.name}
                                    className="w-10 h-10 rounded-full object-cover border border-white/20 hover:border-white/40 transition-all"
                                  />
                                </a>
                              ) : (
                                <img
                                  src={founder.imageUrl}
                                  alt={founder.name}
                                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{founder.name}</p>
                                <p className="text-xs text-gray-500 truncate">{founder.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expanded Content */}
                    {isExpanded && (
                      <>
                        {company.milestones && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Milestones</p>
                            <ul className="list-none text-xs text-gray-400 space-y-1">
                              {company.milestones.split('-').filter(m => m.trim()).map((milestone, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#d0006f] mt-0.5">•</span>
                                  <span>{milestone.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {company.supportingPrograms && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Programmes</p>
                            <ul className="list-none text-xs text-gray-400 space-y-1">
                              {company.supportingPrograms.split(',').filter(p => p.trim()).map((program, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#d0006f] mt-0.5">•</span>
                                  <span>{program.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block p-12 bg-white/5 border border-white/20 rounded-lg">
                <p className="text-xl font-semibold text-white mb-2">No Results Found</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters to see more startups</p>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredCompanies.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded border border-white/20"
              >
                ← Previous
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 text-sm font-medium rounded transition-all ${
                      currentPage === page
                        ? 'bg-white text-[#00002c]'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded border border-white/20"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Footer CTA Section */}
        <div className="border-t border-white/10 mt-20 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Be part of Munich's most vibrant student entrepreneur ecosystem
            </p>
            <a 
              href="https://www.startmunich.de/apply"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium text-[#00002c] bg-white hover:bg-gray-100 transition-all rounded group"
            >
              Apply Now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}