"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

export const dynamic = 'force-dynamic'
import Image from "next/image"
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
    // Use absolute URL in production, relative in development
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/startups`, {
      cache: 'no-store', // Ensure fresh data
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch startups');
    }
    
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
  const [selectedProgram, setSelectedProgram] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12 // Reduced to approximate 3000px height (about 5-6 cards)
  
  // Animation states for numbers
  const [animatedStartups, setAnimatedStartups] = useState(0)
  const [animatedFunding, setAnimatedFunding] = useState(0)
  const [animatedEmployees, setAnimatedEmployees] = useState(0)
  const hasAnimatedRef = useRef(false)

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
  ).filter(batch => batch).sort()

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

  // Extract unique supporting programs
  const allPrograms = Array.from(
    new Set(
      companies
        .map(company => company.supportingPrograms)
        .filter((program): program is string => program !== undefined && program.trim() !== '')
        .flatMap(program => program.split(',').map(p => p.trim()))
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

    const matchesProgram = selectedProgram === "all" || 
      (company.supportingPrograms && 
       company.supportingPrograms.split(',').some(program => 
         program.trim().toLowerCase().includes(selectedProgram.toLowerCase())
       ))

    const matchesSearch = searchQuery === "" || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesBatch && matchesCategory && matchesYear && matchesProgram && matchesSearch
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedBatch, selectedCategory, selectedYear, selectedProgram, searchQuery])

  // Calculate total statistics
  const totalStartups = companies.length
  const totalRaised = companies.reduce((sum, company) => {
    const amount = parseInt(company.totalRaised?.replace(/[€,]/g, '') || '0')
    return sum + amount
  }, 0)
  const totalEmployees = companies.reduce((sum, company) => sum + (company.employees || 0), 0)

  // Get spotlight startups (show all featured startups)
  const spotlightStartups = companies.filter(company => company.isSpotlight)
  
  // Get Y Combinator startups (show all YC alumni)
  const yCombinatorStartups = companies.filter(company => company.isYCombinator)

  // Animate numbers on component mount
  useEffect(() => {
    if (!loading && !hasAnimatedRef.current && totalStartups > 0) {
      hasAnimatedRef.current = true
      
      let startupsCurrent = 0
      let fundingCurrent = 0
      let employeesCurrent = 0
      
      const fundingTarget = totalRaised / 1000000
      const employeesTarget = totalEmployees || 333
      
      const duration = 1500 // 1.5 seconds
      const steps = 60
      const interval = duration / steps
      
      const startupsIncrement = totalStartups / steps
      const fundingIncrement = fundingTarget / steps
      const employeesIncrement = employeesTarget / steps
      
      let step = 0
      
      const timer = setInterval(() => {
        step++
        
        startupsCurrent += startupsIncrement
        fundingCurrent += fundingIncrement
        employeesCurrent += employeesIncrement
        
        if (step >= steps) {
          setAnimatedStartups(totalStartups)
          setAnimatedFunding(fundingTarget)
          setAnimatedEmployees(employeesTarget)
          clearInterval(timer)
        } else {
          setAnimatedStartups(startupsCurrent)
          setAnimatedFunding(fundingCurrent)
          setAnimatedEmployees(employeesCurrent)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [loading, totalStartups, totalRaised, totalEmployees])

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
        {/* Hero Section with Full-Width Image */}
        <div className="relative w-full overflow-hidden">
          {/* Background Image + Overlay */}
          <div className="absolute inset-0">
            <img
              src="/hero-image.jpg"
              alt="START Munich Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#00002c]/60"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
              {/* Left Side */}
              <div className="flex-1 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d0006f]/20 border border-[#d0006f]/40 rounded-full mb-6 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-[#d0006f] rounded-full animate-pulse"></div>
                  <p className="text-[#d0006f] font-semibold text-xs tracking-widest uppercase">
                    OUR STARTUPS
                  </p>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6">
                  START MUNICH
                  <br />
                  <span className="outline-text">STARTUPS</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                  Discover the innovative companies built by our community of ambitious student entrepreneurs
                </p>
              </div>

              {/* Desktop Stats */}
              <div className="hidden lg:flex flex-col gap-6 min-w-[280px] mt-6 lg:mt-11 ml-auto">
                {/** Stat 1 **/}
                <div className="group relative backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/20 hover:border-[#d0006f]/50 transition transform hover:scale-105 w-full">
                  <div className="absolute top-3 right-3 w-12 h-12 bg-[#d0006f]/20 rounded-full blur-xl group-hover:bg-[#d0006f]/30 transition"></div>
                  <div className="relative text-center">
                    <div className="flex items-baseline justify-center gap-2 mb-3">
                      <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-[#d0006f] transition">
                        {Math.floor(animatedStartups)}
                      </span>
                      <span className="text-3xl font-bold text-[#d0006f] animate-pulse">+</span>
                    </div>
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Companies</p>
                  </div>
                </div>

                {/** Stat 2 **/}
                <div className="group relative backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/20 hover:border-[#d0006f]/50 transition transform hover:scale-105">
                  <div className="absolute top-3 right-3 w-12 h-12 bg-[#d0006f]/20 rounded-full blur-xl group-hover:bg-[#d0006f]/30 transition"></div>
                  <div className="relative text-center">
                    <div className="flex items-baseline justify-center gap-1 mb-3">
                      <span className="text-2xl font-bold text-[#d0006f]">€</span>
                      <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-[#d0006f] transition">
                        {animatedFunding.toFixed(1)}
                      </span>
                      <span className="text-3xl font-bold text-[#d0006f]">M</span>
                    </div>
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Funding</p>
                  </div>
                </div>

                {/** Stat 3 **/}
                <div className="group relative backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/20 hover:border-[#d0006f]/50 transition transform hover:scale-105">
                  <div className="absolute top-3 right-3 w-12 h-12 bg-[#d0006f]/20 rounded-full blur-xl group-hover:bg-[#d0006f]/30 transition"></div>
                  <div className="relative text-center">
                    <div className="flex items-baseline justify-center gap-2 mb-3">
                      <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-[#d0006f] transition">
                        {Math.floor(animatedEmployees)}
                      </span>
                      <span className="text-3xl font-bold text-[#d0006f] animate-pulse">+</span>
                    </div>
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Employees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats (static, below hero) */}
        <div className="lg:hidden backdrop-blur-md mt-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-white">
                  {Math.floor(animatedStartups)}+
                </p>
                <p className="text-xs font-bold text-gray-300 uppercase">Companies</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">
                  €{animatedFunding.toFixed(1)}M
                </p>
                <p className="text-xs font-bold text-gray-300 uppercase">Funding</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">
                  {Math.floor(animatedEmployees)}+
                </p>
                <p className="text-xs font-bold text-gray-300 uppercase">Employees</p>
              </div>
            </div>
          </div>
        </div>


        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">

          {/* Growth Champions Section */}
          {spotlightStartups.length > 0 && (
            <div className="mb-16">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  Featured Startups
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {spotlightStartups.map((company, index) => (
                  <Link
                    key={company.id}
                    href={`/startup-details/${company.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer block"
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
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Y Combinator Section */}
          {yCombinatorStartups.length > 0 && (
            <div className="mb-16">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Y Combinator Alumni
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {yCombinatorStartups.map((company, index) => (
                  <Link
                    key={company.id}
                    href={`/startup-details/${company.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer block"
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
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Join Our Startups - Innovative CTA Section */}
          <div className="mb-16 relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d0006f]/20 via-[#00002c] to-[#d0006f]/10 border border-[#d0006f]/30 p-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d0006f]/20 via-transparent to-[#d0006f]/20 animate-pulse"></div>
              
              <div className="relative bg-[#00002c] rounded-xl p-8 md:p-12">
                {/* Floating animated orbs */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-[#d0006f]/30 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#d0006f]/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Left Side - Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d0006f]/20 border border-[#d0006f]/40 rounded-full mb-4">
                      <div className="w-2 h-2 bg-[#d0006f] rounded-full animate-pulse"></div>
                      <span className="text-[#d0006f] font-bold text-xs tracking-widest uppercase">We're Hiring</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                      Join the{" "}
                      <span className="no-stroke bg-gradient-to-r from-[#d0006f] via-pink-400 to-[#d0006f] bg-clip-text text-transparent animate-pulse">
                        Next Big Thing
                      </span>
                    </h2>
                    
                    <p className="text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
                      Our startups are looking for talented individuals to join their teams. 
                      Explore open positions and be part of building innovative products that matter.
                    </p>
                  </div>

                  {/* Right Side - CTA Button */}
                  <div className="flex-shrink-0">
                    <a
                      href="https://jobs.startmunich.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d0006f] to-pink-600 hover:from-[#d0006f] hover:to-[#d0006f] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d0006f]/50 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                      <span className="relative">Explore Jobs</span>
                      <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

              {/* Supporting Programs Filter */}
              <div>
                <label htmlFor="program-filter" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                  Programs
                </label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white focus:ring-1 focus:ring-white/30 hover:bg-white/10 transition-all">
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    {allPrograms.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
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
                    setSelectedProgram("all")
                    setSearchQuery("")
                  }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-all rounded border border-white/20 hover:border-white/30"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-4">
              <label htmlFor="search-input" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                Search by Name
              </label>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type startup name..."
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:ring-1 focus:ring-white/30 hover:bg-white/10 transition-all rounded focus:outline-none"
              />
            </div>
          </div>

          {/* Company List - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCompanies.map((company, index) => {
              return (
                <Link
                  key={company.id}
                  href={`/startup-details/${company.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer block"
                >
                  {/* Logo Section */}
                  <div className="flex items-center justify-center bg-white p-8 h-48">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

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
                        {company.summary}
                      </p>
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
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&size=80&background=4f46e5&color=fff`;
                                    }}
                                  />
                                </a>
                              ) : (
                                <img
                                  src={founder.imageUrl}
                                  alt={founder.name}
                                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&size=80&background=4f46e5&color=fff`;
                                  }}
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
                  </div>
                </Link>
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