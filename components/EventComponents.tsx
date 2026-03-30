import React from 'react'

// Event Card Component
export interface EventCardProps {
  event: {
    id: string
    name: string
    description: string
    month: string
    image: string
    category: string
  }
  index: number
  hoveredEvent: string | null
  setHoveredEvent: (id: string | null) => void
  isFlagship?: boolean
  className?: string
  onClick?: () => void
}

export const EventCard = ({
  event,
  index,
  hoveredEvent,
  setHoveredEvent,
  isFlagship = false,
  className = '',
  onClick
}: EventCardProps) => {
  const isHovered = hoveredEvent === event.id

  return (
    <div
      onMouseEnter={() => setHoveredEvent(event.id)}
      onMouseLeave={() => setHoveredEvent(null)}
      onClick={onClick}
      className={`
        flex-shrink-0
        ${isFlagship ? 'w-[85%] sm:w-[340px]' : 'w-[80%] sm:w-[300px]'}
        group relative
        ${isFlagship ? 'bg-gradient-to-br from-[#d0006f]/10 via-white/5 to-[#d0006f]/5' : 'bg-white/5'}
        rounded-[1.75rem] overflow-hidden transition-all duration-500
        border-2 ${isHovered ? 'border-[#d0006f]' : 'border-transparent'}
        ${isHovered ? 'scale-[1.02] shadow-2xl shadow-black/40' : 'shadow-xl shadow-black/20'}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Full card background image */}
      <div className={`relative ${isFlagship ? 'h-[240px]' : 'h-[200px]'} w-full overflow-hidden`}>
        <img
          src={event.image}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Top gradient for category badge */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Bottom gradient for text overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Category badge - top left */}
      </div>

      {/* Text content area */}
      <div className="px-6 py-4">
        <span className="inline-block text-[#d0006f] text-xs font-bold uppercase tracking-widest mb-2">{event.category}</span>
        <h3 className="text-lg font-black text-white mb-1 leading-tight">
          {event.name}
        </h3>
        <p className="text-white/40 text-xs font-medium mb-2">{event.month}</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  )
}

// Special Event Card Component
export interface SpecialEventCardProps {
  event: {
    id: string
    name: string
    description: string
    category: string
    image: string
  }
  index?: number
  className?: string
}

export const SpecialEventCard = ({
  event,
  index = 0,
  className = ''
}: SpecialEventCardProps) => {
  return (
    <div
      className={`
        flex-shrink-0 w-[90%] sm:w-[400px]
        group relative
        rounded-[1.75rem] overflow-hidden
        shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40
        transition-all duration-500 hover:scale-[1.02]
        ${className}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Full card image area */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Category badge - top left */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
            {event.category}
          </span>
        </div>

        {/* Bottom text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-black text-white mb-1 leading-tight drop-shadow-lg">
            {event.name}
          </h3>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="bg-[#0a0a2e] px-6 py-4">
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {event.description}
        </p>
      </div>
    </div>
  )
}

// Timeline Marker Component
export interface TimelineMarkerProps {
  eventId: string
  left: string
  color: string
  label: string
  position: 'top' | 'bottom'
  size?: 'sm' | 'lg'
  hoveredEvent: string | null
  onHover: (eventId: string) => void
  onLeave: () => void
}

export const TimelineMarker = ({ 
  eventId, 
  left, 
  color, 
  label, 
  position, 
  size = 'sm', 
  hoveredEvent, 
  onHover, 
  onLeave 
}: TimelineMarkerProps) => {
  const isHovered = hoveredEvent === eventId
  const markerSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
  const labelSize = size === 'lg' ? 'text-sm px-4 py-2' : 'text-xs px-3 py-1.5'
  const positionClass = position === 'top' 
    ? `${size === 'lg' ? '-top-12' : '-top-10'}` 
    : `${size === 'lg' ? '-bottom-12' : '-bottom-10'}`
  
  return (
    <div 
      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer transition-all ${isHovered ? 'scale-150 z-10' : 'hover:scale-125'}`} 
      style={{ left }} 
      onMouseEnter={() => onHover(eventId)}
      onMouseLeave={onLeave}
    >
      <div className="relative">
        <div 
          className={`w-4 h-4 rounded-full transition-all ${isHovered ? 'ring-4' : ''}`} 
          style={{ 
            backgroundColor: color,
            ...(isHovered && { boxShadow: `0 0 0 4px ${color}80` })
          }}
        ></div>
        <div className={`absolute ${positionClass} left-1/2 -translate-x-1/2 whitespace-nowrap`}>
          <div
            className="text-xs px-3.5 py-1.5 rounded-full bg-[#0a0a2e] border border-white/10 shadow-lg shadow-black/20"
          >
            <p className="text-white font-bold">{label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Scroll Indicator Component
export interface ScrollIndicatorProps {
  sliderRef: React.RefObject<HTMLDivElement>
  scrollProgress: number
}

export const ScrollIndicator = ({ sliderRef, scrollProgress }: ScrollIndicatorProps) => (
  <div className="relative h-1.5 bg-white/[0.06] rounded-full mt-8 overflow-hidden">
    <div
      className="absolute h-full rounded-full transition-all duration-200"
      style={{
        background: 'linear-gradient(to right, #d0006f, rgb(236, 72, 153), #d0006f)',
        opacity: 0.5,
        width: `${sliderRef.current ? (sliderRef.current.clientWidth / sliderRef.current.scrollWidth) * 100 : 30}%`,
        left: `${sliderRef.current ? scrollProgress * (1 - sliderRef.current.clientWidth / sliderRef.current.scrollWidth) : 0}%`
      }}
    />
  </div>
)
