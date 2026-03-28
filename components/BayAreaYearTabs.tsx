'use client'

import { useEffect, useMemo, useState } from 'react'
import {
    bayAreaYearContent,
    type BayAreaVisit,
    type BayAreaWeekGroup,
    type BayAreaYearId,
} from '@/lib/startGoesBayAreaData'
import MemberCard from '@/components/MemberCard'

interface Member {
    id: number
    name: string
    imageUrl: string
    linkedinUrl?: string
}

interface BayAreaYearTabsProps {
    activeYear: BayAreaYearId
}

export default function BayAreaYearTabs({ activeYear }: BayAreaYearTabsProps) {
    const [members, setMembers] = useState<Member[]>([])

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

    const weekGroups: BayAreaWeekGroup[] = ['Week 1', 'Week 2']
    const groupedDetailedDays = weekGroups
        .map((weekGroup) => ({
            weekGroup,
            days: activeContent.detailedDays.filter((day) => day.weekGroup === weekGroup),
        }))
        .filter((group) => group.days.length > 0)

    const formatDayWithWeekday = (dateValue: string) => {
        const parsedDate = new Date(dateValue)
        if (Number.isNaN(parsedDate.getTime())) return dateValue

        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(parsedDate)
        return `${weekday} · ${dateValue}`
    }

    const visitBadge = (visitType: BayAreaVisit['visitType']) => {
        if (visitType === 'company') return 'Company Visit'
        if (visitType === 'community') return 'Community Event'
        if (visitType === 'hackathon') return 'Hackathon'
        return 'Person Visit'
    }

    return (
        <div>
            <div className="mb-6 bg-white/5 border border-white/10 p-4 md:p-6">
                <img
                    src={activeContent.groupPictureUrl}
                    alt={`START goes Bay Area ${activeContent.label} group picture`}
                    className="w-full h-56 md:h-72 object-cover border border-white/10"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="md:col-span-3 bg-white/5 border border-white/10 p-6">
                    <h3 className="text-xl font-black text-white mb-4">Year Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {activeContent.highlightVisits.map((highlight) => (
                            <article key={`${activeContent.id}-${highlight.name}`} className="border border-white/10 bg-[#011152]/30">
                                {highlight.websiteUrl ? (
                                    <a
                                        href={highlight.websiteUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block h-full p-4 transition-colors hover:bg-white/[0.06]"
                                    >
                                        <div className="h-14 mb-3 flex items-center justify-start">
                                            <img
                                                src={highlight.logoPath ?? '/startlogo.svg'}
                                                alt={`${highlight.name} logo`}
                                                className="h-12 w-auto max-w-[150px] object-contain"
                                            />
                                        </div>
                                        <h4 className="text-sm font-bold text-white mb-1">{highlight.name}</h4>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">{highlight.context}</p>
                                    </a>
                                ) : (
                                    <div className="p-4">
                                        <div className="h-14 mb-3 flex items-center justify-start">
                                            <img
                                                src={highlight.logoPath ?? '/startlogo.svg'}
                                                alt={`${highlight.name} logo`}
                                                className="h-12 w-auto max-w-[150px] object-contain"
                                            />
                                        </div>
                                        <h4 className="text-sm font-bold text-white mb-1">{highlight.name}</h4>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">{highlight.context}</p>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>

                {activeContent.heroStats.map((stat) => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 p-5">
                        <p className="text-3xl font-black text-white mb-2">{stat.value}</p>
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white/5 border border-white/10 p-6 md:p-8 mb-8">
                <h3 className="text-2xl font-black text-white mb-2">Trip Timeline</h3>
                <p className="text-sm text-gray-400 mb-8">{activeContent.timelineIntro}</p>

                {groupedDetailedDays.length > 0 ? (
                    <div className="space-y-8">
                        {groupedDetailedDays.map((group) => (
                            <section key={`${activeContent.id}-${group.weekGroup}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="inline-flex items-center px-3 py-1 border border-brand-pink/60 bg-brand-pink/20 text-xs font-bold uppercase tracking-widest text-brand-pink">
                                        {group.weekGroup}
                                    </span>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest">{group.days.length} days</p>
                                </div>

                                <div className="overflow-x-auto pb-2">
                                    <div className="flex gap-4 min-w-max">
                                        {group.days.map((day) => (
                                            <article
                                                key={`${activeContent.id}-${group.weekGroup}-${day.date}`}
                                                className="w-[320px] sm:w-[360px] border border-white/10 bg-[#011152]/30 p-5"
                                            >
                                                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-1">{formatDayWithWeekday(day.date)}</p>
                                                <h4 className="text-lg font-bold text-white mb-1">{day.heading}</h4>
                                                <p className="text-sm text-gray-300 leading-relaxed">{day.subheading}</p>

                                                <ul className="mt-5 space-y-3 border-t border-white/10 pt-4">
                                                    {day.visits.map((visit) => {
                                                        const visitHref = visit.visitType === 'company'
                                                            ? visit.websiteUrl
                                                            : visit.visitType === 'person'
                                                                ? visit.personLinkedInUrl
                                                                : undefined

                                                        const visitBody = (
                                                            <>
                                                                <span className="inline-flex items-center px-1.5 py-0.5 border border-brand-pink/50 bg-brand-pink/15 text-[9px] font-bold uppercase tracking-wide text-brand-pink mb-2">
                                                                    {visitBadge(visit.visitType)}
                                                                </span>

                                                                <div className="flex items-center gap-2 text-sm text-gray-200 whitespace-nowrap overflow-x-auto">
                                                                    {visit.visitType === 'company' && visit.logoPath && (
                                                                        <img
                                                                            src={visit.logoPath}
                                                                            alt={`${visit.name} logo`}
                                                                            className="w-5 h-5 object-contain flex-shrink-0"
                                                                        />
                                                                    )}
                                                                    <span className="font-semibold text-white">{visit.name}</span>
                                                                    <span className="text-gray-400">· {visit.location}</span>
                                                                </div>

                                                                <p className="text-gray-300 mt-1">{visit.description}</p>
                                                                {visit.note ? <p className="text-gray-400 mt-1">{visit.note}</p> : null}
                                                            </>
                                                        )

                                                        return (
                                                            <li key={`${activeContent.id}-${day.date}-${visit.name}-${visit.location}`} className="text-sm text-gray-200">
                                                                {visitHref ? (
                                                                    <a
                                                                        href={visitHref}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="block rounded-md border border-white/10 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.08]"
                                                                    >
                                                                        {visitBody}
                                                                    </a>
                                                                ) : null}
                                                                {!visitHref ? <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">{visitBody}</div> : null}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className="border border-white/10 bg-[#011152]/30 p-5">
                        <p className="text-sm text-gray-200 leading-relaxed">
                            {activeContent.detailedVisitsPreviewText ?? 'Detailed schedule coming soon.'}
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
                <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                    <h3 className="text-2xl font-black text-white mb-2">Hosts & Partners</h3>
                    <p className="text-sm text-gray-400 mb-6">{activeContent.hostsIntro}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {activeContent.hosts.map((host) => (
                            <div
                                key={`${activeContent.id}-${host.name}`}
                                className="h-20 bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center px-3 gap-2"
                            >
                                {host.logoPath && (
                                    <img
                                        src={host.logoPath}
                                        alt={`${host.name} logo`}
                                        className="h-8 w-8 object-contain flex-shrink-0"
                                    />
                                )}
                                <p className="text-sm font-bold text-gray-100 uppercase tracking-wide line-clamp-2">{host.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                    <h3 className="text-2xl font-black text-white mb-2">Orga Team</h3>
                    <p className="text-sm text-gray-400 mb-6">{activeContent.teamIntro}</p>

                    {activeContent.teamMembers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {activeContent.teamMembers.map((member) => {
                                const memberData = getTeamMemberData(member.name)
                                // Fallback: show team member even if not found in API (shows placeholder image)
                                if (memberData) {
                                    return (
                                        <MemberCard
                                            key={`${activeContent.id}-${member.name}`}
                                            name={member.name}
                                            role={member.role}
                                            imageUrl={memberData.imageUrl}
                                            linkedinUrl={memberData.linkedinUrl}
                                        />
                                    )
                                } else {
                                    // Fallback for team members not in API yet
                                    return (
                                        <MemberCard
                                            key={`${activeContent.id}-${member.name}`}
                                            name={member.name}
                                            role={member.role}
                                            imageUrl="/batch.jpeg"
                                        />
                                    )
                                }
                            })}
                        </div>
                    ) : (
                        <div className="border border-white/10 bg-[#011152]/30 p-5">
                            <p className="text-sm text-gray-200">Team announcement coming soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
