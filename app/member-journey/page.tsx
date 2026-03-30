"use client"

import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'
import { ScrollIndicator } from '@/components/EventComponents'
import Hero from "@/components/Hero"
import HeroCard from "@/components/HeroCard"
import TestimonialsSection from '@/components/TestimonialsSection'
import CTA from "@/components/CTA"
import { useAnimatedNumber } from '@/lib/hooks'

export const dynamic = 'force-dynamic'

interface TimelineEvent {
  id: string
  title: string
  description: string
  icon: string
  image: string | string[]
  details: string[]
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

interface MemberStory {
  id: string
  name: string
  role: string
  company: string
  image: string
  story: string
  department: string
  logos?: { src: string; url?: string }[]
}

const placeholderImage = "/internalevents.png"

const timelineEvents: TimelineEvent[] = [
  {
    id: "application",
    title: "Application",
    description: "Your entry into START Munich.",
    icon: "📝",
    image: "",
    details: ["Apply in April or October", "Stage 1: Written Application", "Stage 2: Two Interviews (same day, 30 minutes each)"]
  },
  {
    id: "start-sprint",
    title: "START Sprint",
    description: "Your first month at START. Get to know and bond with ambitious people you wouldn't meet in your usual circles, and build a real product together.",
    icon: "🚀",
    image: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
    ],
    details: ["Develop your own idea from concept to MVP in just 4 weeks", "Two workshops per week to learn foundations of building a startup", "Get to know key players within Munich startup ecosystem", "Hut weekend in Austria"]
  },
  {
    id: "department-selection",
    title: "Department Selection",
    description: "Develop yourself and shape the future of START.",
    icon: "🎯",
    image: "",
    details: ["Choose one of five departments", "Work on real projects with visible impact inside and outside START", "Learn useful startup skills in practice", "Grow fast by taking ownership", "Initiate new formats"]
  },
  {
    id: "active-member",
    title: "Active Member",
    description: "Enjoy the benefits of being a STARTie and expand your network through exclusive opportunities.",
    icon: "🌍",
    image: placeholderImage,
    details: [
      "Join the Bay Area trip, 2 weeks, 20+ curated visits to top startups, VCs, and labs",
      "Research Stay @ Cambridge through direct research collaboration",
      "Become part of the START Network, 20+ chapters worldwide",
      "Find co-founders or start your own venture within a community of 70+ startups, including teams backed by Y Combinator"
    ]
  },
  {
    id: "alumni",
    title: "START Alumni",
    description: "Once a STARTie, always a STARTie. Stay connected as you build your own path.",
    icon: "⭐",
    image: placeholderImage,
    details: ["Become alumni after two active semesters", "Find co-founders, investors, and collaborators across the START Global Network", "Give back by mentoring, sharing, and supporting new STARTies", "Stay involved as much as you want, department work is optional"]
  }
]

const departments: Department[] = [
  {
    id: "people",
    name: "People",
    description: "Learn how to spot the right talent, keep them motivated, and build a community that accelerates your startup journey.",
    icon: "👥",
    responsibilities: ["Run recruiting, interviews, and onboarding.", "Organize START Sprint and shape new batches.", "Keep members engaged and connected through formats like Hut Weekend, START Goes Eating, and more."]
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Learn strategy and how to highlight START's people, events, and achievements to reach millions and push the ecosystem forward.",
    icon: "📢",
    responsibilities: ["Create content, posts, and campaigns for LinkedIn and Instagram.", "Shoot and edit photos and videos from events.", "Build and maintain START's brand and image."]
  },
  {
    id: "finops",
    name: "FinOps",
    description: "Learn how to design and build custom tools and automate workflows to expand START's output and influence.",
    icon: "💰",
    responsibilities: ["Build internal tools like Members Platform or Financial Dashboard.", "Improve our core systems like Slack, n8n and Notion.", "Handle contract management, ensuring compliance."]
  },
  {
    id: "partnerships",
    name: "Partnerships",
    description: "Learn how to secure partners, close deals, and bring in the resources that multiply START's impact across the ecosystem.",
    icon: "🤝",
    responsibilities: ["Run persistent outreach, handle rejection, and keep going.", "Build and manage relationships that create long-term value.", "Close deals that fund START's projects."]
  },
  {
    id: "events",
    name: "Events",
    description: "Learn how to run flagship events where people meet, learn, and build across START, the Munich ecosystem, and beyond.",
    icon: "🎉",
    responsibilities: ["Organize and run large-scale events with 300+ attendees, like hackathons and summits.", "Organize workshops, startup visits, and other learning opportunities.", "Create experiences people remember and come back for."]
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
      "/memberJourney/monthly/2.jpg",
      "/memberJourney/monthly/3.png",
      "/memberJourney/monthly/4.png",
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
      "/memberJourney/departmentwork/2.jpg",
      "/memberJourney/departmentwork/1.JPG"
      
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
      "/memberJourney/builderWeekend/1.jpg"
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
      "/memberJourney/memberworkshop/1.jpg",
      "/memberJourney/memberworkshop/3.jpeg"
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
      "/memberJourney/startupVisit/1.png",
      "/memberJourney/startupVisit/2.png",
    ]
  }
]

const memberStories: MemberStory[] = [
  {
    id: "story-1",
    name: "Felix Haas",
    role: "Founder & Investor",
    company: "IDNow | Bits & Pretzels",
    image: "/memberJourney/alumni/FelixHaas.png",
    story: "At START Munich, I laid the foundation for my current network. From this starting point, I built several companies, invested in more than 80 start-ups and helped set up Bits & Pretzels.",
    department: "Alumni",
    logos: [
      { src: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/65f98ea7c70b10b668ccbeea_Vectors-Wrapper.svg", url: "https://www.idnow.io/" },
      { src: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/65f98ea7c70b10b668ccbece_logo.svg", url: "https://www.bitsandpretzels.com/" }
    ]
  },
  {
    id: "story-3",
    name: "Elisabeth Goebel",
    role: "Early Operator",
    company: "ZeitAI | CDTM",
    image: "/memberJourney/alumni/Elisa.png",
    story: "START is where things actually happen. I co-founded ISAR Unfiltered, met people who think and move the way I do, and built a network that directly led me to where I am today: Early Operator at a YC-backed AI startup.",
    department: "People",
    logos: [
      { src: "https://cdn.prod.website-files.com/6902359088cc8683c4db0171/69249d98617b1b96682cca65_44a5d2ba9e6004a1281eed9068c62a95_zeitai-logo.png", url: "https://www.zeit.ai/" },
    ]
  },
    {
    id: "story-2",
    name: "Joshua Cornelius",
    role: "Co-Founder",
    company: "Freeletics | CDTM",
    image: "/memberJourney/alumni/JoshuaCornelius.png",
    story: "Before we founded Freeletics, START Munich - in addition to CDTM - gave my co-founder and me the ideal opportunity to make first contacts in the Munich startup scene.",
    department: "Alumni",
    logos: [
      { src: "https://cdn.prod.website-files.com/65f98ea7c70b10b668ccbeb3/65f98ea7c70b10b668ccbeef_5eb3c929c8c4590004435152.png", url: "https://www.freeletics.com/" }
    ]
  }
]

export default function MemberJourneyPage() {
  const [loading, setLoading] = useState(true)
  const [eventImageIndex, setEventImageIndex] = useState(0)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const timelineSliderRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)
  const [lockedEventId, setLockedEventId] = useState<string | null>(null)
  const [isMoreHovered, setIsMoreHovered] = useState(false)
  const [isMoreLocked, setIsMoreLocked] = useState(false)
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null)
  const eventImageRef = useRef<HTMLDivElement>(null)
  const eventsSectionRef = useRef<HTMLDivElement>(null)

  // Unlock selection when clicking outside the events section
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (eventsSectionRef.current && !eventsSectionRef.current.contains(e.target as Node)) {
        setLockedEventId(null)
        setIsMoreLocked(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Animated counter for hero stats
  const semesterCount = useAnimatedNumber(2, loading, 500)

  // Images for "And a lot more..." section
  const moreImages = [
    "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop"
  ]

  const activeEventId = lockedEventId || hoveredEventId
  const activeMore = isMoreLocked || isMoreHovered

  const eventImages = activeEventId
    ? startEvents
      .find((event) => event.id === activeEventId)
      ?.images.map((img) => ({ src: img, title: startEvents.find((e) => e.id === activeEventId)!.title })) || []
    : []

  // Get current event for auto-rotation (only if nothing is active)
  const currentEvent = !activeEventId && !activeMore && currentEventIndex < startEvents.length
    ? startEvents[currentEventIndex]
    : null
  const currentEventImages = currentEvent
    ? currentEvent.images.map((img) => ({ src: img, title: currentEvent.title }))
    : []

  const scrollToEventImage = () => {
    if (window.innerWidth < 1024 && eventImageRef.current) {
      eventImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    const slider = timelineSliderRef.current
    if (!slider || loading) return

    const updateScroll = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth
      const progress = maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
    }

    slider.addEventListener('scroll', updateScroll)
    updateScroll()
    setTimeout(updateScroll, 100)

    return () => slider.removeEventListener('scroll', updateScroll)
  }, [loading])

  // Auto-rotate events every 5 seconds
  useEffect(() => {
    if (loading || activeEventId || activeMore) {
      // Clear timer if locked or hovering
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current)
        autoRotateTimerRef.current = null
      }
      return
    }

    autoRotateTimerRef.current = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % (startEvents.length + 1))
    }, 3000)

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current)
      }
    }
  }, [loading, activeEventId, activeMore])

  // Reset image index when event changes
  useEffect(() => {
    setEventImageIndex(0)
  }, [activeEventId, activeMore, currentEventIndex])

  // When hovering ends, continue auto-rotation from the active item
  useEffect(() => {
    if (!activeEventId && !activeMore) {
      return
    }
    if (activeEventId) {
      const index = startEvents.findIndex(e => e.id === activeEventId)
      if (index !== -1) {
        setCurrentEventIndex(index)
      }
    } else if (activeMore) {
      setCurrentEventIndex(startEvents.length)
    }
  }, [activeEventId, activeMore])

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
          backgroundImage="/memberJourney/hero.png"
          title={
            <>
              YOUR START MUNICH
              <br />
              <span className="outline-text">JOURNEY</span>
            </>
          }
          description="Become a member and spend two active semesters contributing to the community"
        >
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-6">
            {/* Stat Card 1 - 2 Semesters */}
            <HeroCard>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 transition">
                  {semesterCount}
                </span>
                <span className="text-xl lg:text-3xl font-bold text-brand-pink">+</span>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Semesters</p>
            </HeroCard>

            {/* Stat Card 2 - Infinite Possibilities */}
            <HeroCard>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 transition">
                  ∞
                </span>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Possibilities</p>
            </HeroCard>
          </div>
        </Hero>

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

          <div className="relative group/timeline">
            <div
              ref={timelineSliderRef}
              className="overflow-x-auto scrollbar-hide pb-12 cursor-grab active:cursor-grabbing"
            >
              {/* Timeline Events */}
              <div className="flex gap-6 min-w-max px-8 lg:px-20">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="group relative timeline-card-animate w-[340px] flex-shrink-0"
                    style={{
                      animationDelay: `${index * 0.15}s`
                    }}
                  >
                    {/* Event Card */}
                    <div className="relative h-full bg-white/5 border border-white/20 overflow-hidden transition-all duration-300 hover:border-brand-pink/50">
                      <div className="p-8 h-full flex flex-col">
                        {/* Number with divider */}
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-4xl font-black text-white tracking-tight">
                            0{index + 1}
                          </span>
                          <div className="h-[1px] flex-1 bg-white/20"></div>
                        </div>

                        {/* Title with emoji */}
                        <h3 className="text-lg font-black text-white mb-3">
                          {event.title} <span className="ml-1">{event.icon}</span>
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed mb-5">
                          {event.description}
                        </p>

                        {/* Details List */}
                        <div className="space-y-3">
                          {(event.details as string[]).map((detail, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-brand-pink rounded-full mt-1.5 flex-shrink-0"></div>
                              <span className="text-sm text-gray-400 leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollIndicator sliderRef={timelineSliderRef} scrollProgress={scrollProgress} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-20">

          {/* Departments Section */}
          <div className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                OUR <span className="outline-text">DEPARTMENTS</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Choose your department and contribute to our community
              </p>
            </div>

            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="relative bg-white/5 border border-white/10 overflow-hidden"
                >
                  {/* Header with gradient */}
                  <div className="bg-brand-secondary-blue p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-3">{dept.icon}</div>
                      <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">{dept.description}</p>

                    <div className="space-y-2">
                      <p className="text-xs text-brand-pink font-semibold">Key Responsibilities:</p>
                      {dept.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-brand-pink rounded-full flex-shrink-0"></div>
                          <span className="text-xs text-gray-400">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Internal Events Section */}
          <div className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                INTERNAL <span className="outline-text">EVENTS</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Regular events and activities for our member community
              </p>
            </div>

            <div ref={eventsSectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch lg:h-[650px]">
              {/* Single large card with all events */}
              <div
                className="bg-white/5 border border-white/10 p-8"
                onMouseLeave={() => {
                  if (!lockedEventId && !isMoreLocked) {
                    setHoveredEventId(null)
                    setIsMoreHovered(false)
                  }
                }}
              >
                <div className="space-y-2">
                  {startEvents.map((event, index) => {
                    const isActive = activeEventId === event.id || (!activeEventId && !activeMore && currentEventIndex === index)
                    return (
                      <div
                        key={event.id}
                        className={`flex items-start gap-4 p-4 cursor-pointer transition-all duration-200 rounded-lg border-l-4 ${isActive ? 'border-l-brand-pink bg-brand-pink/10' : 'border-l-transparent hover:bg-white/5'}`}
                        onMouseEnter={() => { if (!lockedEventId && !isMoreLocked) setHoveredEventId(event.id) }}
                        onMouseLeave={() => { if (!lockedEventId && !isMoreLocked) setHoveredEventId(null) }}
                        onClick={() => { setLockedEventId(event.id); setIsMoreLocked(false); setIsMoreHovered(false); setHoveredEventId(null); scrollToEventImage() }}
                      >
                        <span className="text-4xl flex-shrink-0">{event.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}

                  {/* "And a lot more..." */}
                  {(() => {
                    const isMoreActive = activeMore || (!activeEventId && !activeMore && currentEventIndex === startEvents.length)
                    return (
                      <div
                        className={`flex items-start gap-4 p-4 cursor-pointer transition-all duration-200 rounded-lg border-l-4 ${isMoreActive ? 'border-l-brand-pink bg-brand-pink/10' : 'border-l-transparent hover:bg-white/5'}`}
                        onMouseEnter={() => { if (!lockedEventId && !isMoreLocked) setIsMoreHovered(true) }}
                        onMouseLeave={() => { if (!lockedEventId && !isMoreLocked) setIsMoreHovered(false) }}
                        onClick={() => { setIsMoreLocked(true); setLockedEventId(null); setHoveredEventId(null); setIsMoreHovered(false); scrollToEventImage() }}
                      >
                        <span className="text-4xl flex-shrink-0">✨</span>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-2">And a lot more...</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Discover many more exciting events and opportunities.
                          </p>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Rotating single image or grid */}
              <div ref={eventImageRef} className="bg-white/5 border border-white/10 relative overflow-hidden">
                {activeMore || (!activeEventId && !activeMore && currentEventIndex === startEvents.length) ? (
                  /* Grid of 4 images for "And a lot more..." */
                  <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-0">
                    {moreImages.map((img, i) => (
                      <div key={i} className="relative w-full h-full overflow-hidden">
                        <img
                          src={img}
                          alt={`More activities ${i + 1}`}
                          className="w-full h-full object-cover fade-swap"
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
                ) : (() => {
                  const images = activeEventId && eventImages.length > 0
                    ? eventImages
                    : currentEventImages.length > 0
                      ? currentEventImages
                      : null
                  if (!images) return null
                  const idx = eventImageIndex % images.length
                  return (
                    <div className="relative w-full h-full">
                      <img
                        key={images[idx]?.src}
                        src={images[idx]?.src}
                        alt={images[idx]?.title}
                        className="w-full h-full object-cover fade-swap"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <p className="text-base font-bold text-white">{images[idx]?.title}</p>
                      </div>
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-4">
                        <button
                          onClick={() => setEventImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-brand-pink/80 border border-white/20 hover:border-brand-pink text-white transition-all duration-300 backdrop-blur-md hover:scale-110"
                          aria-label="Previous image"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                          onClick={() => setEventImageIndex((prev) => (prev + 1) % images.length)}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-brand-pink/80 border border-white/20 hover:border-brand-pink text-white transition-all duration-300 backdrop-blur-md hover:scale-110"
                          aria-label="Next image"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                        {idx + 1} / {images.length}
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>

          {/* Community Specials Section */}
          <div className="mb-20">
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
              <a
                href="https://www.startbayarea.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-white/5 border border-white/10 rounded-lg hover:border-brand-pink/50 transition-colors duration-300 cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="/memberJourney/SF.png"
                    alt="San Francisco Bay Area"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    START goes Bay Area
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    A selective international exchange program connecting outstanding entrepreneurial talent from Europe with the innovation ecosystem of the San Francisco Bay Area. The program brings together a curated group of 20 participants and enables direct interaction with founders, researchers, and investors at leading technology and innovation organizations.
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-pink font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>

              {/* Research Partnership */}
              <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-lg">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="/memberJourney/cambridge-aerial.png"
                    alt="University Research"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Research Stay @ Cambridge
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Spend a research stay with our partners at the University of Cambridge and Technical University of Munich. Gain access to world-class academic resources, mentorship from leading researchers, and the opportunity to contribute to cutting-edge entrepreneurship research.
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

          {/* Member Stories Section */}
          <TestimonialsSection
            title={<>
              <span className="outline-text">MEMBER </span> STORIES
            </>}
            description="Real stories from our members who built successful startups with START Munich"
            items={memberStories.map(story => ({
              id: story.id,
              name: story.name,
              role: story.role,
              company: story.company,
              image: story.image,
              story: story.story,
              logos: story.logos
            }))}
          />

          {/* CTA Section */}
          <CTA
            title="Ready to Join?"
            description="Start your entrepreneurial journey with START Munich today. Apply to become a member and experience our vibrant community."
            buttons={[
              { label: "Apply Now", href: "https://www.startmunich.de/apply", external: true },
              { label: "Learn More", href: "https://www.startmunich.de", variant: "secondary", external: true }
            ]}
          />

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