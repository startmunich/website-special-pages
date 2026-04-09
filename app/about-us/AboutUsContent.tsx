"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useInView, useAnimatedNumber } from '@/lib/hooks'
import Hero from '@/components/Hero'
import HeroCard from '@/components/HeroCard'
import CTA from '@/components/CTA'

const executiveBoard = [
  { name: "Ali Serag El Din", role: "President", photo: "/aboutUs/Board/Ali-opt.png", linkedinUrl: "https://www.linkedin.com/in/ali-serag-el-din/" },
  { name: "Defne Aytuna", role: "Vice President", photo: "/aboutUs/Board/Defne-opt.png", linkedinUrl: "https://www.linkedin.com/in/defne-aytuna/" },
  { name: "Simon Burmer", role: "CFO", photo: "/aboutUs/Board/Simon-opt.png", linkedinUrl: "https://www.linkedin.com/in/simon-burmer/" },
]

const departmentBoard = [
  { name: "Mohammed Thabit", role: "MD Events", photo: "/aboutUs/Board/Mohammed-opt.png", linkedinUrl: "https://www.linkedin.com/in/mohammed-thabit/" },
  { name: "Piotr Nobis", role: "MD Marketing", photo: "/aboutUs/Board/Piotr-opt.png", linkedinUrl: "https://www.linkedin.com/in/piotr-nobis/" },
  { name: "Anna Heletych", role: "MD People", photo: "/aboutUs/Board/Anna-opt.png", linkedinUrl: "https://www.linkedin.com/in/anna-heletych/" },
  { name: "Niklas Simakov", role: "MD Finance & Operations", photo: "/aboutUs/Board/Niklas-opt.png", linkedinUrl: "https://www.linkedin.com/in/niklas-simakov/" },
  { name: "Marius Heumader", role: "MD Partnerships", photo: "/aboutUs/Board/Marius-opt.png", linkedinUrl: "https://www.linkedin.com/in/marius-heumader/" },
]

const advisoryBoard = [
  {
    name: "Dr. Jennifer Kaiser-Steiner",
    role: "Learning & Exchange Center, UnternehmerTUM",
    bio: "Dr. Jennifer Kaiser-Steiner leads the Learning & Exchange Center at UnternehmerTUM, Europe's largest entrepreneurship hub. She supports startup factories and innovation ecosystems in strengthening their professionalism by sharing best practices and establishing KPI-driven performance frameworks. Previously, she worked as a personal advisor to a member of the German Bundestag, where she contributed to legislative initiatives. Jennifer earned her doctorate in economics from the University of the Federal Armed Forces, with a research focus on corporate innovation.",
    photo: "/aboutUs/AdvBoard/Jennifer.jpg",
  },
  {
    name: "Prof. Dr. Bettina Maisch",
    role: "Head of Entrepreneurship Education, SCE",
    bio: "Prof. Dr. Bettina Maisch is Head of Entrepreneurship Education and Qualification at the Strascheg Center for Entrepreneurship (SCE). Her work focuses on Entrepreneurial Life Design, Design Thinking, and Innovation Management to empower individuals and organizations to develop and implement innovative ideas. She combines academic research with hands-on, iterative approaches to (Corporate) Entrepreneurship and venture creation.",
    photo: "/aboutUs/AdvBoard/Maisch.jpg",
  },
  {
    name: "Felix Haas",
    role: "Co-founder, 10x Founders VC",
    bio: "Felix Haas is a German entrepreneur, investor, and serial founder, having co-founded START Munich in 2003, the ticketing platform amiando, the identity verification company IDnow, and the startup venture firm 10x Founders VC. He has invested in over 50 tech startups, co-hosts Germany's leading founders' conference Bits & Pretzels, and is a founding partner of FLEX Capital, recognized for mentoring founders and driving innovation in the startup ecosystem.",
    photo: "/aboutUs/AdvBoard/Felix.png",
    objectPosition: "center",
  },
  {
    name: "Jean Paul Buján",
    role: "Former Vice President",
    bio: null,
    photo: "/aboutUs/AdvBoard/JP-opt.png",
  },
  {
    name: "Fabian Rieht",
    role: "Former President",
    bio: null,
    photo: "/aboutUs/AdvBoard/Fabian-opt.png",
  },
]

const missionPartners = [
  { name: "MTZ", description: "The Münchner Technologiezentrum provides office space, business coaching, and networking for young tech companies near Olympic Park — helping startups grow from first idea to market.", logo: "https://mtz.de/wp-content/uploads/2021/10/White-1.svg", image: "/aboutUs/missionPartner/mtz-opt.jpg" },
  { name: "Munich Startup", description: "Munich's official startup portal connecting founders with resources, investors, and the local ecosystem — mapping the city's innovation landscape and amplifying its startup scene.", logo: "https://www.munich-startup.de/wp-content/themes/munichstartup/dist/images/munich-startup-logo-w.svg", image: "/aboutUs/missionPartner/MunichStartup.png" },
  { name: "CDTM and Manage & More", descriptionParts: [
    { text: "CDTM and Manage & More share our mission in empowering the next generation of founders in Munich. " },
    { text: "However START Munich and CDTM / M&M differ. We are a community that encourages learning by doing, while they are educational programs that provide structured curriculum. ", pink: true },
    { text: "Some of our members also join CDTM or M&M, but handling the intensive time commitment for both is challenging." },
  ], image: "/aboutUs/missionPartner/CDTM.png", image2: "/aboutUs/missionPartner/mandm.jpeg" },
]

type AdvisoryMember = typeof advisoryBoard[number]

function AdvisorDetail({ member, onClose }: { member: AdvisoryMember, onClose: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const t = () =>
    `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`

  return (
    <div className={`bg-white/[0.03] border border-white/10 rounded-2xl p-6 lg:p-8 flex items-start gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className={`hidden sm:block relative flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 border-brand-pink ${t()}`} style={{ transitionDelay: '0ms' }}>
        <Image src={member.photo} alt={member.name} fill sizes="80px" className="object-cover object-top" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className={`text-xl lg:text-2xl font-black text-white uppercase tracking-tight ${t()}`} style={{ transitionDelay: '100ms' }}>{member.name}</h3>
            <p className={`text-brand-pink text-sm font-semibold mt-1 ${t()}`} style={{ transitionDelay: '200ms' }}>{member.role}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className={`text-gray-400 text-sm lg:text-base leading-relaxed mt-4 ${t()}`} style={{ transitionDelay: '300ms' }}>{member.bio}</p>
      </div>
    </div>
  )
}

const showAdvisoryBoard = true

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
                We envision START as <i>the</i> place for ambitious students in Munich, where ideas are turned into real innovations.
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
                THE<br />EXECUTIVE<br />BOARD
              </h2>
            </div>

            {/* Right: portrait cards */}
            <div className={`grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-x-8 gap-y-8 transition-all duration-700 delay-200 ${execView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {executiveBoard.map((member, i) => (
                <a
                  key={member.name}
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center text-center group transition-all duration-500 ${execView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="relative w-36 h-48 sm:w-48 sm:h-[15rem] rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-brand-pink/50 transition-colors select-none mb-3">
                    <Image src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 144px, 192px" className="object-cover object-top" draggable={false} />
                  </div>
                  <p className="font-black uppercase text-white text-xs lg:text-sm tracking-wide leading-tight group-hover:text-brand-pink transition-colors">{member.name}</p>
                  <p className="text-gray-500 text-[11px] lg:text-xs font-semibold mt-1 uppercase tracking-widest">{member.role}</p>
                </a>
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
              <span className="text-brand-pink text-xs font-bold tracking-[0.35em] uppercase">The Department Board</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-y-8 gap-x-4">
              {departmentBoard.map((member, i) => (
                <a
                  key={member.name}
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center text-center group transition-all duration-500 ${deptView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-brand-pink/50 transition-colors select-none mb-3">
                    <Image src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 144px, 176px" className="object-cover object-top" draggable={false} />
                  </div>
                  <p className="font-black uppercase text-white text-xs lg:text-sm tracking-wide leading-tight group-hover:text-brand-pink transition-colors">{member.name}</p>
                  <p className="text-gray-500 text-[11px] lg:text-xs mt-1 uppercase tracking-wider">{member.role}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 05 ADVISORY BOARD — thumbnail grid with expandable detail ═══ */}
      {showAdvisoryBoard && (
      <section className="pt-4 pb-28 px-4 sm:px-6 lg:px-8" ref={advView.ref}>
        <div className="max-w-7xl mx-auto">
          <div className={`mb-10 transition-all duration-700 ${advView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-brand-pink" />
              <span className="text-brand-pink text-sm font-bold tracking-[0.35em] uppercase">Advisory Board</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "Support and enable our long-term vision" },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", text: "Connect us with key ecosystem players" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "Advise us on strategic decisions" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* thumbnail grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 lg:gap-4 items-start">
            {advisoryBoard.map((member, i) => (
              <button
                key={i}
                onClick={() => member.bio ? setSelectedAdvisor(selectedAdvisor === i ? null : i) : undefined}
                className={`group text-left w-full transition-all duration-700 ${advView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${!member.bio ? 'cursor-default' : ''} ${selectedAdvisor === i ? 'scale-[0.97]' : ''}`}
                style={{}}
              >
                <div className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-colors duration-300 ${selectedAdvisor === i ? 'border-brand-pink' : 'border-white/10 hover:border-white/30'}`}>
                  <Image src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 33vw, 15vw" className="object-cover" style={{ objectPosition: 'objectPosition' in member ? member.objectPosition : 'top' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05112a]/80 via-transparent to-transparent" />
                </div>
                <p className={`font-bold uppercase text-xs tracking-wide leading-tight mt-2 transition-colors line-clamp-2 ${selectedAdvisor === i ? 'text-brand-pink' : 'text-white'}`}>{member.name}</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5 line-clamp-2">{member.role}</p>
              </button>
            ))}
          </div>

          {/* Expandable detail panel */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${selectedAdvisor !== null ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
            {selectedAdvisor !== null && advisoryBoard[selectedAdvisor].bio && (
              <AdvisorDetail key={selectedAdvisor} member={advisoryBoard[selectedAdvisor]} onClose={() => setSelectedAdvisor(null)} />
            )}
          </div>
        </div>
      </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CTA
            title="Want to Learn More About Us?"
            description="Discover how you can grow with START Munich — whether as a member shaping your entrepreneurial journey or as a partner connecting with Munich's most ambitious talents."
            buttons={[
              { label: "Discover the Member Journey", href: "/member-journey" },
              { label: "Become a Partner", href: "/for-partners", variant: "secondary" }
            ]}
          />
        </div>
      </section>
    </main>
  )
}