'use client'

import { useEffect, useRef, useState } from 'react'
import CTA from '@/components/CTA'
import BayAreaCompanyLogoCarousel from './BayAreaCompanyLogoCarousel'
import BayAreaYearTabs from './BayAreaYearTabs'
import BayAreaYearPreview from './BayAreaYearPreview'
import Hero from '@/components/Hero'
import HeroCard from '@/components/HeroCard'
import {
    bayAreaOverviewItems,
} from '@/lib/startGoesBayAreaData'
import { useAnimatedNumber } from '@/lib/useAnimatedNumber'

const HERO_BACKGROUND = '/bayarea/years/2026.png'

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
                        Built from our 2026 trip plan: high-intensity learning, direct ecosystem access, and execution-focused outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bayAreaOverviewItems.map((item) => (
                        <article
                            key={item.title}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-pink/30 hover:bg-white/[0.07] transition-all duration-300"
                        >
                            <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
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
