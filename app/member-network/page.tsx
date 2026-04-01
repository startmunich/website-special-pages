"use client"

import { useState, useEffect } from "react"
import Script from "next/script"
import Hero from "@/components/Hero"

export const dynamic = 'force-dynamic'

interface Company {
  id: string
  name: string
  type: string
  logoUrl: string
}

async function fetchCompanies(): Promise<Company[]> {
  try {
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/member-network`, { cache: 'no-store' })
    if (!response.ok) throw new Error('Failed to fetch')
    return await response.json()
  } catch (error) {
    console.error('Error fetching member network:', error)
    return []
  }
}

function LogoCard({ company }: { company: Company }) {
  const [imgFailed, setImgFailed] = useState(false)
  const initials = company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="bg-white rounded-xl p-5 border border-white/10 hover:border-[#d0006f]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/10 flex items-center justify-center min-h-[100px]">
      {company.logoUrl && !imgFailed ? (
        <img
          src={company.logoUrl}
          alt={company.name}
          className="max-w-full max-h-14 object-contain"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <h3 className="text-gray-700 font-bold text-center text-lg">{company.name}</h3>
      )}
    </div>
  )
}

export default function MemberNetworkPage() {
  const [loading, setLoading] = useState(true)
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    fetchCompanies().then((data) => {
      setCompanies(data)
      setLoading(false)
    })
  }, [])

  // Group by Type
  const categories = Array.from(new Set(companies.map(c => c.type)))
    .sort((a, b) => companies.filter(c => c.type === b).length - companies.filter(c => c.type === a).length)

  if (loading) {
    return (
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-white">Loading member network...</p>
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

      <main className="min-h-screen bg-[#00002c]">
        <Hero
          backgroundImage="/memberNetwork/hero.png"
          title={
            <>
              MEMBER
              <br />
              <span className="outline-text">NETWORK</span>
            </>
          }
          description="Discover where our talented members are making their mark across the industry"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">

          <div className="mb-16 w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a3e] via-[#00002c] to-[#0d0d1f] border-2 border-[#d0006f]/50 shadow-2xl shadow-[#d0006f]/20 p-8 md:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d0006f]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d0006f]/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                Where Our Members Work
              </h2>
              <p className="text-gray-400">
                Our community spans some of the world's leading companies, research institutions, and startups. From global tech giants to early-stage ventures, START Munich members are building careers that make an impact.
              </p>
            </div>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-16">
              <h2 className="text-xl md:text-2xl font-black text-white mb-6">
                {category}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {companies
                  .filter(c => c.type === category)
                  .map((company) => (
                    <LogoCard key={company.id} company={company} />
                  ))}
              </div>
            </div>
          ))}

        </div>
      </main>
    </>
  )
}