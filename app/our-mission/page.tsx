"use client"

import { useState, useEffect } from 'react'
import { useInView } from '@/lib/hooks'
import Hero from '@/components/Hero'

const turningPhrases = [
  { from: "latest research", to: "innovation" },
  { from: "students", to: "founders" },
  { from: "bold ideas", to: "reality" },
  { from: "ambition", to: "impact" },
  { from: "passion", to: "startups" },
]

export default function OurMissionPage() {
  const [turningIdx, setTurningIdx] = useState(0)
  const missionView = useInView(0.15)

  useEffect(() => {
    const t = setInterval(() => setTurningIdx(p => (p + 1) % turningPhrases.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <main className="min-h-screen bg-brand-dark-blue text-white overflow-x-hidden">
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
        title={<>Our <span className="text-brand-pink">Mission</span></>}
        description="We empower the next generation of founders to dare, build, and belong."
      />

      {/* ═══════════════════════════ MISSION & VISION — SPLIT DESIGN ═══════════════════════════ */}
      <section className="relative overflow-hidden">
        <div ref={missionView.ref}>
          {/* Hero statement with turning phrases */}
          <div className="relative py-32 px-4 sm:px-6 lg:px-8">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-pink/5 rounded-full blur-[200px]" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto text-center">
              <div className={`transition-all duration-700 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Our Purpose</span>
              </div>

              {/* Large turning phrase */}
              <div className={`mt-10 transition-all duration-700 delay-200 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none flex items-baseline justify-center gap-x-3 whitespace-nowrap">
                  <span className="text-gray-600">TURNING</span>
                  <span className="relative inline-flex min-w-[200px] sm:min-w-[300px] lg:min-w-[400px] h-[1.1em] overflow-hidden">
                    {turningPhrases.map((phrase, i) => (
                      <span
                        key={phrase.from}
                        className={`absolute inset-0 flex items-end transition-all duration-700 ${
                          i === turningIdx ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                        }`}
                      >
                        <span className="text-brand-pink whitespace-nowrap">{phrase.from}</span>
                      </span>
                    ))}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none flex items-baseline justify-center gap-x-3 whitespace-nowrap mt-3">
                  <span className="text-gray-600">INTO</span>
                  <span className="relative inline-flex min-w-[180px] sm:min-w-[280px] lg:min-w-[360px] h-[1.1em] overflow-hidden">
                    {turningPhrases.map((phrase, i) => (
                      <span
                        key={phrase.to}
                        className={`absolute inset-0 flex items-end transition-all duration-700 ${
                          i === turningIdx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                        }`}
                      >
                        <span className="text-white whitespace-nowrap">{phrase.to}</span>
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Split cards - TUM Image, Mission & Vision */}
          <div className="relative">
            {/* TUM Image - Absolute Left */}
            <div className={`absolute left-0 top-0 bottom-0 hidden lg:block w-[280px] transition-all duration-700 delay-200 ${missionView.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative h-full overflow-hidden">
                <img
                  src="https://www.tum.de/fileadmin/_processed_/f/7/csm_1436302_39af3c4190.jpg"
                  alt="TU Munich"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-dark-blue" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue/60 via-transparent to-brand-dark-blue/40" />
              </div>
            </div>

            {/* Mission & Vision Container - Centered */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* MISSION */}
              <div className={`relative group transition-all duration-700 delay-300 ${missionView.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="relative min-h-[500px] lg:min-h-[600px] bg-gradient-to-br from-brand-pink/20 via-brand-pink/10 to-transparent p-10 sm:p-16 flex flex-col justify-between overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 border border-brand-pink/20 rounded-full" />
                  <div className="absolute top-1/2 right-10 w-px h-32 bg-gradient-to-b from-brand-pink/50 to-transparent" />

                  {/* Content */}
                  <div className="relative text-right">
                    <div className="flex items-center gap-4 mb-8 justify-end">
                      <span className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase">Mission</span>
                      <div className="w-12 h-12 rounded-xl bg-brand-pink/20 border border-brand-pink/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                      Empowering<br />
                      <span className="text-brand-pink">founders</span><br />
                      of tomorrow
                    </h3>
                  </div>

                  <div className="relative text-right">
                    <p className="text-gray-300 text-lg leading-relaxed max-w-md ml-auto">
                      We provide the education, network, and hands-on experience that transforms ambitious students into successful entrepreneurs.
                    </p>
                  </div>
                </div>
              </div>

              {/* VISION - Right side */}
              <div className={`relative group transition-all duration-700 delay-400 ${missionView.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="relative min-h-[500px] lg:min-h-[600px] bg-gradient-to-bl from-white/5 via-transparent to-transparent p-10 sm:p-16 flex flex-col justify-between overflow-hidden border-l border-white/5">
                  {/* Decorative elements */}
                  <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
                  <div className="absolute bottom-1/3 left-0 w-20 h-px bg-gradient-to-r from-brand-pink/50 to-transparent" />

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <span className="text-white/60 text-sm font-bold tracking-[0.2em] uppercase">Vision</span>
                    </div>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                      Munich as<br />
                      <span className="text-gray-500">Europe&apos;s</span><br />
                      startup hub
                    </h3>
                  </div>

                  <div className="relative">
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                      We envision a Munich where every ambitious idea has the chance to become reality — a thriving ecosystem that rivals Silicon Valley.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
