import type { Metadata } from 'next'
import CTA from '@/components/CTA'
import BayAreaYearTabs from '@/components/BayAreaYearTabs'
import Hero from '@/components/Hero'
import HeroCard from '@/components/HeroCard'
import {
    bayAreaHeroHighlights,
    bayAreaOverviewItems,
} from '@/lib/startGoesBayAreaData'

export const metadata: Metadata = {
    title: 'START goes Bay Area | START Munich',
    description:
        'A selective international exchange program by START Munich connecting entrepreneurial talent with the Bay Area innovation ecosystem.',
}

export default function StartGoesBayAreaPage() {
    return (
        <main className="min-h-screen bg-brand-dark-blue">
            <Hero
                backgroundImage="/memberJourney/SF.png"
                title={
                    <>
                        START GOES
                        <br />
                        <span className="outline-text">BAY AREA</span>
                    </>
                }
                description="A selective international exchange program by START Munich connecting entrepreneurial talent from Europe with the San Francisco Bay Area innovation ecosystem."
            >
                <div className="flex flex-col gap-6">
                    {bayAreaHeroHighlights.map((stat) => (
                        <HeroCard key={stat.label}>
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
                        Explore year-specific timelines and year details. 2027 is available as a preview.
                    </p>
                </div>

                <BayAreaYearTabs />
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
