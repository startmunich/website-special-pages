"use client"

import { useState, useEffect } from 'react'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

interface Partner {
  id: string
  name: string
  logo: string
  reason: string
  website?: string
}

interface PartnerCategory {
  id: string
  name: string
  description: string
  icon: string
  partners: Partner[]
}

const partnerCategories: PartnerCategory[] = [
  {
    id: "vc",
    name: "Venture Capital",
    description: "Leading VCs supporting our founders with funding and mentorship",
    icon: "💰",
    partners: [
      {
        id: "vc-1",
        name: "Sequoia Capital",
        logo: "https://logo.clearbit.com/sequoiacap.com",
        reason: "Mentorship program & investor networking events",
        website: "https://sequoiacap.com"
      },
      {
        id: "vc-2",
        name: "Andreessen Horowitz",
        logo: "https://logo.clearbit.com/a16z.com",
        reason: "Annual pitch competition sponsor",
        website: "https://a16z.com"
      },
      {
        id: "vc-3",
        name: "Accel",
        logo: "https://logo.clearbit.com/accel.com",
        reason: "Startup workshops & office hours",
        website: "https://accel.com"
      },
      {
        id: "vc-4",
        name: "Index Ventures",
        logo: "https://logo.clearbit.com/indexventures.com",
        reason: "European expansion guidance",
        website: "https://indexventures.com"
      },
      {
        id: "vc-5",
        name: "Cherry Ventures",
        logo: "https://logo.clearbit.com/cherry.vc",
        reason: "Early-stage founder support",
        website: "https://cherry.vc"
      },
      {
        id: "vc-6",
        name: "HV Capital",
        logo: "https://logo.clearbit.com/hvcapital.com",
        reason: "DACH region expertise & networking",
        website: "https://hvcapital.com"
      }
    ]
  },
  {
    id: "bigtech",
    name: "Big Tech",
    description: "Technology giants providing resources and opportunities",
    icon: "🏢",
    partners: [
      {
        id: "bt-1",
        name: "Google",
        logo: "https://logo.clearbit.com/google.com",
        reason: "Cloud credits & technical workshops",
        website: "https://google.com"
      },
      {
        id: "bt-2",
        name: "Microsoft",
        logo: "https://logo.clearbit.com/microsoft.com",
        reason: "Azure sponsorship & startup program",
        website: "https://microsoft.com"
      },
      {
        id: "bt-3",
        name: "Amazon Web Services",
        logo: "https://logo.clearbit.com/aws.amazon.com",
        reason: "AWS credits & infrastructure support",
        website: "https://aws.amazon.com"
      },
      {
        id: "bt-4",
        name: "SAP",
        logo: "https://logo.clearbit.com/sap.com",
        reason: "Enterprise software & B2B connections",
        website: "https://sap.com"
      },
      {
        id: "bt-5",
        name: "Nvidia",
        logo: "https://logo.clearbit.com/nvidia.com",
        reason: "AI/ML hardware access & GPU credits",
        website: "https://nvidia.com"
      }
    ]
  },
  {
    id: "education",
    name: "Education",
    description: "Academic institutions fostering entrepreneurial talent",
    icon: "🎓",
    partners: [
      {
        id: "edu-1",
        name: "TU Munich",
        logo: "https://logo.clearbit.com/tum.de",
        reason: "Primary university partner & talent pipeline",
        website: "https://tum.de"
      },
      {
        id: "edu-2",
        name: "LMU Munich",
        logo: "https://logo.clearbit.com/lmu.de",
        reason: "Research collaboration & student exchange",
        website: "https://lmu.de"
      },
      {
        id: "edu-3",
        name: "University of Cambridge",
        logo: "https://logo.clearbit.com/cam.ac.uk",
        reason: "Research partnership & thesis opportunities",
        website: "https://cam.ac.uk"
      },
      {
        id: "edu-4",
        name: "Stanford University",
        logo: "https://logo.clearbit.com/stanford.edu",
        reason: "Silicon Valley exchange program",
        website: "https://stanford.edu"
      },
      {
        id: "edu-5",
        name: "UnternehmerTUM",
        logo: "https://logo.clearbit.com/unternehmertum.de",
        reason: "Incubation space & acceleration programs",
        website: "https://unternehmertum.de"
      }
    ]
  },
  {
    id: "studentclubs",
    name: "Student Clubs",
    description: "Fellow student organizations sharing our entrepreneurial mission",
    icon: "🤝",
    partners: [
      {
        id: "sc-1",
        name: "TUM.ai",
        logo: "https://logo.clearbit.com/tum-ai.com",
        reason: "Joint AI hackathons & knowledge sharing",
        website: "https://tum-ai.com"
      },
      {
        id: "sc-2",
        name: "CDTM",
        logo: "https://logo.clearbit.com/cdtm.de",
        reason: "Cross-disciplinary innovation events",
        website: "https://cdtm.de"
      },
      {
        id: "sc-3",
        name: "180 Degrees Consulting",
        logo: "https://logo.clearbit.com/180dc.org",
        reason: "Social impact collaboration",
        website: "https://180dc.org"
      },
      {
        id: "sc-4",
        name: "TUM Blockchain Club",
        logo: "https://logo.clearbit.com/tum-blockchain.com",
        reason: "Web3 workshops & networking",
        website: "https://tum-blockchain.com"
      },
      {
        id: "sc-5",
        name: "Enactus Munich",
        logo: "https://logo.clearbit.com/enactus.org",
        reason: "Sustainable entrepreneurship initiatives",
        website: "https://enactus.org"
      }
    ]
  }
]

export default function PartnersPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-dark-blue py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-white">Loading partners...</p>
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

      <main className="min-h-screen bg-brand-dark-blue">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden h-[600px]">
          {/* Background Image + Overlay */}
          <div className="absolute inset-0 h-full">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="Our Partners"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 h-full bg-brand-dark-blue/70"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 h-full flex items-center">
            <div className="flex-1 max-w-3xl text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 animate-[flyInFromTop_0.6s_ease-out]">
                OUR
                <br />
                <span className="outline-text">PARTNERS</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Discover the companies that engage the START spirit and empower our entrepreneurial community
              </p>
            </div>
          </div>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
          
          {/* Why Partners Section */}
          <div className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                WHY <span className="outline-text">PARTNERSHIPS MATTER</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Building the future together with industry leaders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 p-8 hover:border-brand-pink/50 transition-all duration-300">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-white mb-3">Accelerate Growth</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our partners provide resources, mentorship, and funding opportunities that help START members transform ideas into successful ventures.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8 hover:border-brand-pink/50 transition-all duration-300">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-bold text-white mb-3">Expand Networks</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Through strategic partnerships, we connect our members with industry experts, investors, and fellow entrepreneurs across the globe.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8 hover:border-brand-pink/50 transition-all duration-300">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-white mb-3">Share Knowledge</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Partners bring invaluable expertise through workshops, talks, and hands-on sessions that shape the next generation of founders.
                </p>
              </div>
            </div>
          </div>

          {/* Partner Categories */}
          {partnerCategories.map((category) => (
            <div key={category.id} className="mb-20">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-3xl md:text-4xl font-black text-white">
                    {category.name.toUpperCase().split(' ')[0]}{' '}
                    <span className="outline-text">
                      {category.name.toUpperCase().split(' ').slice(1).join(' ') || category.name.toUpperCase()}
                    </span>
                  </h2>
                </div>
                <p className="text-gray-400 text-lg ml-14">
                  {category.description}
                </p>
              </div>

              {/* Partners Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group relative"
                  >
                    {/* Logo Card */}
                    <div className="relative bg-white rounded-lg p-6 h-32 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-brand-pink/20 group-hover:scale-105 border-2 border-transparent group-hover:border-brand-pink">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          // Fallback to initials if logo fails to load
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const fallback = document.createElement('div')
                            fallback.className = 'text-2xl font-bold text-gray-600'
                            fallback.textContent = partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)
                            parent.appendChild(fallback)
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Become a Partner CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a3e] via-brand-dark-blue to-[#0d0d1f] border-2 border-brand-pink/50 shadow-2xl shadow-brand-pink/20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-pink/5 rounded-full blur-3xl"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col items-center gap-8 text-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                    Become a Partner
                  </h3>
                  <p className="text-lg text-gray-300 max-w-2xl">
                    Join our network of leading companies supporting the next generation of entrepreneurs. 
                    Partner with START Munich and make an impact on the startup ecosystem.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="px-8 py-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/50">
                    Get in Touch
                  </button>
                  <button className="px-8 py-3 border border-brand-pink text-brand-pink hover:bg-brand-pink/10 font-bold rounded-lg transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
