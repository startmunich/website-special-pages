"use client"

import { useState, useEffect } from 'react'
import Script from 'next/script'
import Marquee from "react-fast-marquee";
import Hero from "@/components/Hero"
import HeroCard from "@/components/HeroCard"
import TestimonialsSection from '@/components/TestimonialsSection'

export const dynamic = 'force-dynamic'

interface Testimonial {
  id: string
  partnerName: string
  partnerLogo: string
  personName: string
  personRole: string
  personImage: string
  quote: string
  story: string
}

interface Partner {
  id: string
  name: string
  logoUrl: string
  featured?: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
}

// Fetch partners from API
async function fetchPartners(): Promise<Partner[]> {
  try {
    // Use absolute URL in production, relative in development
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/partners`, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch partners');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    partnerName: "Sequoia Capital",
    partnerLogo: "https://logo.clearbit.com/sequoiacap.com",
    personName: "Sarah Chen",
    personRole: "Partner",
    personImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
    story: "Working with START Munich has been incredibly rewarding. The quality of founders and their commitment to building meaningful companies sets them apart from other student organizations we've partnered with.",
    quote: "START Munich has consistently delivered exceptional founders. Their community's quality and entrepreneurial spirit are unmatched in the European ecosystem."
  },
  {
    id: "t2",
    partnerName: "Google",
    partnerLogo: "https://logo.clearbit.com/google.com",
    personName: "Michael Weber",
    personRole: "Startup Programs Lead",
    personImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
    story: "Our partnership with START Munich gives us access to Europe's brightest entrepreneurial talent. The workshops and mentorship sessions we've hosted have been some of our most engaging and impactful.",
    quote: "Partnering with START has given us direct access to innovative minds solving real problems. The caliber of projects and founders is world-class."
  },
  {
    id: "t3",
    partnerName: "UnternehmerTUM",
    partnerLogo: "https://logo.clearbit.com/unternehmertum.de",
    personName: "Anna Schmidt",
    personRole: "Director of Partnerships",
    personImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop",
    story: "The synergy between UnternehmerTUM and START Munich creates a powerful ecosystem for student founders. Their members consistently impress us with their professionalism and drive to succeed.",
    quote: "START members bring fresh perspectives and incredible drive. Our collaboration has led to successful incubations and meaningful innovation."
  }
]

const faqs: FAQ[] = [
  {
    id: "faq1",
    question: "What are the partnership tiers?",
    answer: "We offer three partnership levels: Gold (€15,000/year), Silver (€10,000/year), and Bronze (€5,000/year). Each tier includes different benefits like event sponsorships, recruiting access, and brand visibility."
  },
  {
    id: "faq2",
    question: "How can we recruit START members?",
    answer: "Partners get exclusive access to our talent pool through dedicated recruiting events, direct CV database access, and priority placement in our job board. You can also host office tours and info sessions."
  },
  {
    id: "faq3",
    question: "What events can partners sponsor?",
    answer: "Partners can sponsor our flagship events including the Annual Pitch Competition, Startup Week, monthly workshops, networking nights, and our international conference. Custom event collaboration is also possible."
  },
  {
    id: "faq4",
    question: "Can partners mentor our founders?",
    answer: "Absolutely! We encourage partners to provide mentorship through our structured mentorship program, office hours, and workshop sessions. This is one of the most impactful ways to engage with our community."
  },
  {
    id: "faq5",
    question: "What is the partnership duration?",
    answer: "Standard partnerships run for one academic year (October-September) with the option to renew. We also offer semester-based partnerships for specific initiatives or events."
  },
  {
    id: "faq6",
    question: "How do we get started?",
    answer: "Simply reach out to our partnerships team at partnerships@start.tum.de or use the contact form below. We'll schedule a call to discuss your goals and how START can help achieve them."
  }
]

const partnershipOpportunities = [
  {
    icon: "🎤",
    title: "Event Sponsorship",
    description: "Sponsor flagship events like our Annual Pitch Competition, Startup Week, and networking nights to gain visibility among 300+ entrepreneurial students."
  },
  {
    icon: "🎯",
    title: "Recruit Top Talent",
    description: "Get direct access to our highly motivated member base through recruiting events, CV databases, and exclusive hiring opportunities."
  },
  {
    icon: "🧑‍🏫",
    title: "Host Workshops",
    description: "Share your expertise by hosting workshops, masterclasses, or talks on topics relevant to your industry and our founders."
  },
  {
    icon: "💼",
    title: "Company Visits",
    description: "Invite our members to your offices for tours, info sessions, and networking to build relationships with potential future employees and partners."
  },
  {
    icon: "🏆",
    title: "Pitch Competitions",
    description: "Judge our competitions, offer prizes, and get early access to innovative startups seeking funding and partnerships."
  },
  {
    icon: "🤝",
    title: "Co-Innovation Projects",
    description: "Collaborate on innovation challenges, hackathons, or research projects that benefit both your organization and our members."
  }
]

const whyStartSpecial = [
  {
    icon: "🎓",
    title: "Academic Excellence",
    description: "Direct access to one of Europe's top technical universities. TUM consistently ranks among the best in engineering, business, and research programs.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_of_the_Technical_University_of_Munich.svg/1200px-Logo_of_the_Technical_University_of_Munich.svg.png"
  },
  {
    icon: "🚀",
    title: "Proven Track Record",
    description: "Our alumni have founded 100+ companies, raised €500M+ in funding, and created hundreds of jobs across Europe."
  },
  {
    icon: "🌟",
    title: "START Quality",
    description: "We maintain a selective membership process, ensuring you engage with highly motivated, pre-vetted entrepreneurial talent."
  },
  {
    icon: "🌍",
    title: "Student Network",
    description: "Well connected students from TUM, LMU, and other Munich universities. Our community spans across 11k+ followers on social media, with an engaged audience of future founders, engineers, and business leaders actively seeking career opportunities and partnerships."
  }
]

const eventPhotos = [
  {
    id: "ep1",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    caption: "Annual Pitch Competition"
  },
  {
    id: "ep2",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    caption: "Partner Networking Event"
  },
  {
    id: "ep3",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
    caption: "Workshop with Google"
  },
  {
    id: "ep4",
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
    caption: "Startup Week Opening"
  },
  {
    id: "ep5",
    url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop",
    caption: "Mentorship Session"
  },
  {
    id: "ep6",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
    caption: "Partner Appreciation Night"
  }
]



export default function ForPartnersPage() {
  const [loading, setLoading] = useState(true)
  const [partners, setPartners] = useState<Partner[]>([])
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPartners()
        setPartners(data)
      } catch (error) {
        console.error("Failed to load partners", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-dark-blue py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-white">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

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
          backgroundImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
          title={
            <>
              FOR
              <br />
              <span className="outline-text">PARTNERS</span>
            </>
          }
          description="Partner with Europe's leading student entrepreneurship community and shape the future of innovation"
        >
          {/* MD Partnerships Card */}
          <HeroCard accentColor="brand-pink">
            <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-brand-pink/50 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                alt="MD Partnerships"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">MD Partnerships</h3>
            <p className="text-brand-pink text-sm font-semibold mb-4">Head of Partnerships</p>

            {/* Contact Button */}
            <a
              href="mailto:partnerships@start.tum.de"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/50 w-full justify-center"
            >
              <svg
                className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Contact Us</span>
            </a>
          </HeroCard>
        </Hero>

        {/* Partner Overview - Logos - Full Width */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                  WITH WHOM WE  <span className="outline-text">WORKED:</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl">
                  Trusted by leading companies and organizations
                </p>
              </div>
              <a
                href="/partners"
                className="px-6 py-2.5 border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white font-bold rounded-lg transition-all duration-300 whitespace-nowrap text-center"
              >
                View All Partners →
              </a>
            </div>
          </div>

          <div className="bg-white/5 border-y border-white/10 py-12 overflow-hidden">
            <Marquee gradient={false} speed={40}>
              {partners.filter(p => p.featured).map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg p-6 h-28 flex items-center justify-center mx-6 w-48 shadow-lg transition-transform hover:scale-105"
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        const fallback = document.createElement('div')
                        fallback.className = 'text-xl font-bold text-gray-600'
                        fallback.textContent = partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20 space-y-24">

          {/* Why Partner with START - Bento Grid Style */}
          <section className="relative">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                WHY PARTNER <span className="outline-text">WITH START</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Why leading companies choose to partner with START Munich
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large featured card with TUM logo */}
              <div
                className="md:row-span-2 group relative overflow-hidden"
                style={{ animation: `fadeInUp 0.6s ease-out 0s both` }}
              >
                <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-brand-pink p-10 transition-all duration-500 flex flex-col justify-center">
                  <div className="mb-8">
                    <div className="w-full max-w-[200px] h-24 bg-white rounded-lg flex items-center justify-center p-4 mb-6">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_of_the_Technical_University_of_Munich.svg/1200px-Logo_of_the_Technical_University_of_Munich.svg.png"
                        alt="TUM Logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-brand-pink transition-colors">
                    {whyStartSpecial[0].title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {whyStartSpecial[0].description}
                  </p>
                </div>
              </div>

              {/* Two cards on the right */}
              {whyStartSpecial.slice(1, 3).map((reason, index) => (
                <div
                  key={index + 1}
                  className="group relative overflow-hidden"
                  style={{ animation: `fadeInUp 0.6s ease-out ${(index + 1) * 0.1}s both` }}
                >
                  <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-brand-pink/50 p-8 transition-all duration-500">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-transparent flex items-center justify-center mb-4">
                      <span className="text-4xl">{reason.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Student Network - Horizontal card spanning full width */}
              <div
                className="md:col-span-2 group relative overflow-hidden"
                style={{ animation: `fadeInUp 0.6s ease-out 0.3s both` }}
              >
                <div className="relative h-full bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-brand-pink/50 p-8 transition-all duration-500 flex items-center gap-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-pink/20 to-transparent flex items-center justify-center flex-shrink-0">
                    <span className="text-5xl">{whyStartSpecial[3].icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors">
                      {whyStartSpecial[3].title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {whyStartSpecial[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Partners Can Do With Us - Magazine Style Layout */}
          <section className="relative">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                WHAT <span className="outline-text">PARTNERS CAN DO</span> WITH US
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Multiple ways to engage with our entrepreneurial community
              </p>
            </div>

            {/* Magazine Style Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Row - 2 tall + 1 wide */}
              <div
                className="md:row-span-2 group relative overflow-hidden"
                style={{ animation: `fadeInUp 0.6s ease-out 0s both` }}
              >
                <div className="relative h-full min-h-[400px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-white/10 hover:border-brand-pink/50 p-10 transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-pink/30 to-transparent flex items-center justify-center mb-6">
                      <span className="text-5xl">{partnershipOpportunities[0].icon}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-pink transition-colors">
                      {partnershipOpportunities[0].title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {partnershipOpportunities[0].description}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-brand-pink text-sm font-bold">
                      <span>Learn More</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top right horizontal card */}
              <div
                className="md:col-span-2 group relative overflow-hidden"
                style={{ animation: `fadeInUp 0.6s ease-out 0.1s both` }}
              >
                <div className="relative h-full bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-brand-pink/50 p-8 transition-all duration-500 flex items-center gap-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-transparent flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">{partnershipOpportunities[1].icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-pink transition-colors">
                      {partnershipOpportunities[1].title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {partnershipOpportunities[1].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Two square cards */}
              {partnershipOpportunities.slice(2, 4).map((opportunity, index) => (
                <div
                  key={index + 2}
                  className="group relative overflow-hidden"
                  style={{ animation: `fadeInUp 0.6s ease-out ${(index + 2) * 0.1}s both` }}
                >
                  <div className="relative h-full min-h-[200px] bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-brand-pink/50 p-8 transition-all duration-500 flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-pink/20 to-transparent flex items-center justify-center mb-4">
                      <span className="text-4xl">{opportunity.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors">
                      {opportunity.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {opportunity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* Partner Testimonials */}
          <TestimonialsSection
            title={<>
              PARTNER <span className="outline-text">TESTIMONIALS</span>
            </>}
            description="What our partners say about working with START"
            items={testimonials.map(t => ({
              id: t.id,
              name: t.personName,
              role: t.personRole,
              company: t.partnerName,
              image: t.personImage,
              story: t.story,
              quote: t.quote,
              logo: t.partnerLogo,
              logoAlt: t.partnerName
            }))}
          />


          {/* Pictures of Partners at Events */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                PARTNERS AT <span className="outline-text">OUR EVENTS</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Highlights from recent partner collaborations and events
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-xl aspect-video border border-white/10 hover:border-brand-pink/50 transition-all duration-300"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-bold text-lg">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                FREQUENTLY ASKED <span className="outline-text">QUESTIONS</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Everything you need to know about partnering with START
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/5 border border-white/10 overflow-hidden hover:border-brand-pink/30 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-bold text-white pr-8">{faq.question}</h3>
                    <span className="text-brand-pink text-2xl flex-shrink-0">
                      {openFaq === faq.id ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a3e] via-brand-dark-blue to-[#0d0d1f] border-2 border-brand-pink/50 shadow-2xl shadow-brand-pink/20">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-pink/5 rounded-full blur-3xl"></div>

              <div className="relative p-8 md:p-12">
                <div className="flex flex-col items-center gap-8 text-center">
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
                      READY TO <span className="outline-text">PARTNER?</span>
                    </h3>
                    <p className="text-lg text-gray-300 max-w-2xl mb-6">
                      Join our network of leading companies supporting the next generation of entrepreneurs.
                      Let's build the future together.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mb-8">
                      <div className="bg-white/5 p-6 rounded-lg">
                        <div className="text-3xl mb-2">📧</div>
                        <h4 className="text-white font-bold mb-1">Email Us</h4>
                        <p className="text-gray-400 text-sm">partnerships@start.tum.de</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-lg">
                        <div className="text-3xl mb-2">📅</div>
                        <h4 className="text-white font-bold mb-1">Schedule a Call</h4>
                        <p className="text-gray-400 text-sm">Book a 30-min intro meeting</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-lg">
                        <div className="text-3xl mb-2">📄</div>
                        <h4 className="text-white font-bold mb-1">Download Info Pack</h4>
                        <p className="text-gray-400 text-sm">Learn about our offerings</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="px-8 py-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/50 text-lg">
                      Get in Touch
                    </button>
                    <button className="px-8 py-3 border-2 border-brand-pink text-brand-pink hover:bg-brand-pink/10 font-bold rounded-lg transition-all duration-300 text-lg">
                      Download Partnership Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
