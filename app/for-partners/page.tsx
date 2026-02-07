"use client"

import { useState, useEffect } from 'react'
import Script from 'next/script'

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

interface FAQ {
  id: string
  question: string
  answer: string
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
    title: "Mentorship Programs",
    description: "Provide 1-on-1 mentorship to promising founders, helping them navigate challenges and accelerate their startup journey."
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
    icon: "🌟",
    title: "Quality over Quantity",
    description: "We maintain a selective membership process, ensuring you engage with highly motivated, pre-vetted entrepreneurial talent."
  },
  {
    icon: "🚀",
    title: "Proven Track Record",
    description: "Our alumni have founded 100+ companies, raised €500M+ in funding, and created hundreds of jobs across Europe."
  },
  {
    icon: "🎓",
    title: "TUM Excellence",
    description: "Direct access to one of Europe's top technical universities with strong engineering, business, and research programs."
  },
  {
    icon: "🌍",
    title: "International Network",
    description: "Connect with a diverse, international community with strong ties to Silicon Valley, London, Berlin, and other startup hubs."
  },
  {
    icon: "⚡",
    title: "Action-Oriented",
    description: "Our members are builders, not just talkers. They're actively working on startups, not just learning about entrepreneurship."
  },
  {
    icon: "🔄",
    title: "Long-term Relationships",
    description: "We foster lasting partnerships, not one-off transactions. Many partners have been with us for 5+ years."
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

const partnerLogos = [
  { name: "Sequoia Capital", logo: "https://logo.clearbit.com/sequoiacap.com" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Amazon Web Services", logo: "https://logo.clearbit.com/aws.amazon.com" },
  { name: "TU Munich", logo: "https://logo.clearbit.com/tum.de" },
  { name: "SAP", logo: "https://logo.clearbit.com/sap.com" },
  { name: "Andreessen Horowitz", logo: "https://logo.clearbit.com/a16z.com" },
  { name: "Accel", logo: "https://logo.clearbit.com/accel.com" },
  { name: "UnternehmerTUM", logo: "https://logo.clearbit.com/unternehmertum.de" },
  { name: "Nvidia", logo: "https://logo.clearbit.com/nvidia.com" }
]

export default function ForPartnersPage() {
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  useEffect(() => {
    setLoading(false)
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
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
              alt="For Partners"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 h-full bg-brand-dark-blue/70"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 h-full flex items-center">
            <div className="flex-1 max-w-3xl text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 animate-[flyInFromTop_0.6s_ease-out]">
                FOR
                <br />
                <span className="outline-text">PARTNERS</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Partner with Europe's leading student entrepreneurship community and shape the future of innovation
              </p>
            </div>
          </div>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20 space-y-24">
          
          {/* Why Partner with START */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                WHY PARTNER <span className="outline-text">WITH START</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Why leading companies choose to partner with START Munich
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyStartSpecial.map((reason, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="relative bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-brand-pink transition-all duration-300 h-full">
                    {/* Floating icon */}
                    <div className="mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                      <span className="text-5xl inline-block">{reason.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {reason.description}
                    </p>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Partner Testimonials */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                PARTNER <span className="outline-text">TESTIMONIALS</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                What our partners say about working with START
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-pink overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#0f122f]/30"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={testimonial.personImage}
                      alt={testimonial.personName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/50 to-transparent"></div>
                    {/* Partner logo overlay */}
                    <div className="absolute top-4 right-4 bg-white rounded p-2 shadow-lg">
                      <img
                        src={testimonial.partnerLogo}
                        alt={testimonial.partnerName}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Person Info */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white mb-1">{testimonial.personName}</h3>
                      <p className="text-sm text-brand-pink font-semibold mb-1">{testimonial.personRole}</p>
                      <p className="text-xs text-gray-400">{testimonial.partnerName}</p>
                    </div>

                    {/* Story */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-4 pt-4 border-t border-white/10">
                      {testimonial.story}
                    </p>

                    {/* Quote */}
                    <blockquote className="border-l-2 border-brand-pink pl-4 py-2">
                      <p className="text-sm italic text-gray-400">"{testimonial.quote}"</p>
                    </blockquote>
                  </div>

                  {/* Hover effect accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1f2345] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          </section>

          {/* What Partners Can Do With Us */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                WHAT <span className="outline-text">PARTNERS CAN DO</span> WITH US
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Multiple ways to engage with our entrepreneurial community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnershipOpportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-pink transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/0 to-brand-pink/0 group-hover:from-brand-pink/5 group-hover:to-transparent transition-all duration-300"></div>
                  
                  <div className="relative p-8">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 inline-block">{opportunity.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors duration-300">{opportunity.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {opportunity.description}
                    </p>
                  </div>

                  {/* Bottom stripe */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>
          </section>

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

                    {/* Partner Overview - Logos */}
          <section>
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                    OUR <span className="outline-text">PARTNERS</span>
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

            <div className="bg-white/5 border border-white/10 p-12 rounded-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {partnerLogos.map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 h-28 flex items-center justify-center hover:shadow-lg hover:shadow-brand-pink/20 transition-all duration-300"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
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
              </div>
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
