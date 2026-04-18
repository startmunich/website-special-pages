'use client'

import { useEffect, useMemo, useState } from 'react'
import { bayAreaYearContent } from '@/lib/startGoesBayAreaData'
import { useInView } from '@/lib/hooks'
import MemberCard from '@/components/MemberCard'
import BayAreaYearPreview from './BayAreaYearPreview'
import type { BayAreaYearId } from '../types'
interface BayAreaYearTabsProps {
    activeYear: BayAreaYearId
}


interface Member {
    id: number
    name: string
    imageUrl: string
    linkedinUrl?: string
}

const KEY_VISITS_COPY = 'A few of the most memorable stops from the year.'
const PROGRAM_STATS_COPY = 'A quick numerical snapshot.'
const HOSTS_COPY = 'A curated look at the startups, teams, and organizations we visited across the Bay Area.'
const TEAM_COPY = 'The organizing team behind this Bay Area year.'
const HERO_IMAGE_2026 = '/bayarea/years/2026.png'

const parseNumericStat = (value: string) => {
    const match = value.match(/\d+/)
    if (!match || match.index === undefined) {
        return null
    }

    const numberPart = match[0]
    const prefix = value.slice(0, match.index)
    const suffix = value.slice(match.index + numberPart.length)

    return {
        number: Number.parseInt(numberPart, 10),
        prefix,
        suffix,
    }
}

function AnimatedStatValue({ value, animate, duration = 900 }: { value: string; animate: boolean; duration?: number }) {
    const parsed = parseNumericStat(value)
    const targetNumber = parsed?.number ?? null
    const [animatedNumber, setAnimatedNumber] = useState(targetNumber ?? 0)

    useEffect(() => {
        if (targetNumber === null || targetNumber <= 0) {
            return
        }

        if (!animate) {
            setAnimatedNumber(targetNumber)
            return
        }

        let frameId = 0
        const start = performance.now()

        setAnimatedNumber(0)

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const easedProgress = 1 - Math.pow(1 - progress, 3)
            setAnimatedNumber(Math.round(targetNumber * easedProgress))

            if (progress < 1) {
                frameId = window.requestAnimationFrame(tick)
            }
        }

        frameId = window.requestAnimationFrame(tick)

        return () => {
            window.cancelAnimationFrame(frameId)
        }
    }, [animate, targetNumber, duration])

    if (!parsed) {
        return <>{value}</>
    }

    const numericDisplay = animate ? animatedNumber : parsed.number
    const suffixClassName = parsed.suffix.includes('+') ? 'text-brand-pink' : ''

    return (
        <>
            {parsed.prefix}
            {numericDisplay}
            {parsed.suffix ? <span className={suffixClassName}>{parsed.suffix}</span> : null}
        </>
    )
}

export default function BayAreaYearTabs({ activeYear }: BayAreaYearTabsProps) {
    const [members, setMembers] = useState<Member[]>([])
    const factsView = useInView(0.05)

    const activeContent = useMemo(
        () => bayAreaYearContent.find((item) => item.id === activeYear) ?? bayAreaYearContent[0],
        [activeYear]
    )

    // Fetch members on mount
    useEffect(() => {
        const loadMembers = async () => {
            try {
                const response = await fetch('/api/members')
                if (!response.ok) throw new Error('Failed to fetch members')
                const data = await response.json()
                setMembers(data)
            } catch (error) {
                console.error('Error fetching members:', error)
                setMembers([])
            }
        }
        loadMembers()
    }, [])

    // Get team member data from API by matching names
    const getTeamMemberData = (name: string) => {
        return members.find(m => m.name.toLowerCase() === name.toLowerCase())
    }

    if (activeContent.isPreview) {
        return <BayAreaYearPreview yearLabel={activeContent.label} imageUrl={HERO_IMAGE_2026} />
    }

    return (
        <div ref={factsView.ref}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`mb-10 transition-all duration-700 ${factsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="text-brand-pink text-sm font-bold tracking-[0.3em] uppercase">Program</span>
                    <h3 className="text-4xl sm:text-5xl font-black text-white mt-3">
                        PROGRAM HIGHLIGHTS <span className="text-brand-pink">{activeContent.label}</span>
                    </h3>
                    <p className="text-sm text-gray-400 mt-3 max-w-3xl">
                        A compact view of the key visits, program numbers, partner ecosystem, and the team behind this year.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6 items-stretch">
                    <div className={`xl:col-span-7 transition-all duration-700 delay-100 ${factsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative h-full overflow-hidden rounded-[2rem] border border-brand-pink/25 bg-gradient-to-br from-brand-pink/20 via-brand-pink/10 to-transparent p-6 sm:p-8 shadow-[0_24px_70px_rgba(208,0,111,0.12)]">
                            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[72px] bg-brand-pink/10" />
                            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full border-2 border-brand-pink/20" />

                            <div className="relative flex h-full flex-col gap-5">
                                <div>
                                    <span className="inline-flex items-center rounded-full border border-brand-pink/40 bg-brand-pink/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-pink mb-4">
                                        Visits
                                    </span>
                                    <h3 className="text-xl font-black text-white mb-2">Key Visits</h3>
                                    <p className="text-sm text-gray-300">{KEY_VISITS_COPY}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {activeContent.highlightVisits.map((highlight) => (
                                        <article
                                            key={`${activeContent.id}-${highlight.name}`}
                                            className="group overflow-hidden rounded-[1.4rem] border border-white/15 bg-black/10 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-pink/40 hover:bg-white/[0.08]"
                                        >
                                            {highlight.websiteUrl ? (
                                                <a
                                                    href={highlight.websiteUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="block h-full w-full"
                                                    aria-label={`${highlight.name} website`}
                                                >
                                                    <div className="mb-3 flex h-14 items-center justify-start rounded-xl bg-white/[0.04] px-3">
                                                        <img
                                                            src={highlight.logoPath ?? '/startlogo.svg'}
                                                            alt={`${highlight.name} logo`}
                                                            className="h-10 w-auto max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                                        />
                                                    </div>
                                                    <h4 className="text-sm font-bold text-white mb-1">{highlight.name}</h4>
                                                    <p className="text-xs text-gray-300 uppercase tracking-wide">{highlight.context}</p>
                                                </a>
                                            ) : (
                                                <>
                                                    <div className="mb-3 flex h-14 items-center justify-start rounded-xl bg-white/[0.04] px-3">
                                                        <img
                                                            src={highlight.logoPath ?? '/startlogo.svg'}
                                                            alt={`${highlight.name} logo`}
                                                            className="h-10 w-auto max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                                        />
                                                    </div>
                                                    <h4 className="text-sm font-bold text-white mb-1">{highlight.name}</h4>
                                                    <p className="text-xs text-gray-300 uppercase tracking-wide">{highlight.context}</p>
                                                </>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`xl:col-span-5 transition-all duration-700 delay-200 ${factsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-pink/10 blur-2xl" />
                            <div className="relative flex h-full flex-col gap-4">
                                <div>
                                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-200 mb-4">
                                        Snapshot
                                    </span>
                                    <h3 className="text-xl font-black text-white mb-2">Program Stats</h3>
                                    <p className="text-sm text-gray-300">{PROGRAM_STATS_COPY}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                                    {activeContent.heroStats.map((stat, index) => (
                                        <div
                                            key={stat.label}
                                            className={`rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 transition-all duration-700 hover:border-brand-pink/30 hover:bg-white/[0.07] ${factsView.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${index === 0 ? 'delay-300' : index === 1 ? 'delay-400' : 'delay-500'}`}
                                        >
                                            <div className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                                            <div className="text-4xl sm:text-5xl font-black text-white tabular-nums">
                                                <AnimatedStatValue
                                                    key={`${activeContent.id}-${stat.label}-${stat.value}`}
                                                    value={stat.value}
                                                    animate={factsView.visible}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
                <div className="relative">
                    <div className="pointer-events-none absolute -top-10 left-8 h-24 w-24 rounded-full bg-brand-pink/20 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-8 right-10 h-20 w-20 rounded-full bg-blue-400/10 blur-2xl" />

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                        <div className="relative overflow-hidden rounded-[2rem] border border-brand-pink/25 bg-gradient-to-br from-brand-pink/20 via-white/[0.06] to-transparent p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] xl:col-span-7">
                            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-brand-pink/30" />
                            <div className="absolute bottom-0 left-0 h-1 w-32 bg-gradient-to-r from-brand-pink/90 to-transparent" />

                            <span className="inline-flex items-center rounded-full border border-brand-pink/40 bg-brand-pink/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-pink mb-4">
                                Ecosystem
                            </span>
                            <h3 className="text-2xl font-black text-white mb-2">Startups, Teams & Hosts We Visited</h3>
                            <p className="text-sm text-gray-300 mb-6">{HOSTS_COPY}</p>

                            <div
                                className="grid gap-3"
                                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}
                            >
                                {activeContent.hosts.map((host) => (
                                    <div
                                        key={`${activeContent.id}-${host.name}`}
                                        className="group min-h-24 bg-black/10 border border-white/15 rounded-[1.25rem] flex flex-col items-center justify-center text-center px-3 py-4 gap-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-pink/40 hover:bg-white/[0.08]"
                                    >
                                        {host.websiteUrl ? (
                                            <a
                                                href={host.websiteUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex h-full w-full flex-col items-center justify-center gap-2"
                                                aria-label={`${host.name} website`}
                                            >
                                                {host.logoPath && (
                                                    <img
                                                        src={host.logoPath}
                                                        alt={`${host.name} logo`}
                                                        className="h-10 w-auto max-w-[90px] object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
                                                    />
                                                )}
                                                <p className="text-sm font-bold text-gray-100 uppercase tracking-wide line-clamp-2">{host.name}</p>
                                            </a>
                                        ) : (
                                            <>
                                                {host.logoPath && (
                                                    <img
                                                        src={host.logoPath}
                                                        alt={`${host.name} logo`}
                                                        className="h-10 w-auto max-w-[90px] object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
                                                    />
                                                )}
                                                <p className="text-sm font-bold text-gray-100 uppercase tracking-wide line-clamp-2">{host.name}</p>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-white/[0.07] via-white/[0.04] to-transparent p-5 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] xl:col-span-5">
                            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full border border-white/20" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-pink/60 to-transparent" />

                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-200 mb-4">
                                People
                            </span>
                            <h3 className="text-xl font-black text-white mb-2">Orga Team</h3>
                            <p className="text-xs text-gray-300 mb-5">{TEAM_COPY}</p>

                            {activeContent.teamMembers.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {activeContent.teamMembers.map((member) => {
                                        const memberData = getTeamMemberData(member.name)
                                        if (memberData) {
                                            return (
                                                <MemberCard
                                                    key={`${activeContent.id}-${member.name}`}
                                                    name={member.name}
                                                    role={member.role}
                                                    imageUrl={memberData.imageUrl}
                                                    linkedinUrl={memberData.linkedinUrl}
                                                    compact
                                                />
                                            )
                                        }

                                        return (
                                            <MemberCard
                                                key={`${activeContent.id}-${member.name}`}
                                                name={member.name}
                                                role={member.role}
                                                imageUrl="/batch.jpeg"
                                                compact
                                            />
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="border border-white/10 bg-white/5 rounded-[1.5rem] p-5 hover:border-brand-pink/30 hover:bg-white/[0.07] transition-all duration-300">
                                    <p className="text-sm text-gray-200">Team announcement coming soon.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
