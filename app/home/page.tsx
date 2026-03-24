"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useAnimatedNumber, useInView } from '@/lib/hooks'

export const dynamic = 'force-dynamic'

// ── Images ──────────────────────────────────────────────────────────────────────

const heroImages = [
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
]

const startupLogos = [
  { name: "Celonis", logo: "https://cdn.brandfetch.io/celonis.com/w/512/h/512/logo" },
  { name: "Personio", logo: "https://cdn.brandfetch.io/personio.de/w/512/h/512/logo" },
  { name: "Helsing", logo: "https://cdn.brandfetch.io/helsing.ai/w/512/h/512/logo" },
  { name: "Isar Aerospace", logo: "https://cdn.brandfetch.io/isaraerospace.com/w/512/h/512/logo" },
  { name: "Lilium", logo: "https://cdn.brandfetch.io/lilium.com/w/512/h/512/logo" },
  { name: "FlixBus", logo: "https://cdn.brandfetch.io/flixbus.com/w/512/h/512/logo" },
  { name: "Konux", logo: "https://cdn.brandfetch.io/konux.com/w/512/h/512/logo" },
  { name: "Tado", logo: "https://cdn.brandfetch.io/tado.com/w/512/h/512/logo" },
]

// ── Data ────────────────────────────────────────────────────────────────────────

const facts = [
  { label: "Members", value: 300, suffix: "+" },
  { label: "Diversity (MINT)", value: 65, suffix: "%" },
  { label: "Capital Raised", value: 500, suffix: "M+", prefix: "€" },
  { label: "Members in YC & other top programs", value: 25, suffix: "+" },
]

/*
const specialReasons = [
  {
    icon: "🎓",
    title: "Biggest Entrepreneurship Initiative",
    description: "The largest student-run entrepreneurship initiative at TU Munich — connecting academia with the startup world.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: "🌍",
    title: "Global Network",
    description: "Strong ties to Silicon Valley, London, Berlin, and top accelerators like Y Combinator and EWOR.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: "🤝",
    title: "Gemeinnützig — Non-Profit",
    description: "We are a registered non-profit (gemeinnützig), driven purely by impact and the mission to foster entrepreneurship in Munich.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: "⚡",
    title: "Action-Oriented Builders",
    description: "Our members don't just talk about startups — they build them. Over 120 founders have emerged from our community.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: "🏙️",
    title: "Impact on Munich",
    description: "We shape Munich's innovation ecosystem — from organizing flagship events to producing the next generation of founders.",
    image: "https://images.unsplash.com/photo-1577462800662-7511e228c0e6?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: "🔬",
    title: "Unternehmertum & Innovation",
    description: "We bridge the gap between technical excellence at TUM and the entrepreneurial skills needed to bring ideas to life.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
  },
]
*/

// ── Component ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [turningIdx, setTurningIdx] = useState(0)
  const factsView = useInView(0.25)
  const missionView = useInView(0.15)
  // const specialView = useInView(0.1)

  const turningPhrases = [
    { from: "latest research", to: "innovation" },
    { from: "students", to: "founders" },
    { from: "bold ideas", to: "reality" },
    { from: "ambition", to: "impact" },
    { from: "passion", to: "startups" },
  ]

  useEffect(() => { setLoaded(true) }, [])

  // Hero image crossfade
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % heroImages.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Turning phrases rotation
  useEffect(() => {
    const t = setInterval(() => setTurningIdx(p => (p + 1) % turningPhrases.length), 2500)
    return () => clearInterval(t)
  }, [turningPhrases.length])

  const animatedValues = [
    useAnimatedNumber(facts[0].value, !factsView.visible, 1800),
    useAnimatedNumber(facts[1].value, !factsView.visible, 1800),
    useAnimatedNumber(facts[2].value, !factsView.visible, 1800),
    useAnimatedNumber(facts[3].value, !factsView.visible, 1800),
  ]

  return (
    <>
      <Script id="iframe-height-sender" strategy="afterInteractive">
        {`
          function sendHeight() {
            const h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            parent.postMessage({ type: "EMBED_HEIGHT", height: h }, "*");
          }
          window.addEventListener("load", sendHeight);
          const ro = new ResizeObserver(sendHeight);
          ro.observe(document.documentElement);
          document.addEventListener("DOMContentLoaded", sendHeight);
        `}
      </Script>

      <main className="min-h-screen bg-brand-dark-blue text-white overflow-x-hidden">

        {/* ═══════════════════════════ HERO — FULLSCREEN CROSSFADE ═══════════════════════════ */}
        <section className="relative w-full overflow-hidden h-screen flex items-center">
          {/* Crossfading backgrounds */}
          {heroImages.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
              style={{ opacity: heroIdx === i ? 1 : 0 }}
            >
              <img src={src} alt="" className="w-full h-full object-cover scale-[1.05]" />
            </div>
          ))}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-blue/90 via-brand-dark-blue/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-transparent to-transparent" />

          {/* Animated decorative blobs */}
          <div className="absolute top-20 right-[15%] w-[500px] h-[500px] bg-brand-pink/15 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-brand-pink/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute top-[40%] right-[5%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-blob animation-delay-4000" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12">
            {/* Left – Text */}
            <div className="flex-1 max-w-2xl">
              <div className={`inline-flex items-center gap-2 bg-brand-pink/20 backdrop-blur-sm border border-brand-pink/40 text-brand-pink px-5 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                🎓 Biggest Entrepreneurship Initiative at TUM
              </div>

              <h1 className={`text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-8 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="text-white drop-shadow-lg">DARE.</span><br />
                <span className="text-brand-pink drop-shadow-lg">BUILD.</span><br />
                <span className="outline-text drop-shadow-lg">BELONG.</span>
              </h1>

              <p className={`text-lg sm:text-xl text-gray-200 max-w-lg mb-10 leading-relaxed transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                START Munich is the largest student-run entrepreneurship community at TU Munich.
                We empower the next generation of founders to dare, build, and belong.
              </p>

              <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-[600ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link href="/member-journey" className="group relative px-10 py-4 bg-brand-pink text-white font-bold rounded-xl text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(208,0,111,0.4)]">
                  <span className="relative z-10">Join Us</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link href="/for-partners" className="px-10 py-4 border-2 border-white/30 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all text-lg">
                  Become a Partner
                </Link>
              </div>
            </div>

            {/* Right – Floating photo collage (desktop only) */}
            <div className={`hidden lg:block flex-1 relative h-[500px] w-full transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="absolute top-0 right-0 w-72 h-52 rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-2 border-white/10">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-32 right-48 w-64 h-48 rounded-2xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 border-2 border-white/10">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop" alt="Workshop" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-12 w-60 h-44 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-2 border-brand-pink/30">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop" alt="Pitch Night" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-pink/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </section>

        {/* ═══════════════════════════ BACKED BY BRANDS ═══════════════════════════ */}
        <section className="py-16 border-b border-white/5 overflow-hidden">
          <p className="text-center text-gray-500 text-sm tracking-[0.2em] uppercase mb-10">Backed by brands like:</p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-dark-blue to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-dark-blue to-transparent z-10" />
            <div className="animate-scroll opacity-60">
              {[...Array(2)].flatMap(() => [
                { name: "HV Capital", logo: "https://cdn.brandfetch.io/hv.capital/w/512/h/512/logo" },
                { name: "Redalpine", logo: "https://cdn.brandfetch.io/redalpine.com/w/512/h/512/logo" },
                { name: "Cherry Ventures", logo: "https://cdn.brandfetch.io/cherry.vc/w/512/h/512/logo" },
                { name: "Merantix", logo: "https://cdn.brandfetch.io/merantix.com/w/512/h/512/logo" },
                { name: "Founderful", logo: "https://cdn.brandfetch.io/founderful.com/w/512/h/512/logo" },
                { name: "Northzone", logo: "https://cdn.brandfetch.io/northzone.com/w/512/h/512/logo" },
              ]).map((brand, i) => (
                <div key={`${brand.name}-${i}`} className="inline-flex items-center justify-center mx-12 h-12">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 sm:h-10 object-contain brightness-0 invert"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = `<span class="text-white/70 font-bold text-base sm:text-lg tracking-tight">${brand.name}</span>`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ MISSION — BENTO GRID ═══════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8">
          <div ref={missionView.ref} className="max-w-7xl mx-auto">
            <div className={`text-center mb-20 transition-all duration-700 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Who we are</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-4">MISSION &amp; VISION</h2>
              <div className="w-20 h-1 bg-brand-pink mx-auto" />
            </div>

            {/* Turning phrase animation */}
            <div className="flex flex-col items-center mb-16">
              <span className="text-gray-500 text-3xl sm:text-4xl lg:text-5xl font-black mb-2">Turning</span>
              <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl lg:text-5xl font-black">
                <div className="relative h-[1.2em] overflow-hidden min-w-[200px] sm:min-w-[280px] text-right">
                  {turningPhrases.map((phrase, i) => (
                    <div
                      key={phrase.from}
                      className={`absolute inset-0 flex items-center justify-end transition-all duration-500 ${
                        i === turningIdx ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                      }`}
                    >
                      <span className="text-brand-pink">{phrase.from}</span>
                    </div>
                  ))}
                </div>
                <span className="text-gray-500">into</span>
                <div className="relative h-[1.2em] overflow-hidden min-w-[180px] sm:min-w-[240px] text-left">
                  {turningPhrases.map((phrase, i) => (
                    <div
                      key={phrase.to}
                      className={`absolute inset-0 flex items-center justify-start transition-all duration-500 ${
                        i === turningIdx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                      }`}
                    >
                      <span className="text-white">{phrase.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento grid with images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Large card — Gemeinnützig */}
              <div className={`lg:col-span-2 relative overflow-hidden rounded-3xl group min-h-[320px] transition-all duration-700 delay-100 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop" alt="Community" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/60 to-transparent" />
                <div className="relative p-10 flex flex-col justify-end h-full">
                  <div className="w-14 h-14 bg-brand-pink/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-4">🤲</div>
                  <h3 className="text-3xl font-black text-white mb-3">Gemeinnützig</h3>
                  <p className="text-gray-200 leading-relaxed max-w-lg text-lg">
                    As a registered non-profit, everything we do is driven by impact — empowering students to become the entrepreneurs of tomorrow.
                  </p>
                </div>
              </div>

              {/* Tall card — Impact on Munich */}
              <div className={`relative overflow-hidden rounded-3xl group min-h-[320px] transition-all duration-700 delay-200 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop" alt="Munich" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/70 to-transparent" />
                <div className="relative p-8 flex flex-col justify-end h-full">
                  <div className="w-14 h-14 bg-brand-pink/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-4">🏙️</div>
                  <h3 className="text-2xl font-black text-white mb-3">Impact on Munich</h3>
                  <p className="text-gray-200 leading-relaxed">
                    We shape Munich's startup ecosystem by connecting students, founders, investors, and industry leaders.
                  </p>
                </div>
              </div>

              {/* Wide card — Unternehmertum */}
              <div className={`lg:col-span-3 relative overflow-hidden rounded-3xl group min-h-[260px] transition-all duration-700 delay-300 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop" alt="Innovation" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-blue via-brand-dark-blue/70 to-transparent" />
                <div className="relative p-10 flex flex-col justify-center h-full max-w-2xl">
                  <div className="w-14 h-14 bg-brand-pink/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-4">💡</div>
                  <h3 className="text-3xl font-black text-white mb-3">Unternehmertum &amp; Innovation</h3>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    We bridge the gap between TUM's technical excellence and the entrepreneurial skills needed to turn ideas into companies that change the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ FACTS & STARTUPS ═══════════════════════════ */}
        <section ref={factsView.ref} className="relative py-28 px-4 sm:px-6 lg:px-8">
          {/* Background image */}
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark-blue/90" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Facts row */}
            <div className={`flex flex-wrap justify-center gap-8 sm:gap-16 lg:gap-24 mb-20 transition-all duration-700 ${factsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {facts.map((fact, i) => (
                <div
                  key={fact.label}
                  className="text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-1 tabular-nums whitespace-nowrap">
                    {(fact as any).prefix}{Math.round(animatedValues[i])}<span className="text-brand-pink">{fact.suffix}</span>
                  </div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{fact.label}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-pink/50" />
              <span className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase">Our Startups</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-pink/50" />
            </div>

            {/* Startup logos */}
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-dark-blue/90 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-dark-blue/90 to-transparent z-10" />
              <div className="animate-scroll">
                {[...startupLogos, ...startupLogos].map((startup, i) => (
                  <div key={`${startup.name}-${i}`} className="inline-flex items-center justify-center mx-6 flex-shrink-0">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 w-36 h-20 flex items-center justify-center hover:bg-white/20 hover:border-white/20 transition-all duration-300">
                      <img
                        src={startup.logo}
                        alt={startup.name}
                        className="max-h-10 max-w-[100px] object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.parentElement!.innerHTML = `<span class="text-sm text-white/80 font-bold text-center">${startup.name}</span>`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10">
              <Link href="/startups" className="group inline-flex items-center gap-2 text-white/70 hover:text-brand-pink font-medium transition-colors">
                View all startups <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ LATEST NEWS ═══════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Stay Updated</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3">LATEST NEWS</h2>
            </div>

            {/* LinkedIn Embeds */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-brand-pink/30 transition-colors">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7100000000000000001"
                  height="400"
                  width="100%"
                  allowFullScreen
                  title="LinkedIn Post 1"
                  className="rounded-xl border-0"
                />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-brand-pink/30 transition-colors">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7100000000000000002"
                  height="400"
                  width="100%"
                  allowFullScreen
                  title="LinkedIn Post 2"
                  className="rounded-xl border-0"
                />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-brand-pink/30 transition-colors">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7100000000000000003"
                  height="400"
                  width="100%"
                  allowFullScreen
                  title="LinkedIn Post 3"
                  className="rounded-xl border-0"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14">
              <span className="text-gray-500 text-sm uppercase tracking-wider">Follow us:</span>
              <div className="flex items-center gap-4">
                <Link href="https://www.linkedin.com/company/start-munich/" target="_blank" className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:border-brand-pink/50 hover:bg-brand-pink/10 transition-all">
                  <svg className="w-5 h-5 text-white group-hover:text-brand-pink transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-white text-sm font-medium group-hover:text-brand-pink transition-colors">LinkedIn</span>
                </Link>
                <Link href="https://www.instagram.com/start.munich/" target="_blank" className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:border-brand-pink/50 hover:bg-brand-pink/10 transition-all">
                  <svg className="w-5 h-5 text-white group-hover:text-brand-pink transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <span className="text-white text-sm font-medium group-hover:text-brand-pink transition-colors">Instagram</span>
                </Link>
                <Link href="https://twitter.com/start_munich" target="_blank" className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:border-brand-pink/50 hover:bg-brand-pink/10 transition-all">
                  <svg className="w-5 h-5 text-white group-hover:text-brand-pink transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="text-white text-sm font-medium group-hover:text-brand-pink transition-colors">X</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ WHAT MAKES START SPECIAL — IMAGE-BACKED CARDS ═══════════════════════════ */}
        {/*
        <section className="py-28 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-blue via-[#060620] to-brand-dark-blue" />

          <div ref={specialView.ref} className="relative max-w-7xl mx-auto">
            <div className={`mb-20 transition-all duration-700 ${specialView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Our Difference</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3">WHAT MAKES START SPECIAL</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialReasons.map((reason, i) => (
                <div
                  key={reason.title}
                  className={`group relative overflow-hidden rounded-3xl min-h-[280px] transition-all duration-700 ${specialView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${150 + i * 100}ms` }}
                >
                  <img src={reason.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/70 to-brand-dark-blue/40" />

                  <div className="relative p-8 flex flex-col justify-end h-full">
                    <div className="w-12 h-12 bg-brand-pink/30 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                      {reason.icon}
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{reason.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* ═══════════════════════════ START NETWORK ═══════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="mb-16">
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Worldwide Connected</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3">START NETWORK</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Text & Stats */}
              <div className="relative">
                <p className="text-gray-300 text-lg leading-relaxed mb-16 max-w-md">
                  We're a part of the sprawling START Network. This interconnection multiplies our potential across the world, allowing us to draw inspiration from diverse cultures, share insights, and create an ecosystem that nurtures collective progress.
                </p>

                {/* Globe illustration */}
                <div className="absolute -bottom-10 -left-10 w-72 h-72 opacity-15">
                  <svg viewBox="0 0 200 200" className="w-full h-full text-white">
                    {/* Outer circle */}
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    {/* Horizontal lines */}
                    <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="currentColor" strokeWidth="1" />
                    <ellipse cx="100" cy="100" rx="80" ry="55" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.75" />
                    {/* Vertical lines */}
                    <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="1" />
                    <ellipse cx="100" cy="100" rx="55" ry="80" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </div>

                {/* Stats */}
                <div className="flex gap-16 relative z-10">
                  <div>
                    <div className="text-6xl font-black text-white">16</div>
                    <div className="text-gray-400 text-sm">Cities</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-white">11</div>
                    <div className="text-gray-400 text-sm">Countries</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-white">+500</div>
                    <div className="text-gray-400 text-sm">Members</div>
                  </div>
                </div>
              </div>

              {/* Right side - City names rolling */}
              <div className="relative h-[400px] overflow-hidden">
                <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase absolute top-0 right-0 z-10">Global Community</span>

                {/* Fade overlays */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-brand-dark-blue to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand-dark-blue to-transparent z-10" />

                <div className="mt-12 text-right animate-scroll-vertical">
                  {['BARCELONA', 'LISBON', 'MAASTRICHT', 'NUREMBERG', 'LAUSANNE', 'MUNICH', 'STOCKHOLM', 'VIENNA', 'BARCELONA', 'LISBON', 'MAASTRICHT', 'NUREMBERG', 'LAUSANNE', 'MUNICH', 'STOCKHOLM', 'VIENNA'].map((city, i) => (
                    <div
                      key={`${city}-${i}`}
                      className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.2] ${
                        i % 5 === 0 ? 'bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent' :
                        i % 5 === 1 ? 'bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text text-transparent' :
                        i % 5 === 2 ? 'text-white' :
                        i % 5 === 3 ? 'text-brand-pink' :
                        'bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent'
                      }`}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ ABOUT START ═══════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Content */}
              <div>
                <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">About START Munich</span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4 mb-8 leading-tight">
                  Driven by passion. <span className="text-brand-pink">Built by students.</span>
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  START Munich is the largest student-run entrepreneurship initiative at TU Munich, empowering the next generation of founders through education, networking, and hands-on experience.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8">
                  We believe in the power of student-driven innovation and provide a platform where bold ideas can become reality.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {['Education', 'Community', 'Hands-on experience'].map((tag) => (
                    <span key={tag} className="px-5 py-2 border border-brand-pink/30 rounded-full text-white text-sm hover:bg-brand-pink/10 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats bar */}
                <div className="flex items-center gap-8 p-6 bg-white/5 border border-white/10 rounded-2xl mb-10">
                  <div className="text-center">
                    <div className="text-3xl font-black text-brand-pink">2015</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Founded in</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-black text-brand-pink">300+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Members</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Empowered by</div>
                    <div className="text-sm font-bold text-white">TUM Students</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-6">
                  <Link href="/member-journey" className="group relative px-8 py-3 bg-brand-pink text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(208,0,111,0.4)]">
                    <span className="relative z-10">Join the Team</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Link>
                  <Link href="/about" className="group inline-flex items-center gap-2 text-brand-pink hover:text-white font-bold transition-colors">
                    Read our vision <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden border-2 border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
                    alt="START Munich Event"
                    className="w-full h-[500px] lg:h-[600px] object-cover"
                  />
                </div>
                {/* Decorative blob */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-pink/20 rounded-full blur-[60px]" />
              </div>
            </div>
          </div>
        </section>

      </main>

      <style jsx global>{`
        .tabular-nums { font-variant-numeric: tabular-nums; }
      `}</style>
    </>
  )
}
