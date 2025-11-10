"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Founder {
  name: string
  role: string
  batch: string
  imageUrl: string
}

interface Company {
  id: number
  name: string
  website: string
  summary: string
  description: string
  logoUrl: string
  foundingYear: number
  category: string[]
  founders: Founder[]
  totalRaised?: string
  employees?: number
  isSpotlight?: boolean
}

const companies: Company[] = [
  {
    id: 1,
    name: "Forto",
    website: "forto.com",
    summary: "Digital logistics platform covering the entire supply chain process from booking to tracking.",
    description: "Forto's logistics platform covers the entire supply chain process, from offer to booking, document administration, tracking and tracing. By delivering a highly transparent, frictionless, and sustainable digital supply chain, Forto supports its customers with greater visibility, insight, and control. Leading manufacturers and e-commerce brands are among the 2,500 customers using Forto's digitally-focused offerings as part of their supply chain delivery.",
    logoUrl: "https://ui-avatars.com/api/?name=Forto&size=300&background=1a1f3a&color=fff&bold=true&font-size=0.4",
    foundingYear: 2016,
    category: ["SaaS", "Logistics", "Supply Chain"],
    totalRaised: "€240M",
    employees: 850,
    isSpotlight: true,
    founders: [
      {
        name: "Erik Muttersbach",
        role: "CEO",
        batch: "Spring 2013",
        imageUrl: "https://ui-avatars.com/api/?name=Erik+Muttersbach&size=80&background=4f46e5&color=fff"
      },
      {
        name: "Michael Wax",
        role: "CTO",
        batch: "Spring 2013",
        imageUrl: "https://ui-avatars.com/api/?name=Michael+Wax&size=80&background=0891b2&color=fff"
      }
    ]
  },
  {
    id: 2,
    name: "TechVenture",
    website: "techventure.io",
    summary: "AI-powered platform helping businesses automate processes and scale operations efficiently.",
    description: "TechVenture is revolutionizing the way businesses approach digital transformation. With cutting-edge AI and machine learning solutions, we help companies automate processes, gain insights from data, and scale their operations efficiently. Our platform serves over 1,000 enterprises worldwide.",
    logoUrl: "https://ui-avatars.com/api/?name=TechVenture&size=300&background=2c3e50&color=fff&bold=true&font-size=0.4",
    foundingYear: 2018,
    category: ["AI", "SaaS", "Manufacturing"],
    totalRaised: "€85M",
    employees: 320,
    isSpotlight: true,
    founders: [
      {
        name: "Sarah Johnson",
        role: "CEO & Founder",
        batch: "Fall 2015",
        imageUrl: "https://ui-avatars.com/api/?name=Sarah+Johnson&size=80&background=ec4899&color=fff"
      }
    ]
  },
  {
    id: 3,
    name: "FinanceFlow",
    website: "financeflow.com",
    summary: "Cloud-based financial management platform for SMBs with accounting and invoicing tools.",
    description: "FinanceFlow provides next-generation financial management tools for small and medium-sized businesses. Our cloud-based platform simplifies accounting, invoicing, and financial reporting, helping businesses make better financial decisions with real-time insights and automation.",
    logoUrl: "https://ui-avatars.com/api/?name=FinanceFlow&size=300&background=27ae60&color=fff&bold=true&font-size=0.4",
    foundingYear: 2017,
    category: ["SaaS", "FinTech", "Accounting"],
    totalRaised: "€52M",
    employees: 180,
    isSpotlight: true,
    founders: [
      {
        name: "David Chen",
        role: "CEO",
        batch: "Spring 2013",
        imageUrl: "https://ui-avatars.com/api/?name=David+Chen&size=80&background=8b5cf6&color=fff"
      },
      {
        name: "Lisa Park",
        role: "CFO",
        batch: "Fall 2014",
        imageUrl: "https://ui-avatars.com/api/?name=Lisa+Park&size=80&background=f59e0b&color=fff"
      }
    ]
  },
  {
    id: 4,
    name: "HealthTech Solutions",
    website: "healthtech.io",
    summary: "Telemedicine platform connecting patients with healthcare providers and managing medical records.",
    description: "HealthTech Solutions is transforming healthcare delivery through innovative technology. Our telemedicine platform connects patients with healthcare providers, streamlines medical records management, and improves patient outcomes through data-driven insights and personalized care.",
    logoUrl: "https://ui-avatars.com/api/?name=HealthTech&size=300&background=e74c3c&color=fff&bold=true&font-size=0.4",
    foundingYear: 2019,
    category: ["HealthTech", "SaaS", "Telemedicine"],
    totalRaised: "€38M",
    employees: 145,
    founders: [
      {
        name: "Dr. Amanda Rodriguez",
        role: "CEO & Chief Medical Officer",
        batch: "Fall 2015",
        imageUrl: "https://ui-avatars.com/api/?name=Amanda+Rodriguez&size=80&background=10b981&color=fff"
      },
      {
        name: "James Wilson",
        role: "CTO",
        batch: "Spring 2016",
        imageUrl: "https://ui-avatars.com/api/?name=James+Wilson&size=80&background=3b82f6&color=fff"
      }
    ]
  },
  {
    id: 5,
    name: "EduLearn",
    website: "edulearn.com",
    summary: "Interactive online learning platform offering courses in technology, business, and creative skills.",
    description: "EduLearn is democratizing education through our interactive online learning platform. We offer courses in technology, business, and creative skills, with personalized learning paths and real-world projects. Over 500,000 students have advanced their careers through our platform.",
    logoUrl: "https://ui-avatars.com/api/?name=EduLearn&size=300&background=9b59b6&color=fff&bold=true&font-size=0.4",
    foundingYear: 2020,
    category: ["EdTech", "AI", "SaaS"],
    totalRaised: "€28M",
    employees: 95,
    founders: [
      {
        name: "Robert Martinez",
        role: "Founder & CEO",
        batch: "Fall 2014",
        imageUrl: "https://ui-avatars.com/api/?name=Robert+Martinez&size=80&background=ef4444&color=fff"
      }
    ]
  }
]

export default function Home() {
  const [selectedBatch, setSelectedBatch] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

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
      company.category.includes(selectedCategory)
    
    const matchesYear = selectedYear === "all" || 
      company.foundingYear.toString() === selectedYear

    return matchesBatch && matchesCategory && matchesYear
  })

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
    const amount = parseInt(company.totalRaised?.replace(/[€M]/g, '') || '0')
    return sum + amount
  }, 0)
  const totalEmployees = companies.reduce((sum, company) => sum + (company.employees || 0), 0)

  // Get spotlight startups
  const spotlightStartups = companies.filter(company => company.isSpotlight)

  return (
    <>
      {/* Header */}
      <header className="bg-[#00002c] border-b-2 border-[#00002c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white flex items-center justify-center">
                  <span className="text-[#00002c] font-black text-xl">S</span>
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-none uppercase">START</p>
                  <p className="text-white text-xs leading-none uppercase tracking-wider">MUNICH</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-[#d0006f] font-bold text-sm uppercase tracking-wide transition-colors">
                Home
              </a>
              <a href="#" className="text-white hover:text-[#d0006f] font-bold text-sm uppercase tracking-wide transition-colors">
                About Us
              </a>
              <a href="#" className="text-white hover:text-[#d0006f] font-bold text-sm uppercase tracking-wide transition-colors">
                For Students
              </a>
              <a href="#" className="text-white hover:text-[#d0006f] font-bold text-sm uppercase tracking-wide transition-colors">
                For Partners
              </a>
              <a href="#" className="text-white hover:text-[#d0006f] font-bold text-sm uppercase tracking-wide transition-colors">
                Events
              </a>
              <a href="#" className="text-white hover:text-[#d0006f] font-bold text-sm uppercase tracking-wide transition-colors">
                Jobs
              </a>
              <a href="#" className="text-white hover:text-[#d0006f] font-bold text-sm uppercase tracking-wide transition-colors">
                Donate
              </a>
            </nav>

            {/* Apply Button */}
            <div className="hidden md:block">
              <button className="bg-[#d0006f] hover:bg-[#a0005a] text-white font-bold text-sm px-6 py-2 uppercase tracking-wide transition-colors border-2 border-[#d0006f] hover:border-[#a0005a]">
                Apply Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-[#d0006f] font-bold">
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[#d0006f] font-bold text-sm tracking-wider uppercase mb-3">WANNA LEARN MORE?</p>
            <h1 className="text-5xl md:text-7xl font-black text-[#00002c] tracking-tight uppercase mb-2">Our Startups</h1>
          </div>

        {/* Statistics Section */}
        <div className="mb-12 bg-white border-2 border-[#00002c] p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-black text-[#00002c] mb-2">{totalStartups}</p>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Startups</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#d0006f] mb-2">€{totalRaised}M</p>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Total Raised</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#00002c] mb-2">{totalEmployees}+</p>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Employees</p>
            </div>
          </div>
        </div>

        {/* Spotlight Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-[#00002c] mb-6 uppercase tracking-tight">Spotlight Startups</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlightStartups.map((company) => (
              <div key={company.id} className="bg-white border-2 border-[#d0006f] p-6 hover:border-[#00002c] transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <img
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <h3 className="text-xl font-black text-[#00002c] uppercase tracking-tight mb-2 text-center">{company.name}</h3>
                <p className="text-sm text-gray-700 mb-4 text-center">{company.summary}</p>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                  <span>Raised: <span className="text-[#d0006f]">{company.totalRaised}</span></span>
                  <span>Team: <span className="text-[#d0006f]">{company.employees}</span></span>
                </div>
                <a 
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-[#d0006f] hover:text-[#a0005a] font-bold text-sm mt-4 uppercase tracking-wide hover:underline"
                >
                  Visit Website →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-12 bg-[#00002c] p-8 border-2 border-[#00002c]">
          <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Batch Filter */}
            <div>
              <label htmlFor="batch-filter" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Batch
              </label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-full border-[#00002c] focus:ring-[#d0006f]">
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
              <label htmlFor="category-filter" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full border-[#00002c] focus:ring-[#d0006f]">
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
              <label htmlFor="year-filter" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Founded
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full border-[#00002c] focus:ring-[#d0006f]">
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
                className="w-full px-6 py-3 text-sm font-bold text-white bg-[#d0006f] hover:bg-[#a0005a] transition-colors uppercase tracking-wide border-2 border-[#d0006f] hover:border-[#a0005a]"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Company List */}
        <div className="space-y-6">
          {filteredCompanies.map((company) => {
            const isExpanded = expandedCards.has(company.id)
            return (
              <Card key={company.id} className="overflow-hidden transition-all duration-300 border-2 border-[#00002c] hover:border-[#d0006f]">
                <div className="md:flex">
                  {/* Logo Section - Always visible */}
                  <div className="md:flex-shrink-0 flex items-center justify-center p-8 md:w-64">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="w-full object-contain"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    <CardHeader className="pb-3 pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-3xl font-black text-[#00002c] tracking-tight uppercase mb-1">{company.name}</CardTitle>
                          <a 
                            href={`https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#d0006f] hover:text-[#a0005a] hover:underline font-semibold text-base"
                          >
                            {company.website}
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Founded {company.foundingYear}</span>
                        <span className="text-gray-400 font-bold">•</span>
                        <div className="flex flex-wrap gap-2">
                          {company.category.map((cat, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 text-xs font-bold bg-[#00002c] text-white uppercase tracking-wide"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-2 pb-5">
                      {/* Description with expand/collapse */}
                      <div className="mb-6">
                        <CardDescription className="text-base leading-relaxed text-gray-700">
                          {isExpanded ? company.description : company.summary}
                        </CardDescription>
                        <button 
                          className="text-[#d0006f] hover:text-[#a0005a] font-bold text-sm mt-2 uppercase tracking-wide"
                          onClick={() => toggleCard(company.id)}
                        >
                          {isExpanded ? '↑ Show Less' : '↓ Read More'}
                        </button>
                      </div>

                      {/* Founders Section - Always visible */}
                      {company.founders.length > 0 && (
                        <div>
                          <h3 className="text-sm font-black text-[#00002c] mb-4 uppercase tracking-wider">
                            CDTM {company.founders.length > 1 ? 'founders' : 'founder'}
                          </h3>
                          <div className="flex flex-wrap gap-5">
                            {company.founders.map((founder, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <img
                                  src={founder.imageUrl}
                                  alt={founder.name}
                                  className="w-14 h-14 object-cover border-2 border-gray-200"
                                />
                                <div>
                                  <p className="font-bold text-gray-900 text-base">{founder.name}</p>
                                  <p className="text-sm font-bold text-[#d0006f] uppercase tracking-wide">{founder.role}</p>
                                  <p className="text-sm text-gray-600 font-medium">{founder.batch}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No companies found matching the selected filters.</p>
          </div>
        )}
      </div>
    </main>
    </>
  )
}
