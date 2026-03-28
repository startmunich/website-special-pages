'use client'

import { useState } from 'react'
import { bayAreaYearContent, type BayAreaYearId } from '@/lib/startGoesBayAreaData'

export default function BayAreaYearTabs() {
    const [activeYear, setActiveYear] = useState<BayAreaYearId>('2026')

    const activeContent = bayAreaYearContent.find((item) => item.id === activeYear) ?? bayAreaYearContent[0]

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-8">
                {bayAreaYearContent.map((year) => {
                    const isActive = year.id === activeYear

                    return (
                        <button
                            key={year.id}
                            type="button"
                            onClick={() => setActiveYear(year.id)}
                            className={`px-4 py-2 border text-sm font-bold uppercase tracking-wide transition-colors ${isActive
                                ? 'bg-brand-pink text-white border-brand-pink'
                                : 'bg-white/5 text-gray-300 border-white/15 hover:bg-white/10'
                                }`}
                        >
                            {year.label}
                            {year.isPreview ? <span className="ml-2 text-xs opacity-80">Preview</span> : null}
                        </button>
                    )
                })}
            </div>

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
                            <article
                                key={`${activeContent.id}-${highlight.name}`}
                                className="border border-white/10 bg-[#011152]/30 p-4"
                            >
                                <h4 className="text-sm font-bold text-white mb-1">{highlight.name}</h4>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">{highlight.context}</p>
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

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                    <h3 className="text-2xl font-black text-white mb-2">Trip Timeline</h3>
                    <p className="text-sm text-gray-400 mb-8">{activeContent.timelineIntro}</p>

                    <div className="relative pl-7 border-l border-white/20 space-y-8">
                        {activeContent.timelineMilestones.map((milestone) => (
                            <article key={`${activeContent.id}-${milestone.date}-${milestone.title}`} className="relative">
                                <span className="absolute -left-[34px] top-1.5 w-3 h-3 rounded-full bg-brand-pink" />
                                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-1">{milestone.date}</p>
                                <h4 className="text-lg font-bold text-white mb-1.5">{milestone.title}</h4>
                                <p className="text-sm text-gray-300 leading-relaxed">{milestone.description}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                    <h3 className="text-2xl font-black text-white mb-2">Detailed Bay Area Visits</h3>
                    <p className="text-sm text-gray-400 mb-8">{activeContent.detailedVisitsIntro}</p>

                    {activeContent.detailedDays.length > 0 ? (
                        <div className="space-y-6">
                            {activeContent.detailedDays.map((day) => (
                                <article key={`${activeContent.id}-${day.date}`} className="border border-white/10 bg-[#011152]/30 p-5">
                                    <p className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-1">{day.date}</p>
                                    <h4 className="text-base font-bold text-white mb-1">{day.theme}</h4>
                                    <ul className="mt-4 space-y-3">
                                        {day.visits.map((visit) => (
                                            <li key={`${activeContent.id}-${day.date}-${visit.time}-${visit.name}`} className="text-sm text-gray-200">
                                                <span className="font-bold text-white">{visit.time}</span>
                                                <span className="text-gray-400"> · </span>
                                                <div className="inline-flex items-center gap-2">
                                                    {visit.logoPath && (
                                                        <img
                                                            src={visit.logoPath}
                                                            alt={`${visit.name} logo`}
                                                            className="w-5 h-5 object-contain flex-shrink-0"
                                                        />
                                                    )}
                                                    <span className="font-semibold text-white">{visit.name}</span>
                                                </div>
                                                <span className="text-gray-400"> · {visit.location}</span>
                                                {visit.note ? <p className="text-gray-400 mt-1">{visit.note}</p> : null}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
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
                        <div className="space-y-3">
                            {activeContent.teamMembers.map((member) => (
                                <article
                                    key={`${activeContent.id}-${member.name}`}
                                    className="bg-[#011152]/30 border border-white/10 p-4 flex items-center justify-between gap-3"
                                >
                                    <h4 className="text-sm font-bold text-white">{member.name}</h4>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">{member.role}</p>
                                </article>
                            ))}
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
