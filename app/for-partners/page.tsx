import Image from 'next/image'
import Script from 'next/script'
import type { Metadata } from 'next'
import Hero from "@/components/Hero"
import HeroCard from "@/components/HeroCard"
import PhotoGallery from './PhotoGallery'
import { getAllPartners } from '@/lib/partners'

export const metadata: Metadata = {
  title: 'Partner With Us',
  description:
    'Partner with START Munich to reach top talent from TUM, LMU, and HM. Sponsor events, host workshops, and recruit Munich\'s most ambitious student entrepreneurs.',
  alternates: { canonical: 'https://www.startmunich.de/for-partners' },
  openGraph: {
    url: 'https://www.startmunich.de/for-partners',
    title: 'Partner With Us | START Munich',
    description:
      'Partner with START Munich to reach top talent from TUM, LMU, and HM. Sponsor events, host workshops, and recruit Munich\'s most ambitious student entrepreneurs.',
  },
}

export const revalidate = 3600

const faqs = [
  {
    id: "faq1",
    question: "How long is the timeline to collaboration?",
    answer: (
      <>
        We can move fast and sometimes launch within days. Please check our event{" "}
        <a href="/domain/events" className="text-brand-pink hover:underline">
          calendar
        </a>{" "}
        first. If you want to join a specific event, contact us as early as possible so we can plan it with you.
      </>
    )
  },
  {
    id: "faq2",
    question: "How can we recruit START members?",
    answer: "Partners get exclusive access to our talent pool through dedicated recruiting events, curated CV database access of consenting community members and event attendees, and priority placement on our job board. You can also host office tours and info sessions."
  },
  {
    id: "faq3",
    question: "What events can partners sponsor?",
    answer: "Partners can sponsor flagship formats like Road to START Summit, START Sprint, workshops, networking nights, and more. Reach out and we'll find or build the right format together."
  },
  {
    id: "faq4",
    question: "What is the partnership duration?",
    answer: "Depending on your goals, partnerships can be event-specific or long-term, for example for one semester or a full year."
  },
  {
    id: "faq5",
    question: "How do we get started?",
    answer: "Send us a message anytime. We'll quickly set up a short intro call to understand your goals and propose the best next steps."
  }
]

const partnershipOpportunities = [
  {
    icon: "🎤",
    title: "Event Sponsorship",
    description: "Sponsor flagship events like our Annual Pitch Competition, Hackathons, and domain specific networking events to gain visibility among thousands of participants."
  },
  {
    icon: "🎯",
    title: "Recruit Top Talent",
    description: "Get direct access to our highly motivated member base through personal engagement, CV databases, and exclusive hiring opportunities."
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
    description: "Judge our competitions, offer prizes, and be a thought leader to access to innovative startups seeking funding and partnerships."
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
    description: "Direct access to Munich's top universities. Our network spans TUM, LMU, HM and many more, connecting your organization with outstanding talent across engineering, business, research, and applied sciences.",
  },
  {
    icon: "🧠",
    title: "Thought Leadership",
    description: "Share your expertise through workshops, talks, panels, and hands-on formats. START gives your team a credible stage in front of ambitious students, builders, and future founders."
  },
  {
    icon: "📣",
    title: "Branding",
    description: "Build sustained visibility across our flagship events, communication channels, and partner activations. We help your brand show up in a context that feels relevant and high-signal."
  },
  {
    icon: "🤝",
    title: "Partner Network",
    description: "Become part of a strong Munich ecosystem of partners, founders, and student operators. The value goes beyond single events and creates long-term relationships across the network."
  }
]

export default async function ForPartnersPage() {
  const partners = await getAllPartners()

  // Plain-text FAQ answers for JSON-LD (faq1 has JSX, so we provide a text fallback)
  const faqPlainText: Record<string, string> = {
    faq1: 'We can move fast and sometimes launch within days. Please check our event calendar first. If you want to join a specific event, contact us as early as possible so we can plan it with you.',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string' ? faq.answer : faqPlainText[faq.id] ?? '',
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
          backgroundImage="/partners/hero-opt.jpg"
          hideChildrenOnMobile
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
          <HeroCard>
            <div className="mb-4 mx-auto relative w-40 h-40 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-brand-pink/50 transition-all duration-300">
              <Image
                src="/partners/md-partnerships.jpg"
                alt="MD Partnerships"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Marius Heumader</h3>
            <p className="text-brand-pink text-sm font-semibold mb-4">Head of Partnerships</p>

            {/* Contact Button */}
            <a
              href="https://tally.so/r/3xpGQG"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/50 w-full justify-center"
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
              <span>Get in Touch</span>
            </a>
          </HeroCard>
        </Hero>

        {/* Partner Overview - Logos - Full Width */}
        <section className="pt-16 pb-6 lg:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
              <div>
                <p className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase mb-3">Partners & Collaborators</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                  WHO WE <span className="outline-text">WORK</span> WITH
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl">
                  Trusted by leading companies and organizations
                </p>
              </div>
              <a
                href="/partners"
                className="hidden md:inline-flex px-6 py-2.5 border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white font-bold rounded-full transition-all duration-300 whitespace-nowrap text-center"
              >
                View All Partners →
              </a>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-dark-blue to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-dark-blue to-transparent z-10" />
            <div className="animate-scroll-nonstop">
              {[...partners.filter(p => p.featured), ...partners.filter(p => p.featured)].map((partner, i) => (
                <div key={`${partner.id}-${i}`} className="inline-flex items-center justify-center mx-6 flex-shrink-0">
                  <div className="bg-white rounded-xl p-4 w-36 h-20 flex items-center justify-center relative">
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      fill
                      className="object-contain p-4"
                      sizes="144px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="md:hidden text-center mb-16">
          <a href="/partners" className="group inline-flex items-center gap-2 text-white/70 hover:text-brand-pink font-medium transition-colors">
            View all our partners <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20 space-y-32">

          {/* Why Partner with START - Modern Card Grid */}
          <section className="relative">
            <div className="mb-12">
              <p className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase mb-3">Why START</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                WHY PARTNER <span className="outline-text">WITH START</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                A practical partnership model built around academic excellence, thought leadership, branding, and strong network effects in Munich.
              </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large featured card with university logos */}
              <div
                className="md:row-span-2 group"
                style={{ animation: `fadeInUp 0.6s ease-out 0s both` }}
              >
                <div className="relative h-full bg-gradient-to-br from-brand-pink/15 via-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/15 hover:border-brand-pink/40 p-8 lg:p-10 transition-all duration-500 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="w-full max-w-[160px] h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md">
                        <Image
                          src="/partners/Logo_of_the_Technical_University_of_Munich.svg"
                          alt="TUM Logo"
                          width={134}
                          height={40}
                          className="max-w-full max-h-full object-contain"
                          unoptimized
                        />
                      </div>
                      <div className="w-full max-w-[160px] h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md">
                        <Image
                          src="/partners/LMU_Muenchen_Logo.svg.png"
                          alt="LMU Logo"
                          width={134}
                          height={40}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="w-full max-w-[160px] h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md">
                        <Image
                          src="/partners/HM_Logo.png"
                          alt="HM Logo"
                          width={134}
                          height={40}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-brand-pink transition-colors">
                    {whyStartSpecial[0].title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {whyStartSpecial[0].description}
                  </p>
                </div>
              </div>

              {/* Two cards on the right */}
              {whyStartSpecial.slice(1, 3).map((reason, index) => (
                <div
                  key={index + 1}
                  className="group"
                  style={{ animation: `fadeInUp 0.6s ease-out ${(index + 1) * 0.1}s both` }}
                >
                  <div className="relative h-full bg-white/[0.06] backdrop-blur-sm rounded-3xl border border-white/10 hover:border-brand-pink/30 p-7 transition-all duration-500 hover:bg-white/[0.09]">
                    <div className="w-14 h-14 bg-brand-pink/15 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-3xl">{reason.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-pink transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Partner Network - Horizontal card spanning full width */}
              <div
                className="md:col-span-2 group"
                style={{ animation: `fadeInUp 0.6s ease-out 0.3s both` }}
              >
                <div className="relative h-full bg-gradient-to-r from-white/[0.06] to-white/[0.03] backdrop-blur-sm rounded-3xl border border-white/10 hover:border-brand-pink/30 p-7 transition-all duration-500 flex items-center gap-6 hover:bg-white/[0.08]">
                  <div className="w-16 h-16 bg-brand-pink/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">{whyStartSpecial[3].icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-pink transition-colors">
                      {whyStartSpecial[3].title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {whyStartSpecial[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Partners Can Do With Us */}
          <section className="relative">
            <div className="mb-12">
              <p className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase mb-3">Collaborate</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                WHAT <span className="outline-text">PARTNERS CAN DO</span> WITH US
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Multiple ways to engage with our entrepreneurial community
              </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Featured large card */}
              <div
                className="md:row-span-2 group"
                style={{ animation: `fadeInUp 0.6s ease-out 0s both` }}
              >
                <div className="relative h-full min-h-[400px] bg-gradient-to-br from-brand-pink/15 via-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/15 hover:border-brand-pink/40 p-10 transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 bg-brand-pink/15 rounded-3xl flex items-center justify-center mb-6">
                      <span className="text-5xl">{partnershipOpportunities[0].icon}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-pink transition-colors">
                      {partnershipOpportunities[0].title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {partnershipOpportunities[0].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top right horizontal card */}
              <div
                className="md:col-span-2 group"
                style={{ animation: `fadeInUp 0.6s ease-out 0.1s both` }}
              >
                <div className="relative h-full bg-white/[0.06] backdrop-blur-sm rounded-3xl border border-white/10 hover:border-brand-pink/30 p-8 transition-all duration-500 flex items-center gap-8 hover:bg-white/[0.09]">
                  <div className="w-16 h-16 bg-brand-pink/15 rounded-2xl flex items-center justify-center flex-shrink-0">
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
                  className="group"
                  style={{ animation: `fadeInUp 0.6s ease-out ${(index + 2) * 0.1}s both` }}
                >
                  <div className="relative h-full min-h-[200px] bg-white/[0.06] backdrop-blur-sm rounded-3xl border border-white/10 hover:border-brand-pink/30 p-8 transition-all duration-500 flex flex-col hover:bg-white/[0.09]">
                    <div className="w-16 h-16 bg-brand-pink/15 rounded-2xl flex items-center justify-center mb-4">
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

          {/* Pictures of Partners at Events */}
          <PhotoGallery />

          {/* FAQ Section */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-16">
              {/* Left Column - Header */}
              <div className="lg:col-span-2">
                <p className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase mb-3">Have Questions?</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  FREQUENTLY ASKED <span className="outline-text">QUESTIONS</span>
                </h2>
                <p className="text-gray-400 text-lg mb-4 lg:mb-8">
                  Everything you need to know about partnering with START
                </p>
              </div>

              {/* Right Column - Accordion */}
              <div className="lg:col-span-3 space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.id}
                    className="group bg-white/[0.06] rounded-2xl border border-white/10 overflow-hidden hover:border-brand-pink/30 transition-all duration-300"
                  >
                    <summary className="w-full px-7 py-5 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-colors duration-200 rounded-2xl list-none">
                      <h3 className="text-lg font-bold text-white pr-8">{faq.question}</h3>
                      <span className="faq-icon text-brand-pink text-2xl flex-shrink-0 transition-transform duration-300">
                        +
                      </span>
                    </summary>
                    <div className="px-7 pb-5">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section id="get-in-touch">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1a3e] via-brand-dark-blue to-[#0d0d1f] border border-brand-pink/30 shadow-2xl shadow-brand-pink/10">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/10 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px]"></div>

              <div className="relative p-8 md:p-10">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase mb-4">Let's Connect</p>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-5">
                      READY TO <span className="outline-text">PARTNER?</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                      Join our network of leading companies and get in touch with ambitious students from TUM, LMU, and other Munich universities.
                    </p>
                    <div className="flex justify-center">
                      <a
                        href="https://tally.so/r/3xpGQG"
                        className="px-10 py-4 bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/50 text-lg"
                      >
                        Get in Touch
                      </a>
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
