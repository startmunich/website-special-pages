"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Founder {
  name: string
  role: string
  batch: string[]
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
  lastUpdated?: string
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

export default function StartupDetailsPage({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCompany = async () => {
      setLoading(true)
      const companies = await fetchCompanies()
      const foundCompany = companies.find(c => c.id.toString() === params.id)
      
      if (!foundCompany) {
        notFound()
        return
      }
      
      setCompany(foundCompany)
      setLoading(false)
    }
    loadCompany()
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-white">Loading startup details...</p>
        </div>
      </main>
    )
  }

  if (!company) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-[#00002c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Details */}
        <div className="bg-[#00002c] border border-white/20 rounded-2xl max-w-4xl mx-auto relative">
          {/* Close Button */}
          <button
            onClick={() => window.close()}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            {/* Header with Logo */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-shrink-0 bg-white rounded-lg p-6 w-full md:w-48 h-48 flex items-center justify-center border-2 border-white/20 hover:border-[#d0006f] transition-all">
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-white mb-3 h1-small">{company.name}</h1>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#d0006f]/20 text-[#d0006f] border border-[#d0006f]/40 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 mb-4">

                  {company.lastUpdated && (
                    <>
                      <span>Infromation Updated {new Date(company.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </>
                  )}
                </div>
              {/* Links */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#d0006f] hover:text-pink-400 font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                  {company.companyLinkedin && (
                    <a
                      href={company.companyLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#d0006f] hover:text-pink-400 font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Visit LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">About</h2>
              <p className="text-gray-300 leading-relaxed">{company.description}</p>
            </div>

                        {/* Supporting Programs */}
            {company.supportingPrograms && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4">Programs</h2>
                <div className="flex flex-wrap gap-2">
                  {company.supportingPrograms.split(',').filter(p => p.trim()).map((program, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-sm bg-white/5 text-gray-300 rounded-lg"
                    >
                      {program.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Company Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">Company Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Founded</p>
                  <p className="text-base font-semibold text-white">{company.foundingYear}</p>
                </div>
                {company.totalRaised && company.totalRaised !== "€0" && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Funding</p>
                    <p className="text-base font-semibold text-white">{company.totalRaised}</p>
                  </div>
                )}
                {company.investmentRound && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Stage</p>
                    <p className="text-base font-semibold text-white">{company.investmentRound}</p>
                  </div>
                )}
              </div>
            </div>


            {/* Founders */}
            {company.founders.length > 0 && (
              <div className="mb-1 pb-1">
                <h2 className="text-lg font-semibold text-white mb-4">
                  {company.founders.length > 1 ? 'Founders' : 'Founder'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {company.founders.map((founder, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                      {founder.linkedinUrl ? (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0"
                        >
                          <img
                            src={founder.imageUrl}
                            alt={founder.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20 hover:border-[#d0006f] transition-all"
                          />
                        </a>
                      ) : (
                        <img
                          src={founder.imageUrl}
                          alt={founder.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-white mb-1">
                          {founder.name}
                          {founder.batch && (
                            <span className="ml-2 font-normal text-gray-500">
                              (Batch: {founder.batch})
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-400 mb-1">{founder.role}</p>
                      </div>
                      {founder.linkedinUrl && (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#d0006f] hover:text-pink-400 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Footer Links */}
            {/* <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d0006f] to-pink-600 hover:from-[#d0006f] hover:to-[#d0006f] text-white font-semibold rounded-xl transition-all hover:scale-105"
              >
                Visit Website
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              {company.companyLinkedin && (
                <a
                  href={company.companyLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </main>
  )
}