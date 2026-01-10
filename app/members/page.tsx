"use client"

import { useState, useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Script from "next/script"

export const dynamic = 'force-dynamic'

interface Member {
  id: number
  name: string
  batch: string
  role: string
  study?: string
  company?: string
  linkedinUrl?: string
  imageUrl: string
  bio?: string
  expertise?: string[]
  achievements?: string
  gender?: string
}

interface Batch {
  name: string
  semester: string
  year: string
  groupImageUrl: string
  memberCount: number
}

// Fetch members from API
async function fetchMembers(): Promise<Member[]> {
  try {
    const response = await fetch('/api/members');
    if (!response.ok) throw new Error('Failed to fetch members');
    return await response.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Animation states for numbers
  const [animatedMembers, setAnimatedMembers] = useState(0)
  const [animatedAlumni, setAnimatedAlumni] = useState(0)
  const hasAnimatedRef = useRef(false)
  const membersGridRef = useRef<HTMLDivElement>(null)

  // Load members on mount
  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true)
      const data = await fetchMembers()
      setMembers(data)
      setLoading(false)
    }
    loadMembers()
  }, [])

  // Extract unique batches
  const allBatches = Array.from(
    new Set(members.map(member => member.batch))
  ).filter(batch => batch).sort().reverse()

  // Extract unique study subjects
  const allStudies = Array.from(
    new Set(members.map(member => member.study).filter((study): study is string => !!study))
  ).sort()

  // Calculate analytics
  const totalMembers = members.length
  const maleMembers = members.filter(m => m.gender?.toLowerCase() === 'male').length
  const femaleMembers = members.filter(m => m.gender?.toLowerCase() === 'female').length
  const malePercentage = totalMembers > 0 ? Math.round((maleMembers / totalMembers) * 100) : 0
  const femalePercentage = totalMembers > 0 ? Math.round((femaleMembers / totalMembers) * 100) : 0

  // Study topics distribution
  const studyDistribution = members.reduce((acc, member) => {
    if (member.study) {
      acc[member.study] = (acc[member.study] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const topStudies = Object.entries(studyDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([study, count]) => ({
      study,
      count,
      percentage: Math.round((count / totalMembers) * 100)
    }))

  // Group members by batch for batch cards
  const batchGroups = allBatches.map(batchName => {
    const batchMembers = members.filter(m => m.batch === batchName)
    return {
      name: batchName,
      semester: batchName.split(' ')[0] || 'Batch',
      year: batchName.split(' ')[1] || '',
      groupImageUrl: '/batch.jpeg',
      memberCount: batchMembers.length
    }
  })

  // Sort batches by year (newest first), then by semester
  const sortedBatches = batchGroups.sort((a, b) => {
    const yearDiff = parseInt(b.year) - parseInt(a.year)
    if (yearDiff !== 0) return yearDiff
    // If same year, Winter comes before Summer
    if (a.semester.toLowerCase().includes('winter') || a.semester.toLowerCase().startsWith('w')) return -1
    if (b.semester.toLowerCase().includes('winter') || b.semester.toLowerCase().startsWith('w')) return 1
    return 0
  })

  // No filtering needed anymore, show all members in batches

  // Animate numbers on component mount (members + alumni)
  useEffect(() => {
    if (!loading && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true

      // Mock alumni count (as requested)
      const alumniCount = 800

      let membersCurrent = 0
      let alumniCurrent = 0

      const duration = 1500
      const steps = 60
      const interval = duration / steps

      const membersIncrement = (totalMembers || 0) / steps
      const alumniIncrement = alumniCount / steps

      let step = 0

      const timer = setInterval(() => {
        step++

        membersCurrent += membersIncrement
        alumniCurrent += alumniIncrement

        if (step >= steps) {
          setAnimatedMembers(totalMembers)
          setAnimatedAlumni(alumniCount)
          clearInterval(timer)
        } else {
          setAnimatedMembers(membersCurrent)
          setAnimatedAlumni(alumniCurrent)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [loading, totalMembers])

  if (loading) {
    return (
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-[#00002c]">Loading members...</p>
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
        {/* Hero Section with Full-Width Image */}
        <div className="relative w-full overflow-hidden h-[650px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/member-background.png"
              alt="START Munich Community"
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#00002c]/60"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 h-full flex items-center">
            <div className="flex items-center justify-between gap-12">
              {/* Left Side - Heading */}
              <div className="flex-1 max-w-2xl">
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d0006f]/20 border border-[#d0006f]/40 rounded-full mb-6 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-[#d0006f] rounded-full animate-pulse"></div>
                  <p className="text-[#d0006f] font-semibold text-xs tracking-widest uppercase">OUR COMMUNITY</p>
                </div> */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 animate-[flyInFromTop_0.6s_ease-out]">
                  START MUNICH
                  <br />
                  <span className="outline-text">MEMBERS</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Meet the ambitious student entrepreneurs building the future of technology and innovation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Join Our Community CTA
          <div className="mb-16 relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d0006f]/20 via-[#00002c] to-[#d0006f]/10 border border-[#d0006f]/30 p-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d0006f]/20 via-transparent to-[#d0006f]/20 animate-pulse"></div>
              
              <div className="relative bg-[#00002c] rounded-xl p-8 md:p-12">
                <div className="absolute top-10 right-10 w-32 h-32 bg-[#d0006f]/30 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#d0006f]/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d0006f]/20 border border-[#d0006f]/40 rounded-full mb-4">
                      <div className="w-2 h-2 bg-[#d0006f] rounded-full animate-pulse"></div>
                      <span className="text-[#d0006f] font-bold text-xs tracking-widest uppercase">Applications Open</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                      Become Part of{" "}
                      <span className="no-stroke bg-gradient-to-r from-[#d0006f] via-pink-400 to-[#d0006f] bg-clip-text text-transparent animate-pulse">
                        Our Community
                      </span>
                    </h2>
                    
                    <p className="text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
                      Join Munich's most vibrant student entrepreneur community and build your startup with like-minded founders.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <a
                      href="https://www.startmunich.de/apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d0006f] to-pink-600 hover:from-[#d0006f] hover:to-[#d0006f] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d0006f]/50 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                      <span className="relative">Apply Now</span>
                      <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Analytics Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              Community Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Active Members */}
              <div className="group relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/20 hover:border-[#d0006f] transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/20">

                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-[#d0006f]/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">{totalMembers}</p>
                    <p className="text-sm text-gray-400 font-medium">Active Members</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ffd1e6]/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M12 12a5 5 0 100-10 5 5 0 000 10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">{Math.floor(animatedAlumni)}</p>
                    <p className="text-sm text-gray-400 font-medium">Alumni</p>
                  </div>
                </div>
              </div>

              {/* Gender Distribution */}
              <div className="group relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/20 hover:border-[#d0006f] transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/20">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Gender Distribution</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Male</span>
                        <span className="text-sm font-bold text-white">{malePercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"
                          style={{ width: `${malePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Female</span>
                        <span className="text-sm font-bold text-white">{femalePercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-1000"
                          style={{ width: `${femalePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Topics Distribution */}
              <div className="group relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/20 hover:border-[#d0006f] transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Top Study Fields</p>
                </div>
                <div className="space-y-2">
                  {topStudies.map(({ study, count, percentage }, index) => (
                    <div key={study} className="flex items-center justify-between">
                      <span className="text-xs text-gray-300 truncate flex-1">{study}</span>
                      <span className="text-xs font-bold text-[#d0006f] ml-2">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Batch Images Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              Our Batches
            </h2>

            {/* Show expanded batch full width if selected */}
            {expandedBatch ? (
              <div>
                {sortedBatches.filter(b => b.name === expandedBatch).map((batch) => (
                  <div key={batch.name} className="space-y-0">
                    <h3 className="text-2xl md:text-3xl font-black text-white text-left">
                      {batch.name}
                    </h3>
                    <button
                      onClick={() => setExpandedBatch(null)}
                      className="w-full block group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20"
                    >
                      {/* Background Image - Large (80% viewport height) */}
                      <div className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden">
                        <img
                          src="/batch.jpeg"
                          alt={batch.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c]/40 via-[#00002c]/10 to-transparent"></div>
                      </div>

                      {/* Hover effect accent */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>

                    {/* Members Grid */}
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                        {members.filter(m => m.batch === batch.name).map((member) => (
                          <a
                            key={member.id}
                            href={member.linkedinUrl || '#'}
                            target={member.linkedinUrl ? "_blank" : undefined}
                            rel={member.linkedinUrl ? "noopener noreferrer" : undefined}
                            className={`group relative overflow-hidden transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg hover:scale-105 ${member.linkedinUrl ? 'cursor-pointer' : 'cursor-default'} z-10`}
                          >
                            <div>
                              <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#00002c]/40 via-[#00002c]/10 to-transparent"></div>

                              {member.linkedinUrl && (
                                <div className="absolute top-2 right-2">
                                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                  </div>
                                </div>
                              )}

                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <h4 className="font-bold text-white text-sm">{member.name}</h4>
                                <p className="text-pink-300 text-xs font-semibold">{member.study || member.role}</p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Show grid of batch thumbnails */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedBatches.map((batch) => (
                  <div key={batch.name} className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-black text-white">
                      {batch.name}
                    </h3>
                    <button
                      onClick={() => setExpandedBatch(batch.name)}
                      className="w-full group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20"
                    >
                      {/* Background Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src="/batch.jpeg"
                          alt={batch.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c]/40 via-[#00002c]/10 to-transparent"></div>
                      </div>

                      {/* Hover effect accent */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>        </div>
      </main>
    </>
  )
}
