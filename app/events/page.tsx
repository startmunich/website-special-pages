"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Script from "next/script"

export const dynamic = 'force-dynamic'

interface RecurringEvent {
  id: string
  name: string
  description: string
  month: string
  frequency: string
  icon: string
  color: string
  image: string
  category: string
}

const recurringEvents: RecurringEvent[] = [
  {
    id: "rtss",
    name: "Road to START Summit (RTSS)",
    description: "Our flagship pitch event where aspiring founders present their startup ideas to a panel of investors, entrepreneurs, and industry experts.",
    month: "October",
    frequency: "Once per year",
    icon: "presentation",
    color: "#d0006f",
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
    color: "#ff6b9d",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    category: "Hackathon"
  },
  {
    id: "info-event",
    name: "Info Event",
    description: "Join us at the start of each semester to learn about START Munich, meet our community, and discover how you can get involved.",
    month: "October & April",
    frequency: "Once per semester",
    icon: "info",
    color: "#4a90e2",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop",
    category: "Info Event"
  },
  {
    id: "fail-tales",
    name: "Founder Fail Tales",
    description: "Real stories from real founders about their biggest failures and lessons learned.",
    month: "October & April",
    frequency: "Once per semester",
    icon: "stories",
    color: "#e91e63",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
    category: "Founder Event"
  },
  {
    id: "pitch-network",
    name: "PITCH & NETWORK",
    description: "Practice your pitch, get feedback from experienced entrepreneurs, and network with fellow founders in an intimate setting.",
    month: "January & June",
    frequency: "Once per semester",
    icon: "presentation",
    color: "#ff1744",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
    category: "Pitch Event"
  }
]

export default function EventsPage() {
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [, forceUpdate] = useState({})

  useEffect(() => {
    setLoading(false)
  }, [])

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
    
    // Force initial update after mount
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
        <div className="relative w-full overflow-hidden h-[650px]">
          {/* Background Image + Overlay */}
          <div className="absolute inset-0 h-full">
            <img
              src="/hero-image.jpg"
              alt="START Munich Events"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 h-full bg-[#00002c]/60"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 h-full flex items-center">
            <div className="flex-1 max-w-2xl text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 animate-[flyInFromTop_0.6s_ease-out]">
                START MUNICH
                <br />
                <span className="outline-text">EVENTS</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Connect, learn, and grow with Munich's most vibrant student entrepreneur community through our curated events
              </p>
            </div>
          </div>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">

          {/* Recurring Events Section */}
          <div className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                PUBLIC ANNUAL EVENTS
              </h2>
              <p className="text-gray-400 text-lg">
                Mark your calendars! These are our flagship events that happen throughout the year.
              </p>
            </div>

            {/* Timeline Visualization */}
            <div className="mb-12 relative bg-white/5 rounded-2xl p-6 md:p-10 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Event Timeline</h3>
              
              {/* Months */}
              <div className="hidden md:grid grid-cols-12 gap-2 mb-6 text-center">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                  <div key={month} className="text-sm text-gray-300 font-bold">
                    {month}
                  </div>
                ))}
              </div>

              {/* Timeline Line - Desktop */}
              <div className="relative h-3 bg-white/10 rounded-full mb-20 mt-16 hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d0006f] via-pink-500 to-[#d0006f] opacity-40 rounded-full"></div>
                
                {/* Month Dividers */}
                {[...Array(11)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white/30"
                    style={{ left: `${(i + 1) * 8.33}%` }}
                  ></div>
                ))}
                
                {/* Event Markers */}
                {/* PITCH & NETWORK - January */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '4.2%' }}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#ff1744] rounded-full"></div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#ff1744]/90 px-3 py-1.5 rounded-lg">
                        <p className="text-xs text-white font-bold">PITCH</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Event - April */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '29.2%' }}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#4a90e2] rounded-full"></div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#4a90e2]/90 px-3 py-1.5 rounded-lg">
                        <p className="text-xs text-white font-bold">Info Event</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fail Tales - April */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '37.5%' }}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#e91e63] rounded-full"></div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#e91e63]/90 px-3 py-1.5 rounded-lg">
                        <p className="text-xs text-white font-bold">Fail Tales</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PITCH & NETWORK - June */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '45.8%' }}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#ff1744] rounded-full"></div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#ff1744]/90 px-3 py-1.5 rounded-lg">
                        <p className="text-xs text-white font-bold">PITCH</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Event - October */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '79.2%' }}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#4a90e2] rounded-full"></div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#4a90e2]/90 px-3 py-1.5 rounded-lg">
                        <p className="text-xs text-white font-bold">Info Event</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fail Tales - October */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '87.5%' }}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#e91e63] rounded-full"></div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#e91e63]/90 px-3 py-1.5 rounded-lg">
                        <p className="text-xs text-white font-bold">Fall Tales</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RTSS - October/November */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '91.7%' }}>
                  <div className="relative">
                    <div className="w-6 h-6 bg-[#d0006f] rounded-full"></div>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#d0006f] px-4 py-2 rounded-lg">
                        <p className="text-sm text-white font-bold">RTSS</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RTSH - November */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: '95.8%' }}>
                  <div className="relative">
                    <div className="w-6 h-6 bg-[#d0006f] rounded-full"></div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#d0006f] px-4 py-2 rounded-lg">
                        <p className="text-sm text-white font-bold">RTSH</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Timeline - Enhanced */}
              <div className="md:hidden space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 text-gray-300 text-sm font-bold">JAN</div>
                  </div>
                  <div className="ml-3 pl-4 border-l-2 border-[#ff1744] space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#ff1744] rounded-full"></div>
                      <span className="text-sm text-white font-semibold">PITCH & NETWORK</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 text-gray-300 text-sm font-bold">APR</div>
                  </div>
                  <div className="ml-3 pl-4 border-l-2 border-[#4a90e2] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#4a90e2] rounded-full"></div>
                      <span className="text-sm text-white font-semibold">Info Event</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#e91e63] rounded-full"></div>
                      <span className="text-sm text-white font-semibold">Fail Tales</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 text-gray-300 text-sm font-bold">JUN</div>
                  </div>
                  <div className="ml-3 pl-4 border-l-2 border-[#ff1744] space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#ff1744] rounded-full"></div>
                      <span className="text-sm text-white font-semibold">PITCH & NETWORK</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 text-gray-300 text-sm font-bold">OCT</div>
                  </div>
                  <div className="ml-3 pl-4 border-l-2 border-[#d0006f] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#4a90e2] rounded-full"></div>
                      <span className="text-sm text-white font-semibold">Info Event</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#e91e63] rounded-full"></div>
                      <span className="text-sm text-white font-semibold">Fail Tales</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#d0006f] rounded-full"></div>
                      <span className="text-sm text-white font-bold">RTSS</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 text-gray-300 text-sm font-bold">NOV</div>
                  </div>
                  <div className="ml-3 pl-4 border-l-2 border-[#d0006f] space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#d0006f] rounded-full"></div>
                      <span className="text-sm text-white font-bold">Road to START Hack</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Slider */}
            <div className="relative">
              {/* Slider Container */}
              <div 
                ref={sliderRef}
                onMouseDown={handleDrag.start}
                onMouseUp={handleDrag.end}
                onMouseMove={handleDrag.move}
                onMouseLeave={handleDrag.end}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2 cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {recurringEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 w-[90%] sm:w-[450px] group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Event Image */}
                  <div className="relative h-80 w-full overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-4 py-2 rounded-lg bg-[#d0006f] backdrop-blur-sm">
                        <p className="text-xs text-white uppercase tracking-wide font-bold">
                          {event.category}
                        </p>
                      </div>
                    </div>

                    {/* Frequency Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-4 py-2 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                        <p className="text-sm text-white uppercase tracking-wide font-semibold">
                          {event.frequency}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {event.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-base font-semibold text-[#d0006f]">
                        {event.month}
                      </span>
                    </div>

                    <p className="text-base text-gray-400 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Hover effect accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
              </div>

              {/* Scroll Indicator */}
              <div className="relative h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-[#d0006f] to-pink-500 rounded-full transition-all duration-200"
                  style={{
                    width: `${sliderRef.current ? (sliderRef.current.clientWidth / sliderRef.current.scrollWidth) * 100 : 30}%`,
                    left: `${sliderRef.current ? scrollProgress * (1 - sliderRef.current.clientWidth / sliderRef.current.scrollWidth) : 0}%`
                  }}
                />
              </div>

              {/* Gradient Fade Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#00002c]/50 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#00002c]/50 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Special Events Section */}
          <div className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                SPECIAL EVENTS
              </h2>
              <p className="text-gray-400 text-lg">
                Unique experiences and initiatives that make our community special
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* START Lab */}
              <div className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20">
                {/* Event Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop" 
                    alt="START Lab"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 rounded-lg bg-[#d0006f] backdrop-blur-sm">
                      <p className="text-xs text-white uppercase tracking-wide font-bold">
                        Hackathon
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    START Lab
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    An intensive program where startups work on solving real challenges with expert mentorship, resources, and a structured approach to innovation and growth.
                  </p>
                </div>

                {/* Hover effect accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>

              {/* START Legal Hack */}
              <div className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20">
                {/* Event Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" 
                    alt="START Legal Hack"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 rounded-lg bg-[#d0006f] backdrop-blur-sm">
                      <p className="text-xs text-white uppercase tracking-wide font-bold">
                        Hackathon
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    START Legal Hack
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    A unique hackathon focused on building legal tech solutions that address real challenges in the legal industry, combining technology with regulatory expertise.
                  </p>
                </div>

                {/* Hover effect accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>

              {/* Isar Unfiltered */}
              <div className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20">
                {/* Event Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop" 
                    alt="Isar Unfiltered"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 rounded-lg bg-[#d0006f] backdrop-blur-sm">
                      <p className="text-xs text-white uppercase tracking-wide font-bold">
                        Founder Event
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Isar Unfiltered
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    Raw, honest conversations with founders and entrepreneurs about the realities of building companies. No sugar-coating, just authentic stories and lessons learned.
                  </p>
                </div>

                {/* Hover effect accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          </div>

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

            <div className="relative rounded-2xl overflow-hidden border-2 border-[#d0006f]/30 bg-white/5 p-4 md:p-8">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d0006f]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d0006f]/5 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <iframe
                  src="https://luma.com/embed/calendar/cal-1MxD65bgV0Hcb0r/events"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                  className="bg-white rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>

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
                      Exclusive Member Events
                    </h2>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      As a START Munich member, you get access to exclusive events including private dinners with successful founders, closed-door workshops with industry experts, peer feedback sessions, and intimate networking gatherings. These events are designed to provide maximum value and foster deep connections within our community.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#d0006f]/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Private Networking</h4>
                          <p className="text-sm text-gray-400">Connect with fellow founders in intimate settings</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#d0006f]/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Expert Workshops</h4>
                          <p className="text-sm text-gray-400">Learn from industry leaders and practitioners</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#d0006f]/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Feedback Sessions</h4>
                          <p className="text-sm text-gray-400">Get valuable insights on your startup journey</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#d0006f]/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Startup Resources</h4>
                          <p className="text-sm text-gray-400">Access tools, templates, and expert advice</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - CTA */}
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <Link
                      href="/members"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d0006f] to-pink-600 hover:from-[#d0006f] hover:to-[#d0006f] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d0006f]/50 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                      <span className="relative">Meet Our Members</span>
                      <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <p className="text-sm text-gray-400 mt-4">
                      Learn more about our community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
