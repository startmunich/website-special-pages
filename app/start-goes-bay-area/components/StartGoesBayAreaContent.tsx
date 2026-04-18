'use client'

import { useEffect, useRef, useState } from 'react'
import CTA from '@/components/CTA'
import BayAreaYearTabs from './BayAreaYearTabs'
import BayAreaCompanyLogoCarousel from './BayAreaCompanyLogoCarousel'
import Hero from '@/components/Hero'
import HeroCard from '@/components/HeroCard'
import {
    bayAreaHeroHighlights,
    bayAreaOverviewItems,
    bayAreaYearContent,
} from '@/lib/startGoesBayAreaData'
import type { BayAreaYearId } from '../types'

const HERO_BACKGROUND_BY_YEAR: Record<BayAreaYearId, string> = {
    '2025': '/bayarea/years/2025.jpg',
    '2026': '/bayarea/years/2026.png',
    '2027': '/bayarea/years/2026.png',
}

export default function StartGoesBayAreaContent() {
    const [activeYear, setActiveYear] = useState<BayAreaYearId>('2026')
    const [showStickyYearSelector, setShowStickyYearSelector] = useState(false)
    const yearSelectorRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const target = yearSelectorRef.current

        if (!target) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyYearSelector(!entry.isIntersecting)
            },
            {
                threshold: 0,
                rootMargin: '-80px 0px 0px 0px',
            }
        )

        observer.observe(target)

        return () => {
            observer.disconnect()
        }
    }, [])

    const heroBackgroundAccents = (
        <>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-blue/90 via-brand-dark-blue/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-transparent to-transparent" />
            <div className="absolute top-20 right-[15%] w-[420px] h-[420px] bg-brand-pink/15 rounded-full blur-[110px] animate-blob" />
            <div className="absolute bottom-12 left-[5%] w-[340px] h-[340px] bg-brand-pink/10 rounded-full blur-[90px] animate-blob animation-delay-2000" />
            <div className="absolute top-[38%] right-[6%] w-[260px] h-[260px] bg-blue-500/10 rounded-full blur-[70px] animate-blob animation-delay-4000" />
        </>
    )

    const renderYearSelectorButtons = (variant: 'hero' | 'sticky' = 'hero') => (
        <div className={variant === 'sticky' ? 'flex flex-wrap items-center justify-center gap-2 sm:gap-3' : 'flex flex-wrap gap-2'}>
            {bayAreaYearContent.map((year) => {
                const isActive = year.id === activeYear

                return (
                    <button
                        key={year.id}
                        type="button"
                        onClick={() => setActiveYear(year.id)}
                        className={`border rounded-full font-bold uppercase tracking-wide transition-colors backdrop-blur-sm ${variant === 'sticky' ? 'px-5 py-2.5 text-sm sm:px-6 sm:text-base' : 'px-4 py-2 text-xs sm:text-sm'} ${isActive
                            ? 'bg-brand-pink text-white border-brand-pink'
                            : 'bg-white/10 text-gray-100 border-white/25 hover:bg-white/20'
                            }`}
                    >
                        {year.label}
                        {year.isPreview ? <span className="ml-2 text-[10px] opacity-80">Preview</span> : null}
                    </button>
                )
            })}
        </div>
    )

    const heroYearSelectorSentinel = <div ref={yearSelectorRef} aria-hidden="true" className="h-px w-px" />

    const stickyYearSelector = (
        <div
            className={`fixed left-1/2 top-24 z-40 -translate-x-1/2 px-4 transition-all duration-300 ${showStickyYearSelector ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            aria-hidden={!showStickyYearSelector}
        >
            {renderYearSelectorButtons('sticky')}
        </div>
    )

    return (
        <main className="min-h-screen bg-brand-dark-blue">
            {stickyYearSelector}

            <Hero
                backgroundImage={HERO_BACKGROUND_BY_YEAR[activeYear]}
                overlayOpacity="bg-brand-dark-blue/45"
                backgroundAccents={heroBackgroundAccents}
                leftColumnClassName="max-w-3xl"
                titleClassName="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem]"
                descriptionClassName="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl"
                rightColumnClassName="gap-5 min-w-[300px]"
                title={
                    <>
                        START GOES
                        <br />
                        <span className="outline-text">BAY AREA</span>
                    </>
                }
                description="A selective international exchange program by START Munich connecting entrepreneurial talent from Europe with the San Francisco Bay Area innovation ecosystem."
                leftSlot={heroYearSelectorSentinel}
            >
                <div className="flex flex-col gap-6">
                    {bayAreaHeroHighlights.map((stat) => (
                        <HeroCard
                            key={stat.label}
                            className="transition-all duration-300 hover:border-brand-pink/30 hover:bg-white/[0.09]"
                        >
                            <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">{stat.label}</p>
                        </HeroCard>
                    ))}
                </div>
            </Hero>

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

            <section className="pb-20">
                <BayAreaYearTabs activeYear={activeYear} />
            </section>

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
