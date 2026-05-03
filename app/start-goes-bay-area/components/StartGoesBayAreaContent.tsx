'use client'

import CTA from '@/components/CTA'
import BayAreaYearTabs from './BayAreaYearTabs'
import Hero from '@/components/Hero'

const HERO_BACKGROUND = '/bayarea/years/2026.png'

const OVERVIEW_DETAILS = [
    {
        label: 'Format',
        text: 'A two-week exchange program in San Francisco and Silicon Valley, organized by START Munich for a selected group of members.',
    },
    {
        label: 'Participants',
        text: 'Students from the START community who want to understand how different startup ecosystems work in practice.',
    },
    {
        label: 'Program',
        text: 'Company visits, founder and investor conversations, ecosystem events, and time in the city to experience the Bay Area beyond meeting rooms.',
    },
    {
        label: 'Purpose',
        text: 'The program helps members compare Munich and Bay Area startup culture, build relationships, and bring concrete learnings back into START.',
    },
] as const

const FAQ_ITEMS = [
    {
        question: 'Is this commercial?',
        answer: 'Nope. START goes Bay Area is fully non-profit and organized by students, for students. We do this because we believe in building bridges between Europe and the Bay Area ecosystem. None of the organizers is paid or receives a financial benefit or compensation.',
    },
    {
        question: "What's the time commitment for partners?",
        answer: 'About 60-90 minutes for a Q&A session with our group. We keep things lean, authentic, and respectful of your schedule. You share your story, we bring the energy and questions.',
        highlight: true,
    },
    {
        question: 'Who are the participants?',
        answer: "20 hand-picked students from START Munich - Germany's largest entrepreneurial student initiative. Think ~60% graduate students, ~32% Business & Engineering, ~22% CS. They've made it through two highly competitive selections: first for START, then for START goes Bay Area.",
    },
    {
        question: 'What do we talk about in the sessions?',
        answer: 'Your journey - the real story behind building your company or fund. The uphill battles, pivotal decisions, and what actually matters in the Bay Area ecosystem. We want authenticity over polish.',
    },
    {
        question: 'How often does this happen?',
        answer: "Once a year, always in the first half of March. We kicked off this tradition in March 2025 and are committed to making it an annual pilgrimage for Europe's top entrepreneurial talent.",
    },
] as const

export default function StartGoesBayAreaContent() {
    return (
        <main className="min-h-screen bg-brand-dark-blue">
            <Hero
                backgroundImage={HERO_BACKGROUND}
                title={
                    <>
                        START GOES
                        <br />
                        <span className="outline-text">BAY AREA</span>
                    </>
                }
                description="Connecting entrepreneurial talent from Europe with the San Francisco ecosystem."
            />

            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
                        <div>
                            <span className="text-brand-pink text-xs font-bold tracking-[0.35em] uppercase">Program Overview</span>
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 leading-tight">
                                What START Goes Bay Area Is
                            </h3>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-5 text-base sm:text-lg text-gray-300 leading-relaxed">
                                <p>
                                    START Goes Bay Area is an international exchange program that brings a small group of START Munich members to the San Francisco Bay Area.
                                </p>
                                <p>
                                    The trip is built around direct exposure to the local startup ecosystem: meeting people who build, fund, and support companies, visiting organizations on site, and reflecting on what can be transferred back to Munich.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {OVERVIEW_DETAILS.map((item) => (
                                    <div key={item.label} className="sm:pr-8">
                                        <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">
                                            {item.label}
                                        </h4>
                                        <p className="mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BayAreaYearTabs />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="pt-12">
                    <div className="max-w-3xl">
                        <p className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase mb-3">Have Questions?</p>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                            FREQUENTLY ASKED <span className="outline-text">QUESTIONS</span>
                        </h3>
                        <p className="text-gray-400 text-lg mb-4 lg:mb-8">
                            Everything you need to know about START Goes Bay Area.
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        {FAQ_ITEMS.map((item) => (
                            <details
                                key={item.question}
                                className="group bg-white/[0.06] rounded-2xl border border-white/10 overflow-hidden hover:border-brand-pink/30 transition-all duration-300"
                            >
                                <summary className="w-full px-7 py-5 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-colors duration-200 rounded-2xl list-none">
                                    <h4 className="text-lg font-bold text-white pr-8">{item.question}</h4>
                                    <span className="faq-icon text-brand-pink text-2xl flex-shrink-0 transition-transform duration-300">
                                        +
                                    </span>
                                </summary>
                                <div className="px-7 pb-5">
                                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <CTA
                    title={
                        <>
                            Collaborate with{' '}
                            <span className="underline decoration-brand-pink decoration-4 underline-offset-8">
                                START goes Bay Area
                            </span>
                        </>
                    }
                    description="Want to host a session, support future chapters, or connect with the team?"
                    buttons={[
                        { label: 'Contact Team', href: 'mailto:bayarea@startmunich.de', variant: 'primary' },
                    ]}
                />
            </section>
        </main>
    )
}
