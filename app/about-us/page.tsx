"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useInView, useAnimatedNumber } from '@/lib/hooks'
import Hero from '@/components/Hero'
import HeroCard from '@/components/HeroCard'

const executiveBoard = [
  { name: "Ali Serag El Din", role: "President", photo: "/aboutUs/Board/Ali-opt.png" },
  { name: "Defne Aytuna", role: "Vice President", photo: "/aboutUs/Board/Defne-opt.png" },
  { name: "Simon Burmer", role: "CFO", photo: "/aboutUs/Board/Simon-opt.png" },
]

const departmentBoard = [
  { name: "Mohammed Thabit", role: "MD Events", photo: "/aboutUs/Board/Mohammed-opt.png" },
  { name: "Piotr Nobis", role: "MD Marketing", photo: "/aboutUs/Board/Piotr-opt.png" },
  { name: "Anna Heletych", role: "MD People", photo: "/aboutUs/Board/Anna-opt.png" },
  { name: "Niklas Simakov", role: "MD Finance & Operations", photo: "/aboutUs/Board/Niklas-opt.png" },
  { name: "Marius Heumader", role: "MD Partnerships", photo: "/aboutUs/Board/Marius-opt.png" },
]

const advisoryBoard = [
  { name: "Advisory Member 1", role: "CEO, Company", bio: "Brings 20+ years of experience in scaling tech companies across Europe. Advises on corporate strategy and international expansion.", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face" },
  { name: "Advisory Member 2", role: "Founder, Startup", bio: "Serial entrepreneur with three successful exits. Mentors early-stage founders on product-market fit and fundraising.", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face" },
  { name: "Advisory Member 3", role: "Partner, VC Fund", bio: "Leads early-stage investments in deep tech and SaaS. Connects our startups with the European investor network.", photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop&crop=face" },
  { name: "Advisory Member 4", role: "Professor, TUM", bio: "Chair of Entrepreneurship at TU Munich. Bridges academic research with real-world startup building.", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
  { name: "Advisory Member 5", role: "Managing Director", bio: "Runs one of Munich's leading accelerator programs. Expert in go-to-market strategy and corporate partnerships.", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face" },
  { name: "Advisory Member 6", role: "Angel Investor", bio: "Backed 40+ startups across fintech, healthtech, and mobility. Offers hands-on support in the critical first 18 months.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" },
  { name: "Advisory Member 7", role: "COO, Scale-up", bio: "Operational leader who scaled a Munich startup from 10 to 500 employees. Advises on hiring, culture, and processes.", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face" },
]

const missionPartners = [
  { name: "MTZ", description: "The Münchner Technologiezentrum provides office space, business coaching, and networking for young tech companies near Olympic Park — helping startups grow from first idea to market.", logo: "https://mtz.de/wp-content/uploads/2021/10/White-1.svg", image: "/aboutUs/missionPartner/mtz-opt.jpg" },
  { name: "Munich Startup", description: "Munich's official startup portal connecting founders with resources, investors, and the local ecosystem — mapping the city's innovation landscape and amplifying its startup scene.", logo: "https://www.munich-startup.de/wp-content/themes/munichstartup/dist/images/munich-startup-logo-w.svg", image: "/aboutUs/missionPartner/MunichStartup.png" },
  { name: "CDTM and Manage & More", descriptionParts: [
    { text: "CDTM and Manage & More share our mission in empowering the next generation of founders in Munich. " },
    { text: "START Munich and CDTM / M&M are complementary. We are a community that encourages learning by doing, while they are educational programs that provide structured curriculum. ", pink: true },
    { text: "Many of our best members also join CDTM or M&M, handling the intensive time commitment coming from being part of both." },
  ], image: "/aboutUs/missionPartner/CDTM.png", image2: "/aboutUs/missionPartner/mandm.jpeg" },
]

const showAdvisoryBoard = process.env.NEXT_PUBLIC_SHOW_ADVISORY_BOARD === 'true'

export default function AboutUsPage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(0)
  const animatedYears = useAnimatedNumber(20)
  const animatedMembers = useAnimatedNumber(600)
  const missionView = useInView(0.1)
  const partnersView = useInView(0.1)
  const execView = useInView(0.1)
  const deptView = useInView(0.1)
  const advView = useInView(0.1)

  return (
    <main className="min-h-screen bg-brand-dark-blue text-white overflow-x-hidden">
      <Hero
        backgroundImage="/aboutUs/hero-opt.jpg"
        title={
          <>
            WHO WE
            <br />
            <span className="outline-text">ARE</span>
          </>
        }
        description="A student-led community at the heart of Munich's startup scene — turning bold ideas into real ventures since 2003."
      >
        <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-6">
          <HeroCard>
            <div className="flex items-baseline justify-center gap-2 mb-3">
              <span className="text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300">{animatedYears}</span>
              <span className="text-xl lg:text-3xl font-bold text-brand-pink">+</span>
            </div>
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Years Active</p>
          </HeroCard>
          <HeroCard>
            <div className="flex items-baseline justify-center gap-2 mb-3">
              <span className="text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300">{animatedMembers}</span>
              <span className="text-xl lg:text-3xl font-bold text-brand-pink">+</span>
            </div>
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Members</p>
          </HeroCard>
        </div>
      </Hero>

      {/* ═══ 01 VISION & MISSION — bold editorial ═══ */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8" ref={missionView.ref}>
        <div className="max-w-7xl mx-auto">
          <div className={`mb-10 transition-all duration-700 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="text-brand-pink text-xs font-bold tracking-[0.4em] uppercase block mb-4">Our Purpose</span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight">
                VISION<br />&amp; MISSION
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`bg-gradient-to-br from-brand-pink/15 via-brand-pink/5 to-transparent border border-brand-pink/20 rounded-3xl p-10 lg:p-14 transition-all duration-700 delay-150 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-brand-pink/20 border border-brand-pink/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-brand-pink text-xs font-bold tracking-[0.35em] uppercase">Mission</span>
              </div>
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.05] mb-10">
                Empowering<br />founders of<br /><span className="text-brand-pink">tomorrow.</span>
              </h3>
              <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-md">
                A self-driven community where learning happens by doing — and every member gets what is needed to build things that truly matters.
              </p>
            </div>

            <div className={`bg-white/[0.03] border border-white/10 rounded-3xl p-10 lg:p-14 transition-all duration-700 delay-300 ${missionView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <span className="text-white/50 text-xs font-bold tracking-[0.35em] uppercase">Vision</span>
              </div>
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.05] mb-10">
                Being the launchpad for <span className="text-white/30">innovation</span>
              </h3>
              <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-md">
                We envision START as the place for ambitious students within the Munich ecosystem, where ideas are turned into real innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 02 MISSION PARTNERS ═══ */}
      <section className="pt-1 pb-16 px-4 sm:px-6 lg:px-8" ref={partnersView.ref}>
        <div className="max-w-7xl mx-auto">
          <div className={`mb-10 transition-all duration-700 ${partnersView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-brand-pink text-sm font-bold tracking-[0.35em] uppercase">Mission Partners</span>
            <p className="text-gray-500 text-base mt-2">Organisations who share our mission and support us in building Munich&apos;s next generation of founders.</p>
          </div>

          <div className={`flex flex-col gap-6 transition-all duration-700 delay-200 ${partnersView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {missionPartners.map((partner, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row">
                <div className={`md:w-72 lg:w-80 flex-shrink-0 overflow-hidden relative ${partner.image2 ? 'h-48 md:h-auto' : 'h-48'}`}>
                  {partner.image2 ? (
                    <div className="flex h-full">
                      <Image src={partner.image} alt={partner.name} width={200} height={150} className="w-1/2 h-full object-contain bg-white p-3" />
                      <div className="w-1 bg-brand-dark-blue flex-shrink-0" />
                      <Image src={partner.image2} alt={partner.name} width={200} height={150} className="w-1/2 h-full object-contain bg-white p-3" />
                    </div>
                  ) : (
                    <Image src={partner.image} alt={partner.name} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
                  )}
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-4">
                    {partner.image2 ? (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <Image src={partner.image} alt="CDTM" width={28} height={28} className="object-contain" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <Image src={partner.image2} alt="Manage and More" width={28} height={28} className="object-contain" />
                        </div>
                      </>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        {partner.logo
                          ? <Image src={partner.logo} alt={partner.name} width={28} height={28} className="object-contain" />
                          : <span className="text-white/30 text-xs font-bold uppercase">{partner.name.charAt(0)}</span>
                        }
                      </div>
                    )}
                    <h3 className="font-black uppercase text-white tracking-wide text-lg">{partner.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {'descriptionParts' in partner
                      ? partner.descriptionParts?.map((part, i) => (
                          <span key={i} className={part.pink ? 'text-brand-pink' : undefined}>{part.text}</span>
                        ))
                      : partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>


      {/* ═══ 03 EXECUTIVE BOARD — side-by-side layout ═══ */}
      <section className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 relative" ref={execView.ref}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12 lg:gap-16 items-center transition-all duration-700 ${execView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left: heading */}
            <div>
              <span className="text-brand-pink text-xs font-bold tracking-[0.4em] uppercase block mb-4">Meet the Team</span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight">
                THE BOARD
              </h2>
            </div>

            {/* Right: portrait cards */}
            <div className={`grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-x-8 gap-y-8 transition-all duration-700 delay-200 ${execView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {executiveBoard.map((member, i) => (
                <div
                  key={member.name}
                  className={`flex flex-col items-center text-center group transition-all duration-500 ${execView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="relative w-36 h-48 sm:w-48 sm:h-[15rem] rounded-xl overflow-hidden border-2 border-white/10 pointer-events-none select-none mb-3">
                    <Image src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 144px, 192px" className="object-cover object-top" draggable={false} />
                  </div>
                  <p className="font-black uppercase text-white text-xs lg:text-sm tracking-wide leading-tight">{member.name}</p>
                  <p className="text-gray-500 text-[11px] lg:text-xs font-semibold mt-1 uppercase tracking-widest">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 04 DEPARTMENT BOARD — compact row with circles ═══ */}
      <section className="pt-4 pb-28 px-4 sm:px-6 lg:px-8" ref={deptView.ref}>
        <div className="max-w-7xl mx-auto">
          <div className={`bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 lg:p-10 transition-all duration-700 ${deptView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-brand-pink" />
              <span className="text-brand-pink text-xs font-bold tracking-[0.35em] uppercase">Department Board</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-y-8 gap-x-4">
              {departmentBoard.map((member, i) => (
                <div
                  key={member.name}
                  className={`flex flex-col items-center text-center group transition-all duration-500 ${deptView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden border-2 border-white/10 pointer-events-none select-none mb-3">
                    <Image src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 144px, 176px" className="object-cover object-top" draggable={false} />
                  </div>
                  <p className="font-black uppercase text-white text-xs lg:text-sm tracking-wide leading-tight">{member.name}</p>
                  <p className="text-gray-500 text-[11px] lg:text-xs mt-1 uppercase tracking-wider">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 05 ADVISORY BOARD — thumbnail grid with expandable detail ═══ */}
      {showAdvisoryBoard && (
      <section className="pt-4 pb-28 px-4 sm:px-6 lg:px-8" ref={advView.ref}>
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center gap-3 mb-12 transition-all duration-700 ${advView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-6 h-px bg-brand-pink" />
            <span className="text-brand-pink text-sm font-bold tracking-[0.35em] uppercase">Advisory Board</span>
            <div className="w-6 h-px bg-white/20" />
            <span className="text-gray-500 text-base lg:text-lg leading-relaxed">Seasoned entrepreneurs and industry leaders who sharpen our direction.</span>
          </div>

          {/* 7-column thumbnail grid */}
          <div className={`grid grid-cols-4 sm:grid-cols-7 gap-3 lg:gap-4 transition-all duration-700 delay-200 ${advView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {advisoryBoard.map((member, i) => (
              <button
                key={i}
                onClick={() => setSelectedAdvisor(selectedAdvisor === i ? null : i)}
                className={`group text-left transition-all duration-300 ${selectedAdvisor === i ? 'scale-[0.97]' : ''}`}
              >
                <div className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-colors duration-300 ${selectedAdvisor === i ? 'border-brand-pink' : 'border-white/10 hover:border-white/30'}`}>
                  <Image src={member.photo} alt={member.name} fill sizes="(max-width: 768px) 25vw, 12vw" className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05112a]/80 via-transparent to-transparent" />
                </div>
                <p className={`font-bold uppercase text-xs tracking-wide leading-tight mt-2 transition-colors ${selectedAdvisor === i ? 'text-brand-pink' : 'text-white'}`}>{member.name}</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">{member.role}</p>
              </button>
            ))}
          </div>

          {/* Expandable detail panel */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${selectedAdvisor !== null ? 'max-h-[300px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
            {selectedAdvisor !== null && (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 lg:p-8 flex items-start gap-6">
                <div className="hidden sm:block relative flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 border-brand-pink">
                  <Image src={advisoryBoard[selectedAdvisor].photo} alt={advisoryBoard[selectedAdvisor].name} fill sizes="80px" className="object-cover object-top" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tight">{advisoryBoard[selectedAdvisor].name}</h3>
                      <p className="text-brand-pink text-sm font-semibold mt-1">{advisoryBoard[selectedAdvisor].role}</p>
                    </div>
                    <button onClick={() => setSelectedAdvisor(null)} className="text-white/30 hover:text-white transition-colors flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm lg:text-base leading-relaxed mt-4">{advisoryBoard[selectedAdvisor].bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      )}
    </main>
  )
}