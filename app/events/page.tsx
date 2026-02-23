"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Script from "next/script"
import { useRouter } from "next/navigation"

import { EventCard, TimelineMarker, ScrollIndicator, SpecialEventCard } from "@/components/EventComponents"
import Hero from "@/components/Hero"
import HeroCard from "@/components/HeroCard"
import PastEventsGrid from "@/components/PastEventsGrid"
import UpcomingEventsGrid from "@/components/UpcomingEventsGrid"
import { useAnimatedNumber } from "@/lib/useAnimatedNumber"

export const dynamic = 'force-dynamic'

interface RecurringEvent {
  id: string
  name: string
  description: string
  month: string
  frequency: string
  icon: string
  image: string
  category: string
}

interface SpecialEvent {
  id: string
  name: string
  description: string
  category: string
  image: string
}

const recurringEvents: RecurringEvent[] = [
  {
    id: "rtss",
    name: "Road to START Summit (RTSS)",
    description: "Our flagship pitch event where aspiring founders present their startup ideas to a panel of investors, entrepreneurs, and industry experts.",
    month: "October",
    frequency: "Once per year",
    icon: "presentation",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    category: "Pitch Event"
  },
  {
    id: "rtsh",
    name: "Road to START Hack (RTSH)",
    description: "An intensive hackathon bringing together developers, designers, and entrepreneurs to build innovative solutions in 24-48 hours.",
    month: "November",
    frequency: "Once per year",
    icon: "code",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    category: "Hackathon"
  },
  {
    id: "legal-hack",
    name: "START Legal Hack",
    description: "A unique hackathon focused on building legal tech solutions that address real challenges in the legal industry, combining technology with regulatory expertise.",
    month: "March",
    frequency: "Once per year",
    icon: "code",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    category: "Hackathon"
  },
  {
    id: "info-event",
    name: "Info Event",
    description: "Join us at the start of each semester to learn about START Munich, meet our community, and discover how you can get involved.",
    month: "October & April",
    frequency: "Once per semester",
    icon: "info",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop",
    category: "Talk"
  },
  {
    id: "fail-tales",
    name: "Founder Fail Tales",
    description: "Real stories from real founders about their biggest failures and lessons learned.",
    month: "October & April",
    frequency: "Once per semester",
    icon: "stories",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
    category: "Talk"
  },
  {
    id: "pitch-network",
    name: "PITCH & NETWORK",
    description: "Practice your pitch, get feedback from experienced entrepreneurs, and network with fellow founders in an intimate setting.",
    month: "January & June",
    frequency: "Once per semester",
    icon: "presentation",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
    category: "Pitch Event"
  }
]

const specialEvents: SpecialEvent[] = [
  {
    id: "start-lab",
    name: "START Lab",
    description: "An intensive program where startups work on solving real challenges with expert mentorship, resources, and a structured approach to innovation and growth.",
    category: "Hackathon",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "isar-unfiltered",
    name: "Isar Unfiltered",
    description: "Raw, honest conversations with founders and entrepreneurs about the realities of building companies. No sugar-coating, just authentic stories and lessons learned.",
    category: "Founder Event",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
  }
]

export default function EventsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const specialEventsSliderRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })
  const specialEventsDragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [specialEventsScrollProgress, setSpecialEventsScrollProgress] = useState(0)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  useEffect(() => {
    setLoading(false)
  }, [])

  // Use animated number hook for statistics (faster animation - 800ms)
  const animatedHackathons = useAnimatedNumber(4, loading, 800)
  const animatedPublicEvents = useAnimatedNumber(10, loading, 800)

  useEffect(() => {
    const slider = sliderRef.current
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

  useEffect(() => {
    const slider = specialEventsSliderRef.current
    if (!slider || loading) return

    const updateScroll = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth
      const progress = maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0
      setSpecialEventsScrollProgress(progress)
    }

    slider.addEventListener('scroll', updateScroll)
    updateScroll()
    setTimeout(updateScroll, 100)

    return () => slider.removeEventListener('scroll', updateScroll)
  }, [loading])

  const handleDrag = {
    start: (e: React.MouseEvent) => {
      const slider = sliderRef.current
      if (!slider) return
      dragState.current = {
        isDragging: true,
        startX: e.pageX - slider.offsetLeft,
        scrollLeft: slider.scrollLeft
      }
    },
    move: (e: React.MouseEvent) => {
      if (!dragState.current.isDragging || !sliderRef.current) return
      e.preventDefault()
      const x = e.pageX - sliderRef.current.offsetLeft
      sliderRef.current.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX) * 2
    },
    end: () => {
      dragState.current.isDragging = false
    }
  }

  const handleSpecialEventsDrag = {
    start: (e: React.MouseEvent) => {
      const slider = specialEventsSliderRef.current
      if (!slider) return
      specialEventsDragState.current = {
        isDragging: true,
        startX: e.pageX - slider.offsetLeft,
        scrollLeft: slider.scrollLeft
      }
    },
    move: (e: React.MouseEvent) => {
      if (!specialEventsDragState.current.isDragging || !specialEventsSliderRef.current) return
      e.preventDefault()
      const x = e.pageX - specialEventsSliderRef.current.offsetLeft
      specialEventsSliderRef.current.scrollLeft = specialEventsDragState.current.scrollLeft - (x - specialEventsDragState.current.startX) * 2
    },
    end: () => {
      specialEventsDragState.current.isDragging = false
    }
  }

  const scrollToEvent = (eventId: string) => {
    const slider = sliderRef.current
    if (!slider) return

    const eventIndex = recurringEvents.findIndex(e => e.id === eventId)
    if (eventIndex === -1) return

    const cards = slider.children
    if (eventIndex >= cards.length) return

    const card = cards[eventIndex] as HTMLElement
    const cardLeft = card.offsetLeft
    const cardWidth = card.offsetWidth
    const sliderWidth = slider.offsetWidth

    const scrollPosition = cardLeft - (sliderWidth / 2) + (cardWidth / 2)

    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
  }

  const handleTimelineMarkerHover = (eventId: string) => {
    setHoveredEvent(eventId)
    scrollToEvent(eventId)
  }

  const calculateTimelinePosition = (month: number, day: number = 1): string => {
    // month: 1-12, day: 1-20 (assuming 20 days per month for positioning)
    // Each month takes up 8.33% of the timeline (100% / 12)
    // Within a month, each day takes up 8.33% / 20 = 0.4165%
    const monthProgress = (month - 1) / 12 // 0 to 11/12
    const dayProgress = (day) / 30 / 12 // 0 to 19/20/12
    const totalProgress = (monthProgress + dayProgress) * 100
    return `${totalProgress.toFixed(2)}%`
  }

  const getIconSvg = (icon: string) => {
    switch (icon) {
      case "trophy":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )
      case "code":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )
      case "info":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case "stories":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        )
      case "presentation":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-white">Loading events...</p>
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

      <main className="min-h-screen bg-[#00002c]">
        {/* Hero Section */}
        <Hero
          backgroundImage="/hero-image.jpg"
          title={
            <>
              START MUNICH
              <br />
              <span className="outline-text">EVENTS</span>
            </>
          }
          description="Connect, learn, and grow with Munich's most vibrant student entrepreneur community through our curated events"
        >
          {/* Statistics Boxes - Matching Startup Cards Style */}
          <div className="flex flex-col gap-6">
            {/** Stat 1 **/}
            <HeroCard>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-[#d0006f] transition">
                  {Math.floor(animatedHackathons)}
                </span>
                <span className="text-3xl font-bold text-[#d0006f]">+</span>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Hackathons Yearly</p>
            </HeroCard>

            {/** Stat 2 **/}
            <HeroCard>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-[#d0006f] transition">
                  {Math.floor(animatedPublicEvents)}
                </span>
                <span className="text-3xl font-bold text-[#d0006f]">+</span>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Public Events Yearly</p>
            </HeroCard>
          </div>
        </Hero>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">

          {/* Upcoming Events Calendar Section */}
          <div className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                UPCOMING EVENTS
              </h2>
              <p className="text-gray-400 text-lg">
                Stay updated with all our latest events and register to join us!
              </p>
            </div>

            <UpcomingEventsGrid />
          </div>

          {/* Recurring Events Section */}
          <div className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                OUR <span className="outline-text">ANNUAL RECURRING</span> EVENTS
              </h2>
              <p className="text-gray-400 text-lg">
                Mark your calendars! These are our flagship events that happen throughout the year.
              </p>
            </div>

            {/* Timeline Visualization */}
            <div className="mb-12 relative bg-white/5 rounded-2xl p-6 md:p-10 border border-white/10">

              {/* Months */}
              <div className="hidden md:grid grid-cols-12 gap-2 mb-6 text-center">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                  <div key={month} className="text-sm text-gray-300">
                    {month}
                  </div>
                ))}
              </div>

              {/* Timeline Line */}
              <div className="relative h-3 bg-white/10 rounded-full mb-20 mt-16 hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d0006f] via-pink-500 to-[#d0006f] opacity-40 rounded-full"></div>

                {/* Month Dividers */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-px h-6 bg-white/20"
                    style={{ left: `calc(${(i + 1) * 8.33}% - 0.5px)` }}
                  ></div>
                ))}

                {/* Event Markers - Using TimelineMarker Components */}
                <TimelineMarker
                  eventId="pitch-network"
                  left={calculateTimelinePosition(1, 15)}
                  color="#ff1744"
                  label="Pitch & Network"
                  position="bottom"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />

                <TimelineMarker
                  eventId="legal-hack"
                  left={calculateTimelinePosition(3, 15)}
                  color="#9c27b0"
                  label="Legal Hack"
                  position="top"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />

                <TimelineMarker
                  eventId="info-event"
                  left={calculateTimelinePosition(4, 15)}
                  color="#4a90e2"
                  label="Info Event"
                  position="bottom"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />

                <TimelineMarker
                  eventId="fail-tales"
                  left={calculateTimelinePosition(5, 15)}
                  color="#4a90e2"
                  label="Fail Tales"
                  position="top"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />

                <TimelineMarker
                  eventId="pitch-network"
                  left={calculateTimelinePosition(6, 15)}
                  color="#ff1744"
                  label="Pitch & Network"
                  position="bottom"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />

                <TimelineMarker
                  eventId="info-event"
                  left={calculateTimelinePosition(10, 15)}
                  color="#4a90e2"
                  label="Info Event"
                  position="top"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />

                <TimelineMarker
                  eventId="fail-tales"
                  left={calculateTimelinePosition(11, 15)}
                  color="#4a90e2"
                  label="Fail Tales"
                  position="bottom"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />

                <TimelineMarker
                  eventId="rtss"
                  left={calculateTimelinePosition(12, 0)}
                  color="#ff1744"
                  label="RTSS 🚀"
                  position="top"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />

                <TimelineMarker
                  eventId="rtsh"
                  left={calculateTimelinePosition(12, 15)}
                  color="#9c27b0"
                  label="RTSH 🚀"
                  position="bottom"
                  hoveredEvent={hoveredEvent}
                  onHover={handleTimelineMarkerHover}
                  onLeave={() => setHoveredEvent(null)}
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#ff1744] rounded-full"></div>
                  <span className="text-sm text-gray-300 font-medium">Pitch Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#9c27b0] rounded-full"></div>
                  <span className="text-sm text-gray-300 font-medium">Hackathons</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#4a90e2] rounded-full"></div>
                  <span className="text-sm text-gray-300 font-medium">Talks</span>
                </div>
              </div>

              {/* Mobile Timeline - Simplified */}
              <div className="md:hidden space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 text-gray-400 text-xs">Jan</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#ff1744] rounded-full"></div>
                    <span className="text-xs text-white">PITCH & NETWORK</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 text-gray-400 text-xs ">Mar</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#9c27b0] rounded-full"></div>
                    <span className="text-xs text-white">Legal Hack</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 text-gray-400 text-xs ">Apr</div>
                  <div className="flex-1 flex flex-wrap items-center gap-2">
                    <div className="w-3 h-3 bg-[#4a90e2] rounded-full"></div>
                    <span className="text-xs text-white">Info Event</span>
                    <span className="text-gray-500">•</span>
                    <div className="w-3 h-3 bg-[#4a90e2] rounded-full"></div>
                    <span className="text-xs text-white">Fail Tales</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 text-gray-400 text-xs ">Jun</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#ff1744] rounded-full"></div>
                    <span className="text-xs text-white">PITCH & NETWORK</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 text-gray-400 text-xs ">Oct</div>
                  <div className="flex-1 flex flex-wrap items-center gap-2">
                    <div className="w-3 h-3 bg-[#4a90e2] rounded-full"></div>
                    <span className="text-xs text-white">Info Event</span>
                    <span className="text-gray-500">•</span>
                    <div className="w-3 h-3 bg-[#4a90e2] rounded-full"></div>
                    <span className="text-xs text-white">Fail Tales</span>
                    <span className="text-gray-500">•</span>
                    <div className="w-3 h-3 bg-[#ff1744] rounded-full"></div>
                    <span className="text-xs text-white">RTSS</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 text-gray-400 text-xs ">Nov</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#9c27b0] rounded-full"></div>
                    <span className="text-xs text-white">Road to START Hack</span>
                  </div>
                </div>

                {/* Mobile Legend */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff1744]"></div>
                    <span className="text-gray-300">Pitch Event</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#9c27b0]"></div>
                    <span className="text-gray-300">Hackathon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4a90e2]"></div>
                    <span className="text-gray-300">Talks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Slider */}
            <div className="relative">
              <div
                ref={sliderRef}
                onMouseDown={handleDrag.start}
                onMouseUp={handleDrag.end}
                onMouseMove={handleDrag.move}
                onMouseLeave={handleDrag.end}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2 cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {recurringEvents.map((event, index) => {
                  const isFlagship = event.id === 'rtss' || event.id === 'rtsh' || event.id === 'legal-hack'
                  return (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      hoveredEvent={hoveredEvent}
                      setHoveredEvent={setHoveredEvent}
                      isFlagship={isFlagship}
                      onClick={() => {
                        if (event.id === 'legal-hack') {
                          router.push('/events/legal-hack')
                        } else if (event.id === 'rtsh') {
                          router.push('/events/rtsh')
                        } else if (event.id === 'rtss') {
                          router.push('/events/rtss')
                        }
                      }}
                    />
                  )
                })}
              </div>

              <ScrollIndicator sliderRef={sliderRef} scrollProgress={scrollProgress} />

              {/* Gradient Fade Edges */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#00002c]/50 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Special Events Section */}
          {false && (
            <div className="mb-20">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                  PUBLIC <span className="outline-text">Special</span> Events
                </h2>
                <p className="text-gray-400 text-lg">
                  Unique experiences and initiatives that make our community special
                </p>
              </div>

              <div className="relative">
                <div
                  ref={specialEventsSliderRef}
                  onMouseDown={handleSpecialEventsDrag.start}
                  onMouseUp={handleSpecialEventsDrag.end}
                  onMouseMove={handleSpecialEventsDrag.move}
                  onMouseLeave={handleSpecialEventsDrag.end}
                  className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2 cursor-grab active:cursor-grabbing"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {specialEvents.map((event, index) => (
                    <SpecialEventCard
                      key={event.id}
                      event={event}
                      index={index}
                    />
                  ))}
                </div>

                <ScrollIndicator sliderRef={specialEventsSliderRef} scrollProgress={specialEventsScrollProgress} />

                {/* Gradient Fade Edges */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#00002c]/50 to-transparent pointer-events-none"></div>
              </div>
            </div>
          )}

          {/* Member Exclusive Events Section */}
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a3e] via-[#00002c] to-[#0d0d1f] border-2 border-[#d0006f]/50 shadow-2xl shadow-[#d0006f]/20">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d0006f]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d0006f]/5 rounded-full blur-3xl"></div>

              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Left Side - Content */}
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d0006f]/20 border border-[#d0006f]/40 rounded-full mb-4">
                      <svg className="w-4 h-4 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-[#d0006f] font-bold text-xs tracking-widest uppercase">Members Only</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      What to shape the Eco-System? 
                      {/* Exclusive Member Events */}
                    </h2>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">
                      As a START Munich member, you get access to exclusive events including private dinners with successful founders, closed-door workshops with industry experts, peer feedback sessions, and intimate networking gatherings. These events are designed to provide maximum value and foster deep connections within our community.
                    </p>
                  </div>

                  {/* Right Side - CTA */}
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <Link
                      href="/members"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d0006f] to-pink-600 hover:from-[#d0006f] hover:to-[#d0006f] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d0006f]/50 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                      <span className="relative">Our Members Journey</span>
                      <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Past Events Calendar Section */}
          <div className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                PAST EVENTS
              </h2>
              <p className="text-gray-400 text-lg">
                Check out the amazing events we've hosted in the past!
              </p>
            </div>

            <PastEventsGrid />
          </div>

        </div>
      </main>
    </>
  )
}
