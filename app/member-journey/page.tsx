"use client"

import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'
import { ScrollIndicator } from '@/components/EventComponents'
import Hero from "@/components/Hero"
import TestimonialsSection from '@/components/TestimonialsSection'

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

interface MemberStory {
  id: string
  name: string
  role: string
  company: string
  image: string
  story: string
  quote: string
  department: string
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
    title: "Start Sprint",
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
    title: "Community Program",
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
    title: "Start Alumni",
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
      "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop"
    ]
  }
]

const memberStories: MemberStory[] = [
  {
    id: "story-1",
    name: "Sarah Mueller",
    role: "Founder & CEO",
    company: "TechFlow GmbH",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
    story: "I joined START Munich with just an idea and a lot of passion. Through the intensive onboarding and department selection, I found my place in the Events team. The network and mentorship I received were instrumental in launching TechFlow.",
    quote: "START Munich didn't just give me a startup, it gave me a community that believed in my vision.",
    department: "Events"
  },
  {
    id: "story-2",
    name: "Alex Rodriguez",
    role: "Founder & CTO",
    company: "DataSync AI",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
    story: "The San Francisco trip was a game-changer for my startup. Meeting investors and engineers in Silicon Valley opened doors I didn't know existed. Combined with the Marketing team's support, we scaled from 0 to 50k users.",
    quote: "The global perspective I gained at START Munich accelerated our growth by years.",
    department: "Marketing"
  },
  {
    id: "story-3",
    name: "Emma Schmidt",
    role: "Founder & Product Lead",
    company: "GreenLeaf Solutions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop",
    story: "Coming from a non-technical background, the workshops and Partnerships team helped me bridge the gap. I learned fundraising, business development, and how to build lasting relationships with investors.",
    quote: "The People team made me feel supported every step of the way. That's what makes START Munich special.",
    department: "People"
  }
]

export default function MemberJourneyPage() {
  const [loading, setLoading] = useState(true)
  const [eventImageIndex, setEventImageIndex] = useState(0)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const timelineSliderRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)
  const [isMoreHovered, setIsMoreHovered] = useState(false)
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Images for "And a lot more..." section
  const moreImages = [
    "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop"
  ]

  const eventImages = hoveredEventId
    ? startEvents
      .find((event) => event.id === hoveredEventId)
      ?.images.map((img) => ({ src: img, title: startEvents.find((e) => e.id === hoveredEventId)!.title })) || []
    : []

  // Get current event for auto-rotation
  const currentEvent = !hoveredEventId && !isMoreHovered ? startEvents[currentEventIndex] : null
  const currentEventImage = currentEvent ? { src: currentEvent.images[0], title: currentEvent.title } : null

  const handleNextImage = () => {
    if (eventImages.length === 0) return
    setEventImageIndex((prev) => (prev + 1) % eventImages.length)
  }

  const handlePrevImage = () => {
    if (eventImages.length === 0) return
    setEventImageIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length)
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
    if (loading || hoveredEventId || isMoreHovered) {
      // Clear timer if hovering
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current)
        autoRotateTimerRef.current = null
      }
      return
    }

    autoRotateTimerRef.current = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % startEvents.length)
    }, 5000)

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current)
      }
    }
  }, [loading, hoveredEventId, isMoreHovered])

  // Reset image index when hovering event changes
  useEffect(() => {
    setEventImageIndex(0)
  }, [hoveredEventId, isMoreHovered])

  // Reset event index when returning from hover
  useEffect(() => {
    if (!hoveredEventId && !isMoreHovered) {
      setCurrentEventIndex(0)
    }
  }, [hoveredEventId, isMoreHovered])

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
          backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
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

          <div className="relative group/timeline">
            <div
              ref={timelineSliderRef}
              className="overflow-x-auto scrollbar-hide pb-12 pt-8 cursor-grab active:cursor-grabbing"
            >
              {/* Timeline Line (horizontal) */}
              <div className="absolute left-0 right-0 top-[60px] h-[2px] bg-gradient-to-r from-brand-pink/20 via-brand-pink/50 to-brand-pink/20"></div>
              <div className="absolute left-0 right-0 top-[60px] h-[2px] bg-gradient-to-r from-transparent via-brand-pink to-transparent w-1/2 blur-sm opacity-50 animate-pulse"></div>

              {/* Timeline Events */}
              <div className="flex gap-12 min-w-max px-8 lg:px-20">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="group relative pt-20 timeline-card-animate w-[400px] flex-shrink-0"
                    style={{
                      animationDelay: `${index * 0.15}s`
                    }}
                  >
                    {/* Timeline Dot & Connector */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                      {/* Dot */}
                      <div className="relative z-10">
                        <div className="relative w-16 h-16 bg-[#0B0C24] rounded-full flex items-center justify-center border border-white/10 group-hover:border-brand-pink transition-all duration-500 shadow-[0_0_0_8px_rgba(11,12,36,1)] group-hover:shadow-[0_0_20px_rgba(208,0,111,0.4)]">
                          <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{event.icon}</span>
                        </div>
                      </div>
                      {/* Vertical Connector */}
                      <div className="w-[1px] h-20 bg-gradient-to-b from-brand-pink/50 to-transparent -mt-2 group-hover:h-full group-hover:from-brand-pink group-hover:to-brand-pink/10 transition-all duration-500"></div>
                    </div>

                    {/* Event Card */}
                    <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-pink/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_-10px_rgba(208,0,111,0.15)]">

                      {/* Decorative background blur */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none group-hover:bg-brand-pink/10 transition-all duration-500"></div>

                      {/* Header */}
                      <div className="p-8 pb-4 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-5xl font-black text-white/5 group-hover:text-brand-pink/10 transition-colors duration-500">
                            0{index + 1}
                          </span>
                          <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-brand-pink/30 transition-all duration-500"></div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-pink transition-all duration-300">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed min-h-[60px]">
                          {event.description}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="p-8 pt-0 relative z-10">
                        {/* Images for Start Sprint */}
                        {event.id === "start-sprint" && Array.isArray(event.image) && (
                          <div className="flex gap-3 mb-6">
                            <div className="flex-1 h-32 overflow-hidden rounded-lg relative group/image">
                              <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition-all duration-300 z-10"></div>
                              <img
                                src={event.image[0]}
                                alt={`${event.title} 1`}
                                className="w-full h-full object-cover transform group-hover/image:scale-110 transition-transform duration-700"
                              />
                            </div>
                            <div className="flex-1 h-32 overflow-hidden rounded-lg relative group/image translate-y-4">
                              <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition-all duration-300 z-10"></div>
                              <img
                                src={event.image[1]}
                                alt={`${event.title} 2`}
                                className="w-full h-full object-cover transform group-hover/image:scale-110 transition-transform duration-700"
                              />
                            </div>
                          </div>
                        )}

                        {/* Details List */}
                        {event.id === "exchange-trip" && typeof event.details[0] === 'object' ? (
                          <div className="grid grid-cols-2 gap-3 mt-4">
                            {(event.details as { text: string; image: string; icon: string }[]).map((detail, i) => (
                              <div key={i} className="group/item relative rounded-xl overflow-hidden aspect-square border border-white/5 hover:border-brand-pink/30 transition-all duration-300">
                                <img
                                  src={detail.image}
                                  alt={detail.text}
                                  className="w-full h-full object-cover opacity-60 group-hover/item:opacity-40 group-hover/item:scale-110 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C24] via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <div className="text-xl mb-1 transform group-hover/item:-translate-y-1 transition-transform duration-300">{detail.icon}</div>
                                  <p className="text-[10px] leading-tight text-gray-300 font-medium group-hover/item:text-white transition-colors">{detail.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3 mt-4 bg-black/20 rounded-xl p-4 border border-white/5">
                            {(event.details as string[]).map((detail, i) => (
                              <div key={i} className="flex items-start gap-3 group/list-item">
                                <div className="w-1.5 h-1.5 bg-brand-pink/50 rounded-full mt-1.5 group-hover/list-item:bg-brand-pink group-hover/list-item:shadow-[0_0_8px_rgba(208,0,111,0.5)] transition-all duration-300"></div>
                                <span className="text-xs text-gray-400 group-hover/list-item:text-gray-200 transition-colors duration-300">{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Accent */}
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
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
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-pink overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-brand-pink/20"
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

                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Single large card with all events */}
              <div className="bg-white/5 border border-white/10 p-8">
                <div className="space-y-6">
                  {startEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0 last:pb-0 cursor-pointer transition-all duration-200 hover:bg-white/5 px-4 -mx-4 rounded-lg"
                      onMouseEnter={() => setHoveredEventId(event.id)}
                      onMouseLeave={() => setHoveredEventId(null)}
                    >
                      <span className="text-4xl flex-shrink-0">{event.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-bold text-lg">{event.title}</h3>
                          {event.frequency && (
                            <span className="px-2.5 py-1 bg-brand-pink/20 border border-brand-pink/50 rounded-full text-xs font-semibold text-brand-pink">
                              {event.frequency}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* "And a lot more..." */}
                  <div
                    className="flex items-start gap-4 pt-2 cursor-pointer transition-all duration-200 hover:bg-white/5 px-4 -mx-4 rounded-lg"
                    onMouseEnter={() => setIsMoreHovered(true)}
                    onMouseLeave={() => setIsMoreHovered(false)}
                  >
                    <span className="text-4xl flex-shrink-0">✨</span>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2">And a lot more...</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Discover many more exciting events and opportunities as part of the START Munich community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rotating single image or grid */}
              <div className="bg-white/5 border border-white/10 h-full min-h-[500px] relative overflow-hidden">
                {isMoreHovered ? (
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
                    {/* Center overlay text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/70 backdrop-blur-sm px-8 py-4 border-2 border-brand-pink">
                        <p className="text-2xl font-black text-white">AND MORE...</p>
                      </div>
                    </div>
                  </div>
                ) : hoveredEventId && eventImages.length > 0 ? (
                  /* Hovered event with manual navigation */
                  <>
                    <div className="relative w-full h-full">
                      <img
                        key={eventImages[eventImageIndex]?.src}
                        src={eventImages[eventImageIndex]?.src}
                        alt={eventImages[eventImageIndex]?.title}
                        className="w-full h-full object-cover fade-swap"
                      />

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <p className="text-base font-bold text-white">
                          {eventImages[eventImageIndex]?.title}
                        </p>
                      </div>

                      {/* Navigation controls overlay */}
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-4">
                        <button
                          onClick={handlePrevImage}
                          className="w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 border border-white/30 hover:border-white/60 text-white text-xl transition-all backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          ←
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 border border-white/30 hover:border-white/60 text-white text-xl transition-all backdrop-blur-sm"
                          aria-label="Next image"
                        >
                          →
                        </button>
                      </div>

                      {/* Image counter */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
                        {eventImageIndex + 1} / {eventImages.length}
                      </div>
                    </div>
                  </>
                ) : currentEventImage ? (
                  /* Auto-rotating event display */
                  <div className="relative w-full h-full">
                    <img
                      key={currentEventImage.src}
                      src={currentEventImage.src}
                      alt={currentEventImage.title}
                      className="w-full h-full object-cover fade-swap"
                    />

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-base font-bold text-white">
                        {currentEventImage.title}
                      </p>
                    </div>

                    {/* Event counter */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
                      {currentEventIndex + 1} / {startEvents.length}
                    </div>
                  </div>
                ) : null}
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
              <div className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-brand-pink/50 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format&fit=crop"
                    alt="San Francisco Bay Area"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-brand-pink/90 text-white text-xs font-bold uppercase tracking-wider">
                      International Trip
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors">
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
              <div className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-brand-pink/50 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
                    alt="University Research"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-brand-pink/90 text-white text-xs font-bold uppercase tracking-wider">
                      Research Partnership
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors">
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

          {/* Member Stories Section */}
          <TestimonialsSection
            title={<>
              <span className="outline-text">MEMBER STORIES</span>
            </>}
            description="Real stories from our members who built successful startups with START Munich"
            items={memberStories.map(story => ({
              id: story.id,
              name: story.name,
              role: story.role,
              company: story.company,
              image: story.image,
              story: story.story,
              quote: story.quote
            }))}
          />

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a3e] via-brand-dark-blue to-[#0d0d1f] border-2 border-brand-pink/50 shadow-2xl shadow-brand-pink/20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-pink/5 rounded-full blur-3xl"></div>

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

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="px-8 py-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/50">
                    Apply Now
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