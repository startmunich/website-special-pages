interface BayAreaYearPreviewProps {
    yearLabel: string
}

export default function BayAreaYearPreview({ yearLabel }: BayAreaYearPreviewProps) {
    return (
        <section className="min-h-[420px] flex items-center justify-center">
            <div className="w-full max-w-4xl border border-white/15 bg-white/5 p-10 md:p-14 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-pink mb-5">Preview</p>
                <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                    START goes Bay Area {yearLabel}
                </h3>
                <p className="text-lg md:text-xl text-gray-200">
                    Full program details will be announced in Fall 2026.
                </p>
            </div>
        </section>
    )
}