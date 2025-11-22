"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Company {
  id: number
  name: string
  website: string
  summary: string
  logoUrl: string
  foundingYear: number | string
  category: string[]
}

export default function EditStartupsPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await fetch('/api/startups')
        if (!response.ok) throw new Error('Failed to fetch startups')
        const data = await response.json()
        setCompanies(data)
      } catch (error) {
        console.error('Error fetching startups:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCompanies()
  }, [])

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-white">Loading startups...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Edit Startups</h1>
          <p className="text-gray-400">Select a startup to edit</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
          />
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Link
              key={company.id}
              href={`/admin/edit-startup/${company.id}`}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f]/50 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer block"
            >
              {/* Logo Section */}
              <div className="flex items-center justify-center bg-white p-6 h-32">
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content Section */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{company.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{company.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Founded {company.foundingYear}</span>
                  <span className="text-[#d0006f] group-hover:text-[#d0006f]/80 font-medium">
                    Edit →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-12 bg-white/5 border border-white/20 rounded-lg">
              <p className="text-xl font-semibold text-white mb-2">No Startups Found</p>
              <p className="text-gray-400 text-sm">Try adjusting your search</p>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
