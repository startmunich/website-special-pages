"use client"

import { useState, useEffect } from "react"
import Script from "next/script"
import Image from "next/image"
import Hero from "@/components/Hero"

export const dynamic = 'force-dynamic'

interface NetworkLogo {
  id: string
  name: string
  category: string
  logoUrl: string
}

export default function MemberNetworkPage() {
  const [logos, setLogos] = useState<NetworkLogo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLogos() {
      try {
        const res = await fetch("/api/network-logos")
        if (!res.ok) throw new Error("Failed to fetch network logos")
        const data = await res.json()
        setLogos(data)
      } catch (err) {
        console.error("Error fetching network logos:", err)
        setError("Failed to load network logos")
      } finally {
        setLoading(false)
      }
    }
    fetchLogos()
  }, [])

  // Group logos by category
  const grouped = logos.reduce<Record<string, NetworkLogo[]>>((acc, logo) => {
    const cat = logo.category || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(logo)
    return acc
  }, {})

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

          {loading && (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-white">Loading member network...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-xl text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && Object.keys(grouped).length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No companies found.</p>
            </div>
          )}

          {Object.entries(grouped).map(([category, companies]) => (
            <div key={category} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
                {category}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#d0006f]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/10 flex items-center justify-center min-h-[140px]"
                  >
                    <div className="relative w-full h-20">
                      <Image
                        src={company.logoUrl}
                        alt={company.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
