interface BayAreaYearPreviewProps {
    yearLabel: string
    imageUrl: string
}

export default function BayAreaYearPreview({ yearLabel, imageUrl }: BayAreaYearPreviewProps) {
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-pink/30 shadow-2xl shadow-brand-pink/10">
                <div className="absolute inset-0">
                    <img
                        src={imageUrl}
                        alt="START goes Bay Area preview"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00002c]/95 via-[#00002c]/78 to-[#00002c]/35" />
                </div>

                <div className="relative p-8 md:p-14 flex flex-col lg:flex-row items-start lg:items-center gap-8">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-pink/20 border border-brand-pink/50 text-brand-pink text-xs font-bold uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse"></span>
                                Preview
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest">
                                March 2027
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                            START goes Bay Area<br />
                            <span className="text-brand-pink">{yearLabel}</span>
                        </h2>

                        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-6">
                            Full program details will be announced this fall.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                disabled
                                aria-disabled="true"
                                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-pink opacity-60 text-white font-bold rounded-xl cursor-not-allowed"
                            >
                                <span>Opens in Fall</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2 text-white/50 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>March 2027</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}