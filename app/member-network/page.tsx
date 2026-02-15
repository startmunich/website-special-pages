"use client"

import { useState, useEffect } from "react"
import Script from "next/script"
import Hero from "@/components/Hero"

export const dynamic = 'force-dynamic'

interface Company {
  name: string
  logo?: string
}

const vcCompanies: Company[] = [
  { name: "Sequoia Capital" },
  { name: "Andreessen Horowitz" },
  { name: "Y Combinator" },
  { name: "Accel" },
  { name: "Index Ventures" },
  { name: "Lightspeed Venture" },
  { name: "Balderton Capital" },
  { name: "Cherry Ventures" },
]

const consultingCompanies: Company[] = [
  { name: "McKinsey & Company" },
  { name: "Boston Consulting Group" },
  { name: "Bain & Company" },
  { name: "Deloitte" },
  { name: "PwC" },
  { name: "EY" },
  { name: "KPMG" },
  { name: "Accenture" },
]

const techCompanies: Company[] = [
  { name: "Google" },
  { name: "Meta" },
  { name: "Amazon" },
  { name: "Microsoft" },
  { name: "Apple" },
  { name: "Netflix" },
  { name: "Tesla" },
  { name: "Spotify" },
  { name: "Uber" },
  { name: "Airbnb" },
]

export default function MemberNetworkPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

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
        {/* Hero Section */}
        <Hero
          backgroundImage="/hero-image.jpg"
          title={
            <>
              MEMBER
              <br />
              <span className="outline-text">NETWORK</span>
            </>
          }
          description="Discover where our talented members are making their mark across the industry"
        />

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">

          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Where Our <span className="text-[#d0006f]">Members</span> Work
            </h2>
            <p className="text-gray-400 text-lg">
              Explore the companies and organizations where our community members are building their careers.
            </p>
          </div>

          {/* Venture Capital Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              Venture Capital
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {vcCompanies.map((company, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#d0006f]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/10 flex items-center justify-center min-h-[140px]"
                >
                  <h3 className="text-white font-bold text-center text-lg">
                    {company.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Consulting Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              Consulting
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {consultingCompanies.map((company, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#d0006f]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/10 flex items-center justify-center min-h-[140px]"
                >
                  <h3 className="text-white font-bold text-center text-lg">
                    {company.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          {/* Tech Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              Tech
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {techCompanies.map((company, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#d0006f]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/10 flex items-center justify-center min-h-[140px]"
                >
                  <h3 className="text-white font-bold text-center text-lg">
                    {company.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
