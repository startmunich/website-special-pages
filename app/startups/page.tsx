"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  companyLinkedin?: string
  investmentRound?: string
  milestones?: string
}

// Parse CSV data
const companies: Company[] = [
  {
    id: 1,
    name: "MOMENTO",
    website: "linkedin.com/company/momentovita",
    summary: "Italian Food - catering & (hopefully soon) store",
    description: "Italian Food - catering & (hopefully soon) store. Achieved profitability on day 1 with 5-figure revenue in first operative month.",
    logoUrl: "https://media.licdn.com/dms/image/v2/D4D0BAQHB2dnRyA57TQ/company-logo_200_200/B4DZf2P79uGgAQ-/0/1752183062836?e=1762387200&v=beta&t=cY2QnT6Uo6f-0lXDrA9aP0DRQ97YTEQwsGVLW60KAFM",
    foundingYear: 2024,
    category: ["Food & Beverage"],
    totalRaised: "€0",
    employees: 0,
    isSpotlight: true,
    milestones: "profitability on day 1, 5-figure revenue in first operative month",
    founders: [
      {
        name: "Filippo Heller",
        role: "Founder",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/1.jpg",
        linkedinUrl: "https://de.linkedin.com/in/filippo-heller-65211515b"
      }
    ]
  },
  {
    id: 2,
    name: "ELIVA",
    website: "eliva.ai",
    summary: "Product Consulting for E-Commerce Websites",
    description: "Eliva AI is an AI chatbot that provides customer service and product consultancy. It helps customers with personalized recommendations and support throughout their shopping experience. Currently at MVP stage.",
    logoUrl: "https://www.eliva.ai/assets/logo-white.png",
    foundingYear: 2025,
    category: ["SaaS", "AI", "Ecommerce"],
    totalRaised: "€0",
    employees: 0,
    isSpotlight: true,
    milestones: "MVP",
    founders: [
      {
        name: "Finn Kesper",
        role: "CEO",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/2.jpg",
        linkedinUrl: "https://de.linkedin.com/in/finnkesper"
      }
    ]
  },
  {
    id: 3,
    name: "Moon Home",
    website: "moon-home.de",
    summary: "Webshop (Kitchen Products)",
    description: "Moon Home is an online shop specializing in the sale of sustainable and fairly produced products for the kitchen and home. Shop launch planned for 1st March 2025.",
    logoUrl: "https://moon-home.de/cdn/shop/files/Moon-Logo.jpg?v=1727103048&width=180",
    foundingYear: 2024,
    category: ["E-Commerce", "Sustainability"],
    totalRaised: "€0",
    employees: 0,
    isSpotlight: true,
    milestones: "Shop Launch planned for 1st March 2025",
    founders: [
      {
        name: "Finn Kesper",
        role: "CEO",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/2.jpg",
        linkedinUrl: "https://de.linkedin.com/in/finnkesper"
      }
    ]
  },
  {
    id: 4,
    name: "Productlane",
    website: "productlane.com",
    summary: "Customer Support for modern companies",
    description: "Productlane is a B2B customer support and feedback system deeply integrated with Linear. It consolidates all customer communications (email, chat, Slack) into a single inbox, automatically links feedback to development tickets for prioritization, and provides a unified portal, knowledge base, and Changelog to enhance the customer experience. Almost profitable with very good growing MRR.",
    logoUrl: "https://www.insightplatforms.com/wp-content/uploads/2024/02/Productlane-Logo-Square-Insight-Platforms.png",
    foundingYear: 2023,
    category: ["SaaS", "Customer Support", "Product Management"],
    totalRaised: "€775,000",
    employees: 0,
    investmentRound: "Pre-Seed",
    milestones: "Almost profitable, very good growing MRR",
    founders: [
      {
        name: "Raphael Fleckenstein",
        role: "Founder",
        batch: "START Munich",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/3.jpg",
        linkedinUrl: "https://de.linkedin.com/in/raphaelfleckenstein"
      }
    ]
  },
  {
    id: 5,
    name: "OneTutor",
    website: "onetutor.ai",
    summary: "Intelligent Tutoring System for Universities",
    description: "OneTutor is an AI-powered educational platform that acts as a personalized tutor for university students and educators. It focuses on active learning, offering course-specific materials, interactive quizzes, and a 24/7 available AI chat for instant answers, all tailored to the content of a student's course. The service is often available for free to students and faculty through campus licenses with partner universities. Currently serving 2,500+ users.",
    logoUrl: "https://onetutor.ai/onetutor.svg",
    foundingYear: 2025,
    category: ["EdTech", "AI", "SaaS"],
    totalRaised: "€0",
    employees: 0,
    milestones: "2,5k users",
    founders: [
      {
        name: "Jann Winter",
        role: "Co-Founder, CRO",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/4.jpg",
        linkedinUrl: "https://www.linkedin.com/in/jannwinter/"
      }
    ]
  },
  {
    id: 6,
    name: "Datagon AI",
    website: "datagon.ai",
    summary: "Optimize industrial production processes",
    description: "Manex AI provides AI-powered 'Manufacturing Optimization Agents' (like Qualitatio) for the industrial sector. The solution steers production processes end-to-end, helping manufacturers predict defects, reduce testing, and lower warranty costs by providing deep, real-time insights into the entire production line.",
    logoUrl: "https://cdn.prod.website-files.com/67a23f0101102488e87e1340/6819df1622bdca6d479a1139_Logo%20White.png",
    foundingYear: 2023,
    category: ["AI", "SaaS", "Manufacturing"],
    totalRaised: "€500,000",
    employees: 0,
    investmentRound: "Pre-Seed",
    milestones: "First licenses",
    founders: [
      {
        name: "Fabian Gruber",
        role: "CPO, Co-Founder",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/5.jpg",
        linkedinUrl: "https://www.linkedin.com/in/fabian-gruber-333897153/"
      }
    ]
  },
  {
    id: 7,
    name: "wahl.chat",
    website: "wahl.chat",
    summary: "Making political information accessible",
    description: "wahl.chat is a political education and comparison tool that uses an interactive AI chatbot to help users understand politics. Users can select one or more political parties and ask the AI questions about their stances and programs. The service also includes a 'Wahl Swiper' to help users find a suitable party, effectively making political information interactive and accessible. 150,000 active users in just over a month with >1,000,000 page views.",
    logoUrl: "https://wahl.chat/images/logo.webp",
    foundingYear: 2025,
    category: ["Gov-Tech", "EdTech", "AI", "Civic Tech", "nonprofit"],
    totalRaised: "€0",
    employees: 0,
    milestones: "150,000 active Users in just over a month, >1,000,000 page views",
    founders: [
      {
        name: "Robin Frasch",
        role: "Co-Founder",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/6.jpg",
        linkedinUrl: "https://www.linkedin.com/in/robin-frasch/"
      }
    ]
  },
  {
    id: 8,
    name: "AR-Physics",
    website: "arphysics.de",
    summary: "AR-based physics education app",
    description: "AR-Physics is an EdTech startup that provides a mobile application to revolutionize science learning. The app uses Augmented Reality (AR) to visualize complex physics concepts and experiments in a user's real environment. It also offers interactive, gamified quizzes and an AI-powered system to generate custom learning content across various scientific disciplines. Winner of Startup Teens Westfalen Challenge 2024 and National Challenge 2024 (Education).",
    logoUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/83/18/a5/8318a5ce-883a-5b5f-0ffd-ed79e5e8fb88/AppIcon-0-0-1x_U007epad-0-1-0-85-220.jpeg/1200x600wa.png",
    foundingYear: 2024,
    category: ["EdTech", "SaaS", "Augmented Reality"],
    totalRaised: "€0",
    employees: 0,
    milestones: "Winner of Startup Teens Westfalen Challenge 2024, Winner of Startup Teens National Challenge 2024 (Education)",
    founders: [
      {
        name: "Jost Reelsen",
        role: "CEO, Co-Founder",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/7.jpg",
        linkedinUrl: "https://www.linkedin.com/in/jost-reelsen-615ba2297/"
      }
    ]
  },
  {
    id: 9,
    name: "Not Today Row",
    website: "nottodayrow.com",
    summary: "Non-Profit to row across the Atlantic",
    description: "Not Today Row is an expedition consisting of two friends, Janik and Danny, who rowed 3,000 miles across the Atlantic Ocean to raise awareness and money for children's education. They support two specific charities: Ozeankind e.V. (focused on plastic pollution education) and the Bali Children's Project (focused on education for children in need). Funded journey with 200k budget, crossed Atlantic in rowing boat, and raised 4K for charity.",
    logoUrl: "https://nottodayrow.com/wp-content/uploads/2021/07/2021_NotToday_Logo_black_Main.png",
    foundingYear: 2021,
    category: ["Charity", "nonprofit"],
    totalRaised: "€0",
    employees: 0,
    milestones: "Funded Journey with 200k budget, Crossed Atlantic in rowing boat, Raised 4K for charity",
    founders: [
      {
        name: "Janik Prottung",
        role: "Founder, CEO",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/8.jpg",
        linkedinUrl: "https://www.linkedin.com/in/janikprottung/"
      }
    ]
  },
  {
    id: 10,
    name: "floxform",
    website: "floxform.com",
    summary: "We enable Mass Customization in Additive Manufacturing",
    description: "floxform enables Mass Customization in Additive Manufacturing. Founded in 2020 with idea and proof of concept, built the software from 2021-2023, and started to get into the market in 2024.",
    logoUrl: "https://ui-avatars.com/api/?name=floxform&size=300&background=00002c&color=fff&bold=true&font-size=0.4",
    foundingYear: 2020,
    category: ["Manufacturing", "SaaS"],
    totalRaised: "€0",
    employees: 0,
    milestones: "2020 - idea and proof of concept, 2021-2023 - building the software, 2024 - started to get into the market",
    founders: [
      {
        name: "Philipp Hirte",
        role: "CEO, Founder",
        batch: "Placeholder",
        imageUrl: "https://raw.githubusercontent.com/startmunich/WebsiteOurStartups/main/FounderPics/9.jpg"
      }
    ]
  },
  {
    id: 11,
    name: "PUNKU.AI",
    website: "punku.ai",
    summary: "AI Agents for SMEs",
    description: "PUNKU.AI provides AI Agents for SMEs. Raised €225,000 in Pre-Seed funding.",
    logoUrl: "https://ui-avatars.com/api/?name=PUNKU.AI&size=300&background=00002c&color=fff&bold=true&font-size=0.4",
    foundingYear: 2023,
    category: ["AI", "SaaS"],
    totalRaised: "€225,000",
    employees: 0,
    investmentRound: "Pre-Seed",
    founders: [
      {
        name: "Daniel Quiroga",
        role: "Founder",
        batch: "Placeholder",
        imageUrl: "https://ui-avatars.com/api/?name=Daniel+Quiroga&size=80&background=0891b2&color=fff"
      }
    ]
  },
  {
    id: 12,
    name: "frischluft Fensterbrett",
    website: "frischluft-fensterbrett.com",
    summary: "Unique home furniture solution for room ventilation",
    description: "frischluft Fensterbrett sells a unique home furniture solution that helps you to ventilate your room. Achieved >100k€ Revenue, >4000 Customers, 100 Million Social Media Impressions with 100k Followers.",
    logoUrl: "https://ui-avatars.com/api/?name=frischluft&size=300&background=00002c&color=fff&bold=true&font-size=0.4",
    foundingYear: 2023,
    category: ["E-Commerce", "Home & Living"],
    totalRaised: "€0",
    employees: 0,
    milestones: ">100k€ Revenue, >4000 Customer, 100 Mio Social Media Impressions with 100k Followers",
    founders: [
      {
        name: "Benedikt Hartmann",
        role: "Co-Founder",
        batch: "Placeholder",
        imageUrl: "https://ui-avatars.com/api/?name=Benedikt+Hartmann&size=80&background=ec4899&color=fff"
      }
    ]
  },
  {
    id: 13,
    name: "TradeRepublic",
    website: "traderepublic.com",
    summary: "Leading European investment platform",
    description: "TradeRepublic is a leading European investment platform providing commission-free trading services.",
    logoUrl: "https://ui-avatars.com/api/?name=Trade+Republic&size=300&background=00002c&color=fff&bold=true&font-size=0.4",
    foundingYear: 2016,
    category: ["FinTech", "Investment"],
    totalRaised: "€0",
    employees: 0,
    companyLinkedin: "https://www.linkedin.com/company/trade-republic/",
    founders: [
      {
        name: "Thomas Pischke",
        role: "Co-Founder & CTO",
        batch: "Placeholder",
        imageUrl: "https://ui-avatars.com/api/?name=Thomas+Pischke&size=80&background=8b5cf6&color=fff"
      }
    ]
  }
]

export default function StartupsPage() {
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
      company.category.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()))
    
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
    const amount = parseInt(company.totalRaised?.replace(/[€,]/g, '') || '0')
    return sum + amount
  }, 0)
  const totalEmployees = companies.reduce((sum, company) => sum + (company.employees || 0), 0)

  // Get spotlight startups
  const spotlightStartups = companies.filter(company => company.isSpotlight).slice(0, 3)

  return (
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
                <p className="text-5xl font-black text-[#d0006f] mb-2">€{(totalRaised / 1000000).toFixed(1)}M+</p>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Total Raised</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[#00002c] mb-2">{totalEmployees || "N/A"}</p>
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
                    <span>Raised: <span className="text-[#d0006f]">{company.totalRaised || "N/A"}</span></span>
                    <span>Founded: <span className="text-[#d0006f]">{company.foundingYear}</span></span>
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
                    {/* Logo Section */}
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
                          {company.totalRaised && company.totalRaised !== "€0" && (
                            <>
                              <span className="text-gray-400 font-bold">•</span>
                              <span className="text-sm font-bold text-[#d0006f] uppercase tracking-wide">Raised {company.totalRaised}</span>
                            </>
                          )}
                          {company.investmentRound && (
                            <>
                              <span className="text-gray-400 font-bold">•</span>
                              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">{company.investmentRound}</span>
                            </>
                          )}
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
                          {company.description !== company.summary && (
                            <button 
                              className="text-[#d0006f] hover:text-[#a0005a] font-bold text-sm mt-2 uppercase tracking-wide"
                              onClick={() => toggleCard(company.id)}
                            >
                              {isExpanded ? '↑ Show Less' : '↓ Read More'}
                            </button>
                          )}
                        </div>

                        {/* Milestones - Only show when expanded */}
                        {isExpanded && company.milestones && (
                          <div className="mb-6">
                            <h3 className="text-sm font-black text-[#00002c] mb-2 uppercase tracking-wider">
                              Milestones
                            </h3>
                            <p className="text-sm text-gray-700">{company.milestones}</p>
                          </div>
                        )}

                        {/* Founders Section */}
                        {company.founders.length > 0 && (
                          <div>
                            <h3 className="text-sm font-black text-[#00002c] mb-4 uppercase tracking-wider">
                              {company.founders.length > 1 ? 'Founders' : 'Founder'}
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
                                    {founder.linkedinUrl && (
                                      <a 
                                        href={founder.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:underline"
                                      >
                                        LinkedIn →
                                      </a>
                                    )}
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
  )
}