"use client"

import { useState, useEffect } from 'react'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

interface TimelineEvent {
  id: string
  title: string
  description: string
  icon: string
  image: string
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
    image: placeholderImage,
    details: ["Apply for summer or winter semester", "Written application + 2 interviews", "Selecting highly motivated and performing individuals"]
  },
  {
    id: "start-sprint",
    title: "Start Sprint",
    description: "Intensive onboarding program where you meet the team, learn about START Munich, and connect with other members.",
    icon: "🚀",
    image: placeholderImage,
    details: ["Get to know the basics for founding a company or prove your knowledge", "First month after being selected", "One month full of trainings and talks with professors, professionals, and VCs", "Pitch events at the end of the sprint, showing which teams learned the most"]
  },
  {
    id: "department-selection",
    title: "Department Selection",
    description: "Choose your department and get involved in active project teams within START Munich.",
    icon: "🎯",
    image: placeholderImage,
    details: ["After the sprint choose between the 5 departments", "Explore department options further down", "Choose a department where you can grow and support START"]
  },
  {
    id: "exchange-trip",
    title: "Community Program",
    description: "Enjoy the benefits of being a Stratie and expand your network through exclusive opportunities.",
    icon: "🌍",
    image: placeholderImage,
    details: ["Go on a trip to SF and visit some of our startups", "Write your thesis with our research partner Cambridge", "Get in touch with well-known VCs", "Many more exclusive benefits"]
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
    title: "Monthly",
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

  const eventImages = startEvents.flatMap((event) =>
    event.images.map((img) => ({ src: img, title: event.title }))
  )

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
        <div className="relative w-full overflow-hidden h-[600px]">
          {/* Background Image + Overlay */}
          <div className="absolute inset-0 h-full">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              alt="Member Journey"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 h-full bg-brand-dark-blue/60"></div>
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
                Experience your first two semesters as an active START Munich member
              </p>
            </div>
          </div>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
          
          {/* Member Journey Timeline Section */}
          <div className="mb-40">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                YOUR <span className="outline-text">MEMBER JOURNEY</span>
              </h2>
              <p className="text-gray-400 text-lg">
                The 5 milestones of your first two semesters at START Munich
              </p>
            </div>

            {/* Vertical Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 sm:left-10 md:left-12 top-0 bottom-0 w-[10px] bg-[#1b1f3f]"></div>

              {/* Timeline Events */}
              <div className="space-y-8 md:space-y-10">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative pl-40 md:pl-48">
                    {/* Timeline Dot + Headline */}
                    <div className="absolute left-0 top-2 flex flex-col items-center w-32">
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#1b1f3f]/40 rounded-full"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-[#1f2345] to-[#2d325f] rounded-full flex items-center justify-center border-4 border-brand-dark-blue text-2xl shadow-lg shadow-[#0f122f]/50">
                          {event.icon}
                        </div>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white leading-tight text-center">
                        {event.title}
                      </div>
                    </div>

                    {/* Event Card */}
                      <div className="bg-white/5 border border-white/10 overflow-hidden">
                        <div className="flex items-stretch gap-0">
                        <img
                          src={event.image}
                          alt={event.title}
                            className="w-40 md:w-48 lg:w-56 object-cover border-r border-white/10 flex-shrink-0"
                        />
                        <div className="flex-1 p-5">
                          <h3 className="text-2xl font-bold text-white mb-1">{event.title}</h3>
                          <p className="text-sm text-brand-pink font-semibold">Milestone {index + 1}</p>
                          <p className="text-gray-300 leading-relaxed mt-2">{event.description}</p>
                          
                          {/* Details List */}
                          <ul className="mt-3 space-y-1.5">
                            {event.details.map((detail, i) => (
                              <li key={i} className="text-sm text-gray-400 flex items-start">
                                <span className="text-brand-pink mr-2">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Departments Section */}
          <div className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                START MUNICH <span className="outline-text">DEPARTMENTS</span>
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
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20"
                >
                  {/* Header with gradient (uniform brand colors) */}
                  <div className="bg-brand-secondary-blue p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-3">{dept.icon}</div>
                      <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">{dept.description}</p>

                    <div className="space-y-2">
                      <p className="text-xs text-pink-400 font-semibold">Key Responsibilities:</p>
                      {dept.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0"></div>
                          <span className="text-xs text-gray-400">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1f2345] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Events Section */}
          <div className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                START MUNICH <span className="outline-text">INTERNAL EVENTS</span>
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
                    <div key={event.id} className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0 last:pb-0">
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
                  <div className="flex items-start gap-4 pt-2">
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

              {/* Rotating single image */}
              <div className="bg-white/5 border border-white/10 h-full min-h-[500px] relative overflow-hidden">
                {eventImages.length > 0 && (
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
                )}
              </div>
            </div>
          </div>

          {/* Member Stories Section */}
          <div className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                <span className="outline-text">MEMBER STORIES</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Real stories from our members who built successful startups with START Munich
              </p>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberStories.map((story) => (
                <div
                  key={story.id}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-pink overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#0f122f]/30"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Member Info */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white mb-1">{story.name}</h3>
                      <p className="text-sm text-brand-pink font-semibold mb-1">{story.role}</p>
                      <p className="text-xs text-gray-400">{story.company}</p>
                    </div>

                    {/* Story */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-4 pt-4 border-t border-white/10">
                      {story.story}
                    </p>

                    {/* Quote */}
                    <blockquote className="border-l-2 border-brand-pink pl-4 py-2">
                      <p className="text-sm italic text-gray-400">"{story.quote}"</p>
                    </blockquote>
                  </div>

                  {/* Hover effect accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1f2345] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          </div>

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

{/* Global styles for image fade animation */}
<style jsx global>{`
  .fade-swap {
    animation: fadeSwap 0.8s ease-in-out;
  }
  @keyframes fadeSwap {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`}</style>