"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

// ── Images ──────────────────────────────────────────────────────────────────────

const heroImages = [
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
]

const communityPhotos = [
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", alt: "Team Collaboration" },
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop", alt: "Workshop" },
  { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop", alt: "Pitch Night" },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop", alt: "Conference" },
  { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop", alt: "Community Dinner" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop", alt: "Networking Event" },
]

// ── Data ────────────────────────────────────────────────────────────────────────

const facts = [
  { label: "Members", value: 300, suffix: "+", icon: "👥" },
  { label: "Diversity (MINT)", value: 65, suffix: "%", icon: "🌈" },
  { label: "Founders", value: 120, suffix: "+", icon: "🚀" },
  { label: "Capital Raised", value: 500, suffix: "M€+", icon: "💰" },
  { label: "Members in YC & other top programs", value: 25, suffix: "+", icon: "🏆" },
]

const partnerLogos = [
  { name: "UnternehmerTUM", logo: "https://logo.clearbit.com/unternehmertum.de" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "SAP", logo: "https://logo.clearbit.com/sap.com" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Amazon Web Services", logo: "https://logo.clearbit.com/aws.amazon.com" },
  { name: "TU Munich", logo: "https://logo.clearbit.com/tum.de" },
  { name: "Sequoia Capital", logo: "https://logo.clearbit.com/sequoiacap.com" },
  { name: "Nvidia", logo: "https://logo.clearbit.com/nvidia.com" },
  { name: "Accel", logo: "https://logo.clearbit.com/accel.com" },
  { name: "Andreessen Horowitz", logo: "https://logo.clearbit.com/a16z.com" },
]

const notableStartups = [
  {
    name: "Celonis",
    description: "Process mining leader now valued at $13B, co-founded by START alumni.",
    logo: "https://logo.clearbit.com/celonis.com",
    tag: "Unicorn",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Personio",
    description: "Europe's leading HR platform, building the people operating system.",
    logo: "https://logo.clearbit.com/personio.de",
    tag: "Unicorn",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Helsing",
    description: "AI-powered defence technology, shaping Europe's sovereignty.",
    logo: "https://logo.clearbit.com/helsing.ai",
    tag: "Scale-up",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Isar Aerospace",
    description: "Developing launch vehicles to provide dedicated access to space.",
    logo: "https://logo.clearbit.com/isaraerospace.com",
    tag: "Scale-up",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop",
  },
]

const notableAlumni = [
  {
    name: "Jessica Sauter",
    role: "Co-Founder & CEO, VoltStorage",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    quote: "START gave me the courage to take the leap.",
  },
  {
    name: "Moritz Helmich",
    role: "Co-Founder, Finanzguru",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote: "The network you build here lasts a lifetime.",
  },
  {
    name: "Laura Wagner",
    role: "Founder & CTO, MedTech AI",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    quote: "From student to founder in one semester.",
  },
]

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

const networkCities = [
  { name: "Munich", flag: "🇩🇪", image: "https://images.unsplash.com/photo-1577462800662-7511e228c0e6?q=80&w=400&auto=format&fit=crop" },
  { name: "Berlin", flag: "🇩🇪", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=400&auto=format&fit=crop" },
  { name: "San Francisco", flag: "🇺🇸", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400&auto=format&fit=crop" },
  { name: "London", flag: "🇬🇧", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&auto=format&fit=crop" },
  { name: "New York", flag: "🇺🇸", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400&auto=format&fit=crop" },
  { name: "Singapore", flag: "🇸🇬", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=400&auto=format&fit=crop" },
  { name: "Cambridge", flag: "🇬🇧", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop" },
]

// ── Hooks ───────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let current = 0
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) { setCount(target); clearInterval(timer) }
      else setCount(current)
    }, interval)
    return () => clearInterval(timer)
  }, [target, duration, start])
  return count
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Component ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const factsView = useInView(0.25)
  const missionView = useInView(0.15)
  const specialView = useInView(0.1)
  const startupsView = useInView(0.1)

  useEffect(() => { setLoaded(true) }, [])

  // Hero image crossfade
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % heroImages.length), 5000)
    return () => clearInterval(t)
  }, [])

  const animatedValues = [
    useCountUp(facts[0].value, 1800, factsView.visible),
    useCountUp(facts[1].value, 1800, factsView.visible),
    useCountUp(facts[2].value, 1800, factsView.visible),
    useCountUp(facts[3].value, 1800, factsView.visible),
    useCountUp(facts[4].value, 1800, factsView.visible),
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
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-gray-400 text-xs tracking-widest">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-brand-pink to-transparent" />
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

        {/* ═══════════════════════════ FACTS — OVER FULL-WIDTH IMAGE ═══════════════════════════ */}
        <section ref={factsView.ref} className="relative py-32 px-4 sm:px-6 lg:px-8">
          {/* Background image */}
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark-blue/85 backdrop-blur-[2px]" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-700 ${factsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">By the numbers</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-4">FACTS</h2>
              <div className="w-20 h-1 bg-brand-pink mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {facts.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:border-brand-pink/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(208,0,111,0.15)] ${factsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{fact.icon}</div>
                  <div className="text-5xl sm:text-6xl font-black text-brand-pink mb-2 tabular-nums">
                    {Math.round(animatedValues[i])}{fact.suffix}
                  </div>
                  <div className="text-sm text-gray-300 font-medium leading-tight">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ COMMUNITY PHOTO STRIP ═══════════════════════════ */}
        <section className="py-4 overflow-hidden">
          <div className="animate-scroll">
            {[...communityPhotos, ...communityPhotos].map((photo, i) => (
              <div key={`${photo.alt}-${i}`} className="inline-block mx-2 flex-shrink-0">
                <div className="w-80 h-52 rounded-2xl overflow-hidden">
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════ PARTNERS — SCROLLING BANNER ═══════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Backed by the best</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-4">OUR PARTNERS</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                World-class companies and investors who believe in our mission.
              </p>
              <div className="w-20 h-1 bg-brand-pink mx-auto mt-4" />
            </div>

            <div className="relative overflow-hidden py-8">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-dark-blue to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-dark-blue to-transparent z-10" />
              <div className="animate-scroll">
                {[...partnerLogos, ...partnerLogos].map((partner, i) => (
                  <div key={`${partner.name}-${i}`} className="inline-flex items-center justify-center mx-10 flex-shrink-0">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 w-36 h-24 flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-12 max-w-[90px] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                          ;(e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xs text-gray-600 font-bold text-center">${partner.name}</span>`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10">
              <Link href="/for-partners" className="group inline-flex items-center gap-2 text-brand-pink hover:text-white font-bold text-lg transition-colors">
                Become a Partner <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ NOTABLE STARTUPS — IMAGE CARDS ═══════════════════════════ */}
        <section ref={startupsView.ref} className="py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-20 transition-all duration-700 ${startupsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Success stories</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-4">NOTABLE STARTUPS &amp; ALUMNI</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                From student projects to unicorns — our community produces founders who change the world.
              </p>
              <div className="w-20 h-1 bg-brand-pink mx-auto mt-4" />
            </div>

            {/* Startup image cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {notableStartups.map((startup, i) => (
                <div
                  key={startup.name}
                  className={`group relative overflow-hidden rounded-3xl h-[380px] transition-all duration-700 ${startupsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <img src={startup.image} alt={startup.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/40 to-transparent group-hover:from-brand-dark-blue group-hover:via-brand-dark-blue/60 transition-all duration-500" />

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="bg-white rounded-xl w-12 h-12 flex items-center justify-center p-2 shadow-lg">
                        <img
                          src={startup.logo}
                          alt=""
                          className="max-h-7 max-w-[30px] object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                            ;(e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-sm font-bold text-gray-700">${startup.name.charAt(0)}</span>`
                          }}
                        />
                      </div>
                      <span className="text-xs bg-brand-pink/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold">
                        {startup.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-white mb-2">{startup.name}</h4>
                      <p className="text-gray-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {startup.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alumni with large photos */}
            <div className="mb-12">
              <h3 className="text-2xl font-black text-white mb-10 text-center">ALUMNI FOUNDERS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {notableAlumni.map((alumnus) => (
                  <div key={alumnus.name} className="group relative">
                    <div className="relative overflow-hidden rounded-3xl h-[300px] mb-5">
                      <img
                        src={alumnus.image}
                        alt={alumnus.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue/90 to-transparent" />
                      {/* Quote overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white/90 text-sm italic">&ldquo;{alumnus.quote}&rdquo;</p>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white">{alumnus.name}</h4>
                    <p className="text-gray-400 text-sm">{alumnus.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link href="/startups" className="group inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-brand-pink hover:border-brand-pink transition-all duration-300 text-lg">
                Explore All Startups <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ WHAT MAKES START SPECIAL — IMAGE-BACKED CARDS ═══════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-blue via-[#060620] to-brand-dark-blue" />

          <div ref={specialView.ref} className="relative max-w-7xl mx-auto">
            <div className={`text-center mb-20 transition-all duration-700 ${specialView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Our Difference</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-4">WHAT MAKES START SPECIAL</h2>
              <div className="w-20 h-1 bg-brand-pink mx-auto" />
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

        {/* ═══════════════════════════ CTA — FULL-WIDTH IMAGE BG ═══════════════════════════ */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark-blue/80 backdrop-blur-[3px]" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-12 sm:p-20 shadow-2xl">
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">READY TO START?</h2>
              <p className="text-gray-200 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Whether you want to join our community or partner with us to shape Munich's entrepreneurial future — there's a place for you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/member-journey" className="group relative px-12 py-5 bg-brand-pink text-white font-bold rounded-xl text-xl overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(208,0,111,0.4)] w-full sm:w-auto text-center">
                  <span className="relative z-10">Join Us</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link href="/for-partners" className="px-12 py-5 border-2 border-brand-pink text-brand-pink font-bold rounded-xl hover:bg-brand-pink hover:text-white transition-all text-xl w-full sm:w-auto text-center">
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ START NETWORK — CITY CARDS ═══════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Worldwide</span>
              <h2 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-4">START NETWORK</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our community stretches far beyond Munich — connecting founders, alumni, and partners across the globe.
              </p>
              <div className="w-20 h-1 bg-brand-pink mx-auto mt-4" />
            </div>

            {/* City image cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {networkCities.map((city) => (
                <div key={city.name} className="group relative overflow-hidden rounded-2xl h-48 cursor-default">
                  <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-brand-dark-blue/60 group-hover:bg-brand-pink/40 transition-colors duration-500" />
                  <div className="relative h-full flex flex-col items-center justify-center">
                    <span className="text-3xl mb-2">{city.flag}</span>
                    <span className="text-white font-bold text-lg">{city.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Network stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
              {[
                { value: "7+", label: "Cities Worldwide" },
                { value: "500+", label: "Alumni Network" },
                { value: "50+", label: "Partner Organizations" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:border-brand-pink/40 transition-all duration-300">
                  <div className="text-4xl font-black text-brand-pink mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { href: "/members", label: "Meet our Members" },
                { href: "/startups", label: "Our Startups" },
                { href: "/events", label: "Upcoming Events" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group inline-flex items-center gap-2 text-brand-pink hover:text-white font-bold transition-colors">
                  {link.label} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ))}
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
