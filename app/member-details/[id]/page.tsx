"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Script from "next/script"

interface Member {
  id: number
  name: string
  batch: string
  role: string
  company?: string
  linkedinUrl?: string
  imageUrl: string
  bio?: string
  expertise?: string[]
  achievements?: string
}

export default function MemberDetailPage() {
  const params = useParams()
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch('/api/members')
        if (!response.ok) throw new Error('Failed to fetch members')
        const members: Member[] = await response.json()
        const foundMember = members.find(m => m.id === parseInt(params.id as string))
        setMember(foundMember || null)
      } catch (error) {
        console.error('Error fetching member:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchMember()
    }
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-2xl font-bold text-white">Loading member details...</p>
        </div>
      </main>
    )
  }

  if (!member) {
    return (
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-2xl font-bold text-white mb-4">Member not found</p>
          <Link
            href="/members"
            className="inline-flex items-center gap-2 text-[#d0006f] hover:text-pink-400 transition-colors"
          >
            ← Back to Members
          </Link>
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

      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/members"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Members
          </Link>

          {/* Main Content Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-[#d0006f]/20 to-[#00002c] p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white/20">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-3 -right-3 flex items-center justify-center w-14 h-14 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all hover:scale-110"
                    >
                      <svg className="w-7 h-7 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Member Info */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d0006f]/20 border border-[#d0006f]/40 rounded-full mb-4">
                    <span className="text-[#d0006f] font-bold text-xs tracking-widest uppercase">{member.batch}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                    {member.name}
                  </h1>
                  
                  <p className="text-xl text-[#d0006f] font-semibold mb-4">
                    {member.role}
                  </p>

                  {member.company && (
                    <div className="flex items-center gap-2 text-gray-300 mb-6">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="font-medium">{member.company}</span>
                    </div>
                  )}

                  {/* Expertise Tags */}
                  {member.expertise && member.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-sm font-medium bg-white/10 text-white rounded-lg border border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {member.bio && (
              <div className="p-8 md:p-12 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {member.bio}
                </p>
              </div>
            )}

            {/* Achievements Section */}
            {member.achievements && (
              <div className="p-8 md:p-12 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">Achievements</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {member.achievements}
                </p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="inline-block p-8 bg-white/5 border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-3">
                Interested in connecting?
              </h2>
              <p className="text-gray-400 mb-6">
                Reach out through LinkedIn to learn more about their journey
              </p>
              {member.linkedinUrl ? (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077b5] hover:bg-[#006399] text-white font-semibold rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              ) : (
                <Link
                  href="/members"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20"
                >
                  View More Members
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
