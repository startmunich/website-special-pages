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
        ${isFlagship ? 'w-[95%] sm:w-[420px]' : 'w-[90%] sm:w-[360px]'}
        group relative
        ${isFlagship ? 'bg-gradient-to-br from-[#d0006f]/10 via-white/5 to-[#d0006f]/5' : 'bg-white/5'}
        ${isHovered ? 'bg-white/10' : ''}
        border-2
        ${isHovered ? 'border-[#d0006f]' : 'border-white/10'}
        rounded-lg overflow-hidden transition-all duration-300
        ${isFlagship
          ? `${isHovered ? 'shadow-2xl shadow-[#d0006f]/20' : ''}`
          : `${isHovered ? 'shadow-xl shadow-[#d0006f]/20' : ''}`
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Flagship left accent bar */}
      {isFlagship && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d0006f]"></div>
      )}

      {/* Event Image */}
      <div className="relative h-72 w-full overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">
          {event.name}
        </h3>
        
        {isFlagship && (
          <p className="text-xs font-semibold text-[#d0006f] mb-3 uppercase tracking-wide">Flagship Event</p>
        )}
        
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-[#d0006f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-base font-semibold text-[#d0006f]">
            {event.month}, {event.category}
          </span>
        </div>

        <p className="text-base text-gray-400 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Hover effect accent */}
      <div className={`absolute bottom-0 left-0 w-full ${isFlagship ? 'h-2' : 'h-1'} bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
      
      {/* Flagship glow effect */}
      {isFlagship && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d0006f]/10 via-pink-500/10 to-[#d0006f]/10 blur-xl"></div>
        </div>
      )}
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
        bg-white/5 hover:bg-white/10 
        border border-white/10 hover:border-[#d0006f] 
        rounded-lg overflow-hidden 
        transition-all duration-300 
        hover:shadow-xl hover:shadow-[#d0006f]/20
        ${className}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Event Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-white">
            {event.name}
          </h3>
          <span className="text-xs text-[#d0006f] font-bold uppercase tracking-wide">
            {event.category}
          </span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Hover effect accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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
            className="text-xs px-3 py-1.5 rounded-lg bg-[#1a1a3e] border border-white/20"
          >
            <p className="text-white font-medium">{label}</p>
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
  <div className="relative h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
    <div 
      className="absolute h-full rounded-full transition-all duration-200"
      style={{
        background: 'linear-gradient(to right, #d0006f, rgb(236, 72, 153), #d0006f)',
        opacity: 0.4,
        width: `${sliderRef.current ? (sliderRef.current.clientWidth / sliderRef.current.scrollWidth) * 100 : 30}%`,
        left: `${sliderRef.current ? scrollProgress * (1 - sliderRef.current.clientWidth / sliderRef.current.scrollWidth) : 0}%`
      }}
    />
  </div>
)
