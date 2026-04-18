'use client'

import { useEffect, useRef, useState } from 'react'
import CTA from '@/components/CTA'
import BayAreaCompanyLogoCarousel from './BayAreaCompanyLogoCarousel'
import BayAreaYearTabs from './BayAreaYearTabs'
import BayAreaYearPreview from './BayAreaYearPreview'
import Hero from '@/components/Hero'
import HeroCard from '@/components/HeroCard'
import { useAnimatedNumber } from '@/lib/useAnimatedNumber'

const HERO_BACKGROUND = '/bayarea/years/2026.png'

const OVERVIEW_PILLARS = [
    {
        title: 'Who It Is For',
        subtitle: 'Student builders ready to level up fast.',
        points: [
            'Entrepreneurial students with strong drive',
            'People who learn by doing and shipping',
            'Applicants who want to build global ambition',
        ],
    },
    {
        title: 'What You Will Do',
        subtitle: 'Two intense weeks in the Bay Area.',
        points: [
            'Visit startups, VCs, and operator teams',
            'Join candid sessions with founders and experts',
            'Work in teams on an internal moonshot sprint',
        ],
    },
    {
        title: 'What You Take Home',
        subtitle: 'Clarity, network, and execution momentum.',
        points: [
            'A sharper founder and product mindset',
            'Direct connections across the ecosystem',
            'Concrete ideas to execute after the program',
        ],
    },
] as const

export default function StartGoesBayAreaContent() {
    const [activeYear, setActiveYear] = useState<'2025' | '2026'>('2026')
    const [showStickyYearSelector, setShowStickyYearSelector] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)
    const heroSectionRef = useRef<HTMLDivElement | null>(null)
    const animatedStartupVisits = useAnimatedNumber(20, !hasLoaded, 800)
    const animatedParticipants = useAnimatedNumber(20, !hasLoaded, 800)

    useEffect(() => {
        setHasLoaded(true)
    }, [])

    useEffect(() => {
        const target = heroSectionRef.current

        if (!target) return

        const updateStickySelectorVisibility = () => {
            const heroBottom = target.getBoundingClientRect().bottom
            setShowStickyYearSelector(heroBottom <= 0)
        }

        updateStickySelectorVisibility()
        window.addEventListener('scroll', updateStickySelectorVisibility, { passive: true })

        return () => {
            window.removeEventListener('scroll', updateStickySelectorVisibility)
        }
    }, [])

    const renderYearSelectorButtons = () => (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {(['2025', '2026'] as const).map((year) => {
                const isActive = year === activeYear

                return (
                    <button
                        key={year}
                        type="button"
                        onClick={() => setActiveYear(year)}
                        className={`border rounded-full font-bold uppercase tracking-wide transition-colors backdrop-blur-sm px-5 py-2.5 text-sm sm:px-6 sm:text-base ${isActive
                            ? 'bg-brand-pink text-white border-brand-pink'
                            : 'bg-white/10 text-gray-100 border-white/25 hover:bg-white/20'
                            }`}
                    >
                        {year}
                    </button>
                )
            })}
        </div>
    )

    const stickyYearSelector = (
        <div
            className={`fixed left-1/2 top-24 z-40 -translate-x-1/2 px-4 transition-all duration-300 ${showStickyYearSelector ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            aria-hidden={!showStickyYearSelector}
        >
            {renderYearSelectorButtons()}
        </div>
    )

    return (
        <main className="min-h-screen bg-brand-dark-blue">
            {stickyYearSelector}

            <div ref={heroSectionRef}>
                <Hero
                    backgroundImage={HERO_BACKGROUND}
                    titleClassName={hasLoaded ? 'animate-[flyInFromTop_0.6s_ease-out]' : 'animate-none'}
                    title={
                        <>
                            START GOES
                            <br />
                            <span className="outline-text">BAY AREA</span>
                        </>
                    }
                    description="A selective international exchange program by START Munich connecting entrepreneurial talent from Europe with the San Francisco Bay Area innovation ecosystem."
                >
                    <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-6">
                        <HeroCard>
                            <div className="flex items-baseline justify-center gap-2 mb-3">
                                <span className="text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 transition">
                                    {Math.floor(animatedStartupVisits)}
                                </span>
                                <span className="text-xl lg:text-3xl font-bold text-[#d0006f]">+</span>
                            </div>
                            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Startup Visits</p>
                        </HeroCard>

                        <HeroCard>
                            <div className="flex items-baseline justify-center gap-2 mb-3">
                                <span className="text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 transition">
                                    {Math.floor(animatedParticipants)}
                                </span>
                                <span className="text-xl lg:text-3xl font-bold text-[#d0006f]">+</span>
                            </div>
                            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Participants</p>
                        </HeroCard>
                    </div>
                </Hero>
            </div>

            <div className="pt-8 lg:pt-20">
                <BayAreaYearPreview yearLabel="2027" imageUrl="/bayarea/years/2026.png" />
            </div>
            <BayAreaCompanyLogoCarousel />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="mb-10">
                    <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Program</span>
                    <h3 className="text-4xl sm:text-5xl font-black text-white mt-3">OVERVIEW</h3>
                    <p className="text-gray-400 text-lg">
                        Two intense weeks to learn from top founders and investors, then apply it to your own ideas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {OVERVIEW_PILLARS.map((item, index) => (
                        <article
                            key={item.title}
                            className="group relative bg-white/[0.06] border border-white/10 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-brand-pink/35 hover:bg-white/[0.09]"
                        >
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-pink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-5" />

                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl font-black text-white/20 leading-none tabular-nums">0{index + 1}</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                            </div>

                            <h4 className="text-xl font-black text-white mb-2 group-hover:text-brand-pink transition-colors duration-300">
                                {item.title}
                            </h4>
                            <p className="text-sm text-gray-300 mb-5 leading-relaxed">{item.subtitle}</p>

                            <div className="space-y-2.5">
                                {item.points.map((point) => (
                                    <div key={point} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-2 flex-shrink-0" />
                                        <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <BayAreaYearTabs activeYear={activeYear} />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                <div className="mb-10">
                    <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Next Steps</span>
                    <h3 className="text-4xl sm:text-5xl font-black text-white mt-3">GET IN TOUCH</h3>
                    <p className="text-gray-400 text-lg mt-3 max-w-3xl">
                        If you want to collaborate, host a session, or support the program, this is where the conversation starts.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <CTA
                    title="Collaborate with START goes Bay Area"
                    description="Want to host a session, support future chapters, or connect with the team? Reach out directly."
                    buttons={[
                        { label: 'Contact Team', href: 'mailto:bayarea@startmunich.de', variant: 'primary' },
                        { label: 'START Munich', href: 'https://www.startmunich.de/', external: true, variant: 'secondary' },
                    ]}
                />
            </section>
        </main>
    )
}
