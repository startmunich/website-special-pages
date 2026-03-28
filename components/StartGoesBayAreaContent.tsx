'use client'

import { useMemo, useState } from 'react'
import CTA from '@/components/CTA'
import BayAreaYearTabs from '@/components/BayAreaYearTabs'
import Hero from '@/components/Hero'
import HeroCard from '@/components/HeroCard'
import {
    bayAreaHeroHighlights,
    bayAreaOverviewItems,
    bayAreaYearContent,
    type BayAreaYearId,
} from '@/lib/startGoesBayAreaData'

const HERO_BACKGROUND_BY_YEAR: Record<BayAreaYearId, string> = {
    '2025': '/bayarea/years/2025.jpg',
    '2026': '/bayarea/years/2026.png',
    '2027': '/bayarea/years/2026.png',
}

export default function StartGoesBayAreaContent() {
    const [activeYear, setActiveYear] = useState<BayAreaYearId>('2026')

    const activeYearMeta = useMemo(
        () => bayAreaYearContent.find((year) => year.id === activeYear) ?? bayAreaYearContent[0],
        [activeYear]
    )

    const heroTopBadge = (
        <div className="inline-flex items-center gap-2 bg-brand-pink/20 backdrop-blur-sm border border-brand-pink/40 text-brand-pink px-5 py-2 rounded-full text-sm font-medium transition-all duration-700">
            <span>Global Exchange Track</span>
        </div>
    )

    const heroBackgroundAccents = (
        <>
            <div className="absolute top-20 right-[15%] w-[420px] h-[420px] bg-brand-pink/15 rounded-full blur-[110px] animate-blob" />
            <div className="absolute bottom-12 left-[5%] w-[340px] h-[340px] bg-brand-pink/10 rounded-full blur-[90px] animate-blob animation-delay-2000" />
            <div className="absolute top-[38%] right-[6%] w-[260px] h-[260px] bg-blue-500/10 rounded-full blur-[70px] animate-blob animation-delay-4000" />
        </>
    )

    const heroYearSelector = (
        <div className="mt-3">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3">Select Program Year</p>
            <div className="flex flex-wrap gap-2">
                {bayAreaYearContent.map((year) => {
                    const isActive = year.id === activeYear

                    return (
                        <button
                            key={year.id}
                            type="button"
                            onClick={() => setActiveYear(year.id)}
                            className={`px-4 py-2 border rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors backdrop-blur-sm ${isActive
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
        </div>
    )

    const heroYearStamp = (
        <div
            key={activeYear}
            aria-hidden="true"
            className="relative inline-flex w-fit items-center justify-center rotate-[-16deg] rounded-full border-2 border-brand-pink px-3 py-1.5 md:px-4 md:py-2 animate-[yearStampIn_460ms_cubic-bezier(0.16,1,0.3,1)]"
        >
            <span className="block text-center text-5xl md:text-7xl font-black leading-none tracking-[0.08em] text-brand-pink drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]">
                {activeYear}
            </span>
        </div>
    )

    return (
        <main className="min-h-screen bg-brand-dark-blue">
            <Hero
                backgroundImage={HERO_BACKGROUND_BY_YEAR[activeYear]}
                className="h-[760px] lg:h-screen min-h-[680px]"
                overlayOpacity="bg-brand-dark-blue/80 backdrop-blur-[2px]"
                backgroundAccents={heroBackgroundAccents}
                topBadge={heroTopBadge}
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
                leftSlot={heroYearSelector}
                centerOverlay={heroYearStamp}
            >
                <div className="flex flex-col gap-6">
                    {bayAreaHeroHighlights.map((stat) => (
                        <HeroCard
                            key={stat.label}
                            className="bg-white/5 backdrop-blur-md border-white/10 rounded-3xl p-5 sm:p-6 hover:border-brand-pink/40 hover:shadow-[0_0_30px_rgba(208,0,111,0.15)]"
                        >
                            <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">{stat.label}</p>
                        </HeroCard>
                    ))}
                </div>
            </Hero>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                        PROGRAM <span className="outline-text">OVERVIEW</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Built from our 2026 trip plan: high-intensity learning, direct ecosystem access, and execution-focused outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bayAreaOverviewItems.map((item) => (
                        <article key={item.title} className="bg-white/5 border border-white/10 p-6">
                            <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                        YEAR <span className="outline-text">OVERVIEW</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Showing details for <span className="text-white font-bold">{activeYearMeta.label}</span>. 2027 is available as a preview.
                    </p>
                </div>

                <BayAreaYearTabs activeYear={activeYear} />
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
