"use client"

import { useState, useRef, useEffect } from 'react'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

interface JourneyPhase {
  id: string
  title: string
  description: string
  month: string
  icon: string
  image: string
  category: string
  details: string[]
}

interface MembershipTier {
  id: string
  name: string
  description: string
  benefits: string[]
  image: string
}

const journeyPhases: JourneyPhase[] = [
  {
    id: "awareness",
    title: "Awareness",
    description: "Discover START Munich and learn about our community through info events and social media.",
    month: "Anytime",
    icon: "info",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    category: "Getting Started",
    details: ["Info sessions", "Social media", "Campus events", "Networking"]
  },
  {
    id: "joining",
    title: "Joining",
    description: "Apply to JOIN START Munich and become part of our exclusive member community.",
    month: "Ongoing",
    icon: "presentation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    category: "Membership",
    details: ["Application process", "Interview", "Onboarding", "Welcome event"]
  },
  {
    id: "learning",
    title: "Learning & Development",
    description: "Access workshops, mentorship, and resources to develop your entrepreneurial skills.",
    month: "Weekly",
    icon: "code",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    category: "Growth",
    details: ["Workshops", "Mentorship", "Resources", "Skill building"]
  },
  {
    id: "networking",
    title: "Networking",
    description: "Connect with fellow founders, investors, and industry experts in our community.",
    month: "Ongoing",
    icon: "presentation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    category: "Community",
    details: ["Member events", "Panel discussions", "Investor meetings", "Peer groups"]
  },
  {
    id: "building",
    title: "Building & Executing",
    description: "Launch your startup with support from our network and resources.",
    month: "Ongoing",
    icon: "code",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    category: "Action",
    details: ["Acceleration programs", "Funding support", "Technical resources", "Advisory network"]
  },
  {
    id: "scaling",
    title: "Scaling & Growth",
    description: "Take your startup to the next level with advanced mentorship and funding opportunities.",
    month: "Ongoing",
    icon: "presentation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    category: "Success",
    details: ["Growth strategies", "Series funding", "Market expansion", "Strategic partnerships"]
  }
]

const membershipTiers: MembershipTier[] = [
  {
    id: "supporter",
    name: "Supporter",
    description: "Perfect for those who want to learn about entrepreneurship and support the community.",
    benefits: [
      "Access to all public events",
      "Monthly newsletter",
      "Community Discord access",
      "Networking opportunities",
      "Resource library"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "member",
    name: "Member",
    description: "Our core membership for active entrepreneurs and startup founders.",
    benefits: [
      "Everything in Supporter",
      "Member-only events",
      "Mentorship matching",
      "Funding resources",
      "Startup tools & discounts",
      "Priority event access"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "fellow",
    name: "Fellow",
    description: "Premium membership for accepted founders with active startups.",
    benefits: [
      "Everything in Member",
      "Dedicated mentor",
      "Funding network access",
      "Private advisor sessions",
      "Venture partnership",
      "Capital introduction network"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  }
]

const TimelineMarker = ({ 
  eventId, 
  left, 
  color, 
  label, 
  position, 
  hoveredEvent, 
  onHover, 
  onLeave 
}: {
  eventId: string
  left: string
  color: string
  label: string
  position: 'top' | 'bottom'
  hoveredEvent: string | null
  onHover: (id: string) => void
  onLeave: () => void
}) => {
  const isHovered = hoveredEvent === eventId

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
      style={{ left }}
      onMouseEnter={() => onHover(eventId)}
      onMouseLeave={onLeave}
    >
      {/* Label */}
      <div className={`absolute whitespace-nowrap text-xs font-semibold text-white bg-gray-900 px-3 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity ${
        position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
      }`}>
        {label}
      </div>

      {/* Dot */}
      <div
        className={`w-4 h-4 rounded-full border-2 border-white transition-all ${
          isHovered ? 'scale-150 shadow-lg' : 'scale-100'
        }`}
        style={{
          backgroundColor: isHovered ? color : 'transparent',
          borderColor: color,
          boxShadow: isHovered ? `0 0 12px ${color}` : 'none'
        }}
      ></div>
    </div>
  )
}

const PhaseCard = ({ 
  phase, 
  index, 
  hoveredEvent, 
  setHoveredEvent 
}: {
  phase: JourneyPhase
  index: number
  hoveredEvent: string | null
  setHoveredEvent: (id: string | null) => void
}) => {
  return (
    <div
      className="flex-shrink-0 w-80 group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20"
      onMouseEnter={() => setHoveredEvent(phase.id)}
      onMouseLeave={() => setHoveredEvent(null)}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={phase.image}
          alt={phase.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>

        {/* Phase Number */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-[#d0006f]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#d0006f]">
          <span className="text-white font-bold text-sm">{index + 1}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
        <p className="text-xs text-[#d0006f] font-semibold mb-3">{phase.category}</p>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">{phase.description}</p>

        {/* Details */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          {phase.details.map((detail, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-[#d0006f] rounded-full"></div>
              {detail}
            </div>
          ))}
        </div>
      </div>

      {/* Hover effect accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}

const MembershipCard = ({ tier, index }: { tier: MembershipTier; index: number }) => {
  const isMiddle = index === 1

  return (
    <div
      className={`flex-shrink-0 w-96 group relative bg-white/5 hover:bg-white/10 border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isMiddle
          ? 'border-[#d0006f] hover:border-[#d0006f] shadow-lg shadow-[#d0006f]/30 hover:shadow-[#d0006f]/40'
          : 'border-white/10 hover:border-[#d0006f] hover:shadow-[#d0006f]/20'
      }`}
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={tier.image}
          alt={tier.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>

        {/* Badge */}
        {isMiddle && (
          <div className="absolute top-4 right-4 bg-[#d0006f] text-white px-3 py-1 rounded-full text-xs font-bold">
            POPULAR
          </div>
        )}

        {/* Title */}
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm text-gray-300 leading-relaxed mb-6">{tier.description}</p>

        {/* Benefits */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          {tier.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#d0006f] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover effect accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}

const ScrollIndicator = ({ 
  sliderRef, 
  scrollProgress 
}: { 
  sliderRef: React.RefObject<HTMLDivElement>
  scrollProgress: number 
}) => {
  return (
    <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#d0006f] to-pink-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  )
}

export default function MemberJourneyPage() {
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const membershipSliderRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })
  const membershipDragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [membershipScrollProgress, setMembershipScrollProgress] = useState(0)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

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
    setTimeout(updateScroll, 100)

    return () => slider.removeEventListener('scroll', updateScroll)
  }, [loading])

  useEffect(() => {
    const slider = membershipSliderRef.current
    if (!slider || loading) return

    const updateScroll = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth
      const progress = maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0
      setMembershipScrollProgress(progress)
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

  const handleMembershipDrag = {
    start: (e: React.MouseEvent) => {
      const slider = membershipSliderRef.current
      if (!slider) return
      membershipDragState.current = {
        isDragging: true,
        startX: e.pageX - slider.offsetLeft,
        scrollLeft: slider.scrollLeft
      }
    },
    move: (e: React.MouseEvent) => {
      if (!membershipDragState.current.isDragging || !membershipSliderRef.current) return
      e.preventDefault()
      const x = e.pageX - membershipSliderRef.current.offsetLeft
      membershipSliderRef.current.scrollLeft = membershipDragState.current.scrollLeft - (x - membershipDragState.current.startX) * 2
    },
    end: () => {
      membershipDragState.current.isDragging = false
    }
  }

  const calculateTimelinePosition = (phaseIndex: number): string => {
    // Distribute phases evenly across the timeline
    const totalPhases = journeyPhases.length
    const position = ((phaseIndex + 0.5) / totalPhases) * 100
    return `${position.toFixed(2)}%`
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
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

      <main className="min-h-screen bg-[#00002c]">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden h-[600px]">
          {/* Background Image + Overlay */}
          <div className="absolute inset-0 h-full">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              alt="Member Journey"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 h-full bg-[#00002c]/60"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 h-full flex items-center">
            <div className="flex-1 max-w-2xl text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 animate-[flyInFromTop_0.6s_ease-out]">
                YOUR START MUNICH
                <br />
                <span className="outline-text">JOURNEY</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                From first awareness to building your successful startup, we guide you through every step of your entrepreneurial journey
              </p>
            </div>
          </div>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
          
          {/* Journey Phases Section */}
          <div className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                YOUR <span className="outline-text">6-PHASE</span> JOURNEY
              </h2>
              <p className="text-gray-400 text-lg">
                Learn how to progress through your entrepreneurial journey with START Munich
              </p>
            </div>

            {/* Timeline Visualization */}
            <div className="mb-12 relative bg-white/5 rounded-2xl p-6 md:p-10 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Journey Timeline</h3>
              
              {/* Timeline Line */}
              <div className="relative h-3 bg-white/10 rounded-full mb-20 mt-16 hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d0006f] via-pink-500 to-[#d0006f] opacity-40 rounded-full"></div>
                
                {/* Phase Markers */}
                {journeyPhases.map((phase, index) => (
                  <TimelineMarker
                    key={phase.id}
                    eventId={phase.id}
                    left={calculateTimelinePosition(index)}
                    color="#d0006f"
                    label={phase.title}
                    position={index % 2 === 0 ? 'top' : 'bottom'}
                    hoveredEvent={hoveredEvent}
                    onHover={setHoveredEvent}
                    onLeave={() => setHoveredEvent(null)}
                  />
                ))}
              </div>

              {/* Mobile Timeline - Simplified */}
              <div className="md:hidden space-y-3">
                {journeyPhases.map((phase, index) => (
                  <div key={phase.id} className="flex items-center gap-3">
                    <div className="w-12 text-gray-400 text-xs font-semibold">
                      Phase {index + 1}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#d0006f] rounded-full"></div>
                      <span className="text-xs text-white">{phase.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phases Slider */}
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
                {journeyPhases.map((phase, index) => (
                  <PhaseCard
                    key={phase.id}
                    phase={phase}
                    index={index}
                    hoveredEvent={hoveredEvent}
                    setHoveredEvent={setHoveredEvent}
                  />
                ))}
              </div>

              <ScrollIndicator sliderRef={sliderRef} scrollProgress={scrollProgress} />

              {/* Gradient Fade Edges */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#00002c]/50 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Membership Tiers Section */}
          <div className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                MEMBERSHIP <span className="outline-text">TIERS</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Choose the membership level that best fits your entrepreneurial journey
              </p>
            </div>

            <div className="relative">
              <div 
                ref={membershipSliderRef}
                onMouseDown={handleMembershipDrag.start}
                onMouseUp={handleMembershipDrag.end}
                onMouseMove={handleMembershipDrag.move}
                onMouseLeave={handleMembershipDrag.end}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2 cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {membershipTiers.map((tier, index) => (
                  <MembershipCard
                    key={tier.id}
                    tier={tier}
                    index={index}
                  />
                ))}
              </div>

              <ScrollIndicator sliderRef={membershipSliderRef} scrollProgress={membershipScrollProgress} />

              {/* Gradient Fade Edges */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#00002c]/50 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a3e] via-[#00002c] to-[#0d0d1f] border-2 border-[#d0006f]/50 shadow-2xl shadow-[#d0006f]/20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d0006f]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d0006f]/5 rounded-full blur-3xl"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col items-center gap-8 text-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                    Ready to Join?
                  </h3>
                  <p className="text-lg text-gray-300 max-w-2xl">
                    Start your entrepreneurial journey with START Munich today. Apply to become a member and get access to our exclusive events, mentorship, and resources.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="px-8 py-3 bg-[#d0006f] hover:bg-[#d0006f]/90 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/50">
                    Apply Now
                  </button>
                  <button className="px-8 py-3 border border-[#d0006f] text-[#d0006f] hover:bg-[#d0006f]/10 font-bold rounded-lg transition-all duration-300">
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