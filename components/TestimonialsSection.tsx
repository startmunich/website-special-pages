
import React from 'react'

export interface TestimonialItem {
    id: string
    name: string
    role: string
    company: string // This can be company name or partner name
    image: string
    story: string
    quote?: string
    logos?: { src: string; url?: string }[] // Optional logos with optional links
}

interface TestimonialsSectionProps {
    title: React.ReactNode
    description: string
    items: TestimonialItem[]
    className?: string
}

export default function TestimonialsSection({
    title,
    description,
    items,
    className = "mb-20"
}: TestimonialsSectionProps) {
    return (
        <div className={className}>
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                    {title}
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white/5 border border-white/10 overflow-hidden"
                    >
                        {/* Image */}
                        <div className="relative h-64 w-full overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Person Info with Logo */}
                            <div className="mb-4 flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                                    <p className="text-sm text-brand-pink font-semibold mb-1">{item.role}</p>
                                    <p className="text-xs text-gray-400">{item.company}</p>
                                </div>
                                {item.logos && item.logos.length > 0 && (
                                    <div className="flex flex-col gap-2 flex-shrink-0 ml-4">
                                        {item.logos.map((logo, index) => {
                                            const logoImg = (
                                                <img
                                                    src={logo.src}
                                                    alt={item.company}
                                                    className="h-5 w-auto w-auto object-contain"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement
                                                        target.style.display = 'none'
                                                    }}
                                                />
                                            )
                                            return logo.url ? (
                                                <a key={index} href={logo.url} target="_blank" rel="noopener noreferrer" className="rounded p-1 shadow-lg hover:opacity-80 transition-opacity">
                                                    {logoImg}
                                                </a>
                                            ) : (
                                                <div key={index} className="rounded p-1 shadow-lg">
                                                    {logoImg}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Story */}
                            <div className="pt-4 border-t border-white/10">
                                <blockquote className="border-l-2 border-brand-pink pl-4 py-1">
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {item.story}
                                    </p>
                                </blockquote>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
