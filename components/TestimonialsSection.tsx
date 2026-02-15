
import React from 'react'

export interface TestimonialItem {
    id: string
    name: string
    role: string
    company: string // This can be company name or partner name
    image: string
    story: string
    quote: string
    logo?: string // Optional additional logo (like partner logo)
    logoAlt?: string // Optional alt text for the logo
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
                        className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-pink overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#0f122f]/30"
                    >
                        {/* Image */}
                        <div className="relative h-64 w-full overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Removed gradient overlay */}

                            {/* Partner logo overlay - only if logo is provided */}
                            {item.logo && (
                                <div className="absolute top-4 right-4 bg-white rounded p-2 shadow-lg">
                                    <img
                                        src={item.logo}
                                        alt={item.logoAlt || item.company}
                                        className="w-8 h-8 object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.style.display = 'none'
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Person Info */}
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                                <p className="text-sm text-brand-pink font-semibold mb-1">{item.role}</p>
                                <p className="text-xs text-gray-400">{item.company}</p>
                            </div>

                            {/* Story */}
                            {/* Story */}
                            <div className="pt-4 border-t border-white/10">
                                <blockquote className="border-l-2 border-brand-pink pl-4 py-1">
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {item.story}
                                    </p>
                                </blockquote>
                            </div>
                        </div>

                        {/* Hover effect accent */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1f2345] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
