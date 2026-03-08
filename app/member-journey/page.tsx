"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import Script from 'next/script'
import Hero from "@/components/Hero"

export const dynamic = 'force-dynamic'

interface TimelineEvent {
  id: string
  title: string
  description: string
  icon: string
  image: string | string[]
  details: string[] | { text: string; image: string; icon: string }[]
}

interface Department {
  id: string
  name: string
  description: string
  icon: string
  responsibilities: string[]
}

interface StartEvent {
  id: string
  title: string
  description: string
  category: string
  frequency: string
  icon: string
  images: string[]
}


const placeholderImage = "/internalevents.png"

const timelineEvents: TimelineEvent[] = [
  {
    id: "application",
    title: "Application",
    description: "Submit your application to START Munich and tell us about your entrepreneurial vision.",
    icon: "📝",
    image: "",
    details: ["Apply for summer or winter semester", "Written application + 2 interviews", "Selecting highly motivated and performing individuals"]
  },
  {
    id: "start-sprint",
    title: "START Sprint",
    description: "Intensive onboarding program where you meet the team, learn about START Munich, and connect with other members.",
    icon: "🚀",
    image: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
    ],
    details: ["Get to know the basics for founding a company or prove your knowledge", "First month after being selected", "One month full of trainings and talks with professors, professionals, and VCs", "Pitch events at the end of the sprint, showing which teams learned the most"]
  },
  {
    id: "department-selection",
    title: "Department Selection",
    description: "Choose your department and get involved in active project teams within START Munich.",
    icon: "🎯",
    image: "",
    details: ["After the sprint choose between the 5 departments", "Explore department options further down", "Choose a department where you can grow and support START"]
  },
  {
    id: "exchange-trip",
    title: "Active Member",
    description: "Enjoy the benefits of being a Stratie and expand your network through exclusive opportunities.",
    icon: "🌍",
    image: placeholderImage,
    details: [
      { text: "Go on a trip to SF and visit some of our startups", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800&auto=format&fit=crop", icon: "✈️" },
      { text: "Write your thesis with our research partner Cambridge", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop", icon: "📚" },
      { text: "Get in touch with well-known VCs", image: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=800&auto=format&fit=crop", icon: "🤝" },
      { text: "Many more exclusive benefits", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop", icon: "⭐" }
    ]
  },
  {
    id: "alumni",
    title: "START Alumni",
    description: "Graduate to alumni status and continue to support the community while building your successful startup.",
    icon: "⭐",
    image: placeholderImage,
    details: ["After being 2 semesters core member, you are a START alumni", "No more department work required", "Time to apply what you learned and make things START"]
  }
]

const departments: Department[] = [
  {
    id: "finops",
    name: "Finops",
    description: "Financial operations and business development",
    icon: "💰",
    responsibilities: ["Budgeting and finance", "Partnership management", "Business strategy", "Growth metrics"]
  },
  {
    id: "events",
    name: "Events",
    description: "Community events and networking experiences",
    icon: "🎉",
    responsibilities: ["Event planning", "Community engagement", "Speaker coordination", "Attendee experience"]
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Brand and communication strategy",
    icon: "📢",
    responsibilities: ["Social media management", "Content creation", "Brand strategy", "Marketing campaigns"]
  },
  {
    id: "partnerships",
    name: "Partnerships",
    description: "Strategic partnerships and collaborations",
    icon: "🤝",
    responsibilities: ["Partner outreach", "Collaboration agreements", "Ecosystem building", "Corporate relations"]
  },
  {
    id: "people",
    name: "People",
    description: "Member experience and community culture",
    icon: "👥",
    responsibilities: ["Member onboarding", "Community culture", "Mentorship programs", "Member support"]
  }
]

const startEvents: StartEvent[] = [
  {
    id: "monthly",
    title: "The Monthly",
    description: "Every month all Munich Straties meet and get updated on START events or pitch their startups. Location: MTZ",
    category: "Meeting",
    frequency: "Monthly",
    icon: "📅",
    images: [
      "/monthly-event.jpg",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "department-work",
    title: "Department Work",
    description: "Work with your department. Be weekly in presence in the MTZ.",
    category: "Department",
    frequency: "Weekly",
    icon: "💼",
    images: [
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "builders-weekend",
    title: "Builders Weekend",
    description: "Meet on the weekend to build your own startup.",
    category: "Building",
    frequency: "Monthly",
    icon: "🔨",
    images: [
      "https://images.unsplash.com/photo-1515162305280-9da0c0b0fb47?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529333166433-0c1df022bdd7?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "workshops",
    title: "Member Workshops",
    description: "Workshops with VCs and other professionals.",
    category: "Learning",
    frequency: "",
    icon: "🎓",
    images: [
      "/member-workshops.png",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "startup-visits",
    title: "Startup Visits",
    description: "Visit startups and learn from the experienced.",
    category: "Networking",
    frequency: "",
    icon: "🏢",
    images: [
      "/member-startup-visit.jpg",
      "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop"
    ]
  }
]

const alumniTestimonials = [
  {
    id: "felix",
    name: "FELIX HAAS",
    role: "Co-Founder IDnow,\nHost Bits & Pretzels",
    image: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/6601560cc17c4d47b2882ffb_img-alumni.png",
    quote: "At START Munich, I laid the foundation for my current network. From this starting point, I built several companies, invested in more than 80 start-ups and helped set up Bits & Pretzels.",
    logos: [
      { src: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/65f98ea7c70b10b668ccbece_logo.svg", url: "https://www.bitsandpretzels.com/" },
      { src: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/65f98ea7c70b10b668ccbeea_Vectors-Wrapper.svg", url: "https://www.idnow.io/" }
    ]
  },
  {
    id: "joshua",
    name: "JOSHUA CORNELIUS",
    role: "Co-Founder, Freeletics",
    image: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/6601560a8bf0f64332a0263b_img-alumni-1.png",
    quote: "Before we founded Freeletics, START Munich - in addition to CDTM - gave my co-founder and me the ideal opportunity to make first contacts in the Munich startup scene.",
    logos: [
      { src: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/65f98ea7c70b10b668ccbeef_5eb3c929c8c4590004435152.png", url: "https://www.freeletics.com/" }
    ]
  },
  {
    id: "jennifer",
    name: "JENNIFER DUSSILEK",
    role: "Co-Founder, Finway",
    image: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/6601560ac1b43a886293443e_img-alumni-2.png",
    quote: "The insights and connections I made at START Munich are immeasurable. They led to the inception of finway, finding co-founders and meeting future investors.",
    logos: [
      { src: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/65f98ea7c70b10b668ccbee5_Vectors-Wrapper.svg", url: "https://www.finway.de/" }
    ]
  }
]

export default function MemberJourneyPage() {
  const [loading, setLoading] = useState(true)

  // Internal events state
  const [activeEventIdx, setActiveEventIdx] = useState(0)
  const [eventImgIdx, setEventImgIdx] = useState(0)
  const eventAutoTimerRef = useRef<NodeJS.Timeout | null>(null)
  const eventDelayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const totalEventItems = startEvents.length + 1 // +1 for "And a lot more..."

  const moreImages = [
    "/more-isar-unfiltered.jpg",
    "/more-workshops.png",
    "/more-dsc04524.jpg",
    "/more-img4955.jpg"
  ]

  const isMoreActive = activeEventIdx >= startEvents.length
  const activeImages = !isMoreActive ? startEvents[activeEventIdx]?.images : null
  const activeEventTitle = !isMoreActive ? startEvents[activeEventIdx]?.title : "And a lot more..."
  const safeImgIdx = activeImages ? eventImgIdx % activeImages.length : 0

  const handlePrevImg = () => {
    if (!activeImages || activeImages.length <= 1) return
    setEventImgIdx(prev => (prev - 1 + activeImages.length) % activeImages.length)
  }

  const handleNextImg = () => {
    if (!activeImages || activeImages.length <= 1) return
    setEventImgIdx(prev => (prev + 1) % activeImages.length)
  }

  useEffect(() => {
    setLoading(false)
  }, [])



  // Start auto-cycle for events
  const startEventAutoCycle = useCallback(() => {
    if (eventAutoTimerRef.current) clearInterval(eventAutoTimerRef.current)
    eventAutoTimerRef.current = setInterval(() => {
      setActiveEventIdx(prev => (prev + 1) % totalEventItems)
      setEventImgIdx(0)
    }, 4000)
  }, [totalEventItems])

  // Restart auto-cycle with a 5s delay (used after click)
  const restartEventAutoCycle = useCallback(() => {
    if (eventAutoTimerRef.current) clearInterval(eventAutoTimerRef.current)
    if (eventDelayTimerRef.current) clearTimeout(eventDelayTimerRef.current)
    eventDelayTimerRef.current = setTimeout(() => {
      startEventAutoCycle()
    }, 5000)
  }, [startEventAutoCycle])

  useEffect(() => {
    if (loading) return
    startEventAutoCycle()
    return () => {
      if (eventAutoTimerRef.current) clearInterval(eventAutoTimerRef.current)
      if (eventDelayTimerRef.current) clearTimeout(eventDelayTimerRef.current)
    }
  }, [loading, startEventAutoCycle])

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-dark-blue py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-white">Loading journey...</p>
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
        <Hero
          backgroundImage="/member-journey-hero.jpg"
          title={
            <>
              YOUR START MUNICH
              <br />
              <span className="outline-text">JOURNEY</span>
            </>
          }
          description="Experience your first two semesters as an active START Munich member"
        />

        {/* Content Below Hero */}


        {/* Member Journey Timeline Section */}
        <div className="mb-20 w-full pt-8 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              YOUR <span className="outline-text">MEMBER JOURNEY</span>
            </h2>
            <p className="text-gray-400 text-lg mb-4">
              The 5 milestones of your first two semesters at START Munich
            </p>
          </div>

          <div className="overflow-x-auto scrollbar-hide pl-[max(1rem,calc((100%-80rem)/2+1rem))] sm:pl-[max(1.5rem,calc((100%-80rem)/2+1.5rem))] lg:pl-[max(2rem,calc((100%-80rem)/2+2rem))] pr-4 sm:pr-6 lg:pr-8">
            <div className="flex gap-6 min-w-max">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="relative bg-white/[0.03] border border-white/10 overflow-hidden min-w-[320px] w-[320px]"
                >
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-black text-white">
                        0{index + 1}
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10"></div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title} {event.icon}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-0">
                    {event.id === "exchange-trip" && typeof event.details[0] === 'object' ? (
                      <div className="space-y-3 mt-4 mt-0">
                        {(event.details as { text: string; image: string; icon: string }[]).map((detail, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] bg-brand-pink rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-gray-400">{detail.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 mt-4 mt-0">
                        {(event.details as string[]).map((detail, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] bg-brand-pink rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-gray-400">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-20">

          {/* Departments Section */}
          <div className="mb-10">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                OUR <span className="outline-text">DEPARTMENTS</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Choose your department and contribute to our community
              </p>
            </div>

            {/* Mindmap - Desktop only */}
            <div className="hidden lg:block">
              <div className="relative w-full" style={{ height: '750px', marginBottom: '-200px' }}>
                {/* Connecting lines (SVG) - rendered first so boxes cover them */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <mask id="logo-mask">
                      <rect width="100%" height="100%" fill="white" />
                      <circle cx="50%" cy="52%" r="50" fill="black" />
                    </mask>
                  </defs>
                  <g mask="url(#logo-mask)">
                    {[
                      { x2: '10%', y2: '50%' },
                      { x2: '20%', y2: '15%' },
                      { x2: '50%', y2: '10%' },
                      { x2: '80%', y2: '15%' },
                      { x2: '90%', y2: '50%' },
                    ].map((line, i) => (
                      <line
                        key={i}
                        x1="50%"
                        y1="52%"
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(208,0,111,0.3)"
                        strokeWidth="3"
                        className="mindmap-line"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    ))}
                  </g>
                </svg>

                {/* Logo - bottom center */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '38%' }}>
                  <img src="/startlogo.svg" alt="START Munich" className="w-44 h-44" />
                </div>

                {/* Department Nodes */}
                {(() => {
                  // Finops, Events, Marketing, Partnerships, People
                  // Arc: left, center-left, center, center-right, right
                  const positions: React.CSSProperties[] = [
                    { top: '40%', left: '0' },
                    { top: '5%', left: '10%' },
                    { top: '0', left: '50%', transform: 'translateX(-50%)' },
                    { top: '5%', right: '10%' },
                    { top: '40%', right: '0' },
                  ]
                  return departments.map((dept, i) => (
                    <div
                      key={dept.id}
                      className="absolute z-10 w-[280px]"
                      style={positions[i]}
                    >
                      <div className="bg-[#080830] border border-white/10 p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{dept.icon}</span>
                          <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{dept.description}</p>
                        <div className="space-y-1.5">
                          {dept.responsibilities.map((resp, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] bg-brand-pink rounded-full flex-shrink-0"></div>
                              <span className="text-sm text-gray-400">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                })()}
              </div>
            </div>

            {/* Mobile fallback - stacked cards */}
            <div className="lg:hidden space-y-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white/5 border border-white/10 p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{dept.icon}</span>
                    <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{dept.description}</p>
                  <div className="space-y-1.5">
                    {dept.responsibilities.map((resp, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] bg-brand-pink rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-400">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Internal Events Section */}
        <div className="w-full bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-brand-dark-blue mb-3">
                INTERNAL <span className="outline-text-dark">EVENTS</span>
              </h2>
              <p className="text-gray-500 text-lg">
                Regular events and activities for our member community
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Event list */}
              <div className="bg-gray-50 border border-gray-200 p-8">
                <div className="space-y-2">
                  {startEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={`relative flex items-start gap-4 py-4 px-5 cursor-pointer transition-all duration-300 ${
                        activeEventIdx === index ? 'bg-brand-pink/10' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setActiveEventIdx(index)
                        setEventImgIdx(0)
                        restartEventAutoCycle()
                      }}
                    >
                      {/* Active indicator bar */}
                      <div className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition-all duration-300 ${
                        activeEventIdx === index ? 'bg-brand-pink' : 'bg-transparent'
                      }`}></div>
                      <span className="text-4xl flex-shrink-0">{event.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-brand-dark-blue font-bold text-lg mb-1">{event.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* "And a lot more..." */}
                  <div
                    className={`relative flex items-start gap-4 py-4 px-5 cursor-pointer transition-all duration-300 ${
                      isMoreActive ? 'bg-brand-pink/10' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setActiveEventIdx(startEvents.length)
                      setEventImgIdx(0)
                      restartEventAutoCycle()
                    }}
                  >
                    <div className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition-all duration-300 ${
                      isMoreActive ? 'bg-brand-pink' : 'bg-transparent'
                    }`}></div>
                    <span className="text-4xl flex-shrink-0">✨</span>
                    <div className="flex-1">
                      <h3 className="text-brand-dark-blue font-bold text-lg mb-1">And a lot more...</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Discover many more exciting events and opportunities as part of the START Munich community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image panel */}
              <div className="bg-gray-50 border border-gray-200 h-full min-h-[500px] relative overflow-hidden">
                {isMoreActive ? (
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    {moreImages.map((img, i) => (
                      <div key={i} className="relative overflow-hidden">
                        <img
                          src={img}
                          alt={`More activities ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/internalevents.png' }}
                        />
                        <div className="absolute inset-0 bg-brand-dark-blue/20"></div>
                      </div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/70 backdrop-blur-sm px-8 py-4 border-2 border-brand-pink">
                        <p className="text-2xl font-black text-white">AND MORE...</p>
                      </div>
                    </div>
                  </div>
                ) : activeImages && activeImages.length > 0 ? (
                  <div className="relative w-full h-full">
                    <img
                      key={activeImages[safeImgIdx]}
                      src={activeImages[safeImgIdx]}
                      alt={activeEventTitle}
                      className="w-full h-full object-cover fade-swap"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/internalevents.png' }}
                    />

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-base font-bold text-white">{activeEventTitle}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Community Specials Section */}
        <div className="w-full py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                COMMUNITY <span className="outline-text">SPECIALS</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Unique opportunities exclusively for START Munich members
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* START goes Bay Area */}
              <div className="relative overflow-hidden bg-white/5 border border-white/10">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format&fit=crop"
                    alt="San Francisco Bay Area"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-brand-pink/90 text-white text-xs font-bold uppercase tracking-wider">
                      International Trip
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    START goes Bay Area
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    A selective international exchange program connecting outstanding entrepreneurial talent from Europe with the innovation ecosystem of the San Francisco Bay Area. The program brings together a curated group of 20 participants and enables direct interaction with founders, researchers, and investors at leading technology and innovation organizations.
                  </p>
                  <a
                    href="https://www.startbayarea.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-pink font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Research Partnership */}
              <div className="relative overflow-hidden bg-white/5 border border-white/10">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="/cambridge-aerial.webp"
                    alt="University of Cambridge"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-brand-pink/90 text-white text-xs font-bold uppercase tracking-wider">
                      Research Partnership
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Thesis with Cambridge & TUM
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Write your thesis with our research partners at the University of Cambridge and Technical University of Munich. Gain access to world-class academic resources, mentorship from leading researchers, and the opportunity to contribute to cutting-edge entrepreneurship research.
                  </p>
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Cambridge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>TUM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-20">

          {/* Alumni Section */}
          <div className="mb-20">
            <div className="mb-12 mr-auto w-fit">
              <p className="text-brand-pink font-bold text-sm uppercase tracking-widest mb-3">Words of Former Starties</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                WHAT OUR <span className="outline-text">ALUMNI</span> SAY
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alumniTestimonials.map((alumni) => (
                <div key={alumni.id} className="bg-[#080830] border border-white/10 overflow-hidden flex flex-col max-w-[400px] mx-auto w-full">
                  {/* Photo */}
                  <div className="bg-gray-200 aspect-square overflow-hidden">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Quote & Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-white text-sm leading-relaxed mb-6 flex-1">
                      &ldquo;{alumni.quote}&rdquo;
                    </p>

                    <div>
                      <h4 className="text-white font-black text-base mb-1">{alumni.name}</h4>
                      <div className="flex items-end justify-between">
                        <p className="text-gray-400 text-sm whitespace-pre-line">{alumni.role}</p>
                        <div className="flex items-center gap-3" style={{"flexDirection": "column"}}>
                          {alumni.logos.map((logo, i) => (
                            <a key={i} href={logo.url} target="_blank" rel="noopener noreferrer">
                              <img src={logo.src} alt="" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1a3e] via-brand-dark-blue to-[#0d0d1f] border-2 border-brand-pink/50 shadow-2xl shadow-brand-pink/20">
            {/* Decorative SVGs */}
            <img src="/cta-left.svg" alt="" className="absolute left-0 top-1/2 -translate-y-1/2 h-full opacity-30 pointer-events-none" />
            <img src="/cta-right.svg" alt="" className="absolute right-0 top-1/2 -translate-y-1/2 h-full opacity-30 pointer-events-none" />

            <div className="relative p-8 md:p-12">
              <div className="flex flex-col items-center gap-8 text-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                    Ready to Join?
                  </h3>
                  <p className="text-lg text-gray-300 max-w-2xl">
                    Start your entrepreneurial journey with START Munich today. Apply to become a member and experience our vibrant community.
                  </p>
                </div>

                <div className="pt-4">
                  <button className="px-8 py-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-bold transition-all duration-300">
                    Apply Now
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

{/* Global styles for animations */ }
<style jsx global>{`
  .fade-swap {
    animation: fadeSwap 0.8s ease-in-out;
  }
  @keyframes fadeSwap {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Timeline card entrance animation */
  .timeline-card-animate {
    animation: slideInFromLeft 0.6s ease-out forwards;
    opacity: 0;
    transform: translateX(-30px);
  }
  @keyframes slideInFromLeft {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Custom scrollbar styling for horizontal scroll */
  .scrollbar-thin-horizontal::-webkit-scrollbar {
    height: 8px;
  }
  .scrollbar-thin-horizontal::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  .scrollbar-thin-horizontal::-webkit-scrollbar-thumb {
    background: rgba(255, 0, 107, 0.5);
    border-radius: 10px;
    transition: background 0.3s;
  }
  .scrollbar-thin-horizontal::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 0, 107, 0.8);
  }

  /* Smooth scroll behavior */
  .overflow-x-auto {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
`}</style>