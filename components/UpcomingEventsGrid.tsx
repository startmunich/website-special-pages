"use client"

import { useState, useEffect } from 'react'

interface LumaEventWrapper {
  api_id: string
  event: {
    id: string
    name: string
    description?: string
    description_md?: string
    cover_url?: string
    start_at: string
    end_at: string
    url: string
    event_type?: string
    timezone: string
  }
  tags: string[]
}

export default function UpcomingEventsGrid() {
  const [events, setEvents] = useState<LumaEventWrapper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUpcomingEvents() {
      try {
        const response = await fetch('/api/luma/upcoming-events')

        if (!response.ok) {
          throw new Error('Failed to fetch upcoming events')
        }

        const data = await response.json()

        // Log the full API response for debugging
        console.log('Upcoming Events API Response:', data)
        console.log('Number of upcoming events:', data.entries?.length || 0)

        // Sort events by date (soonest first)
        const sortedEvents = (data.entries || []).sort((a: LumaEventWrapper, b: LumaEventWrapper) => {
          return new Date(a.event.start_at).getTime() - new Date(b.event.start_at).getTime()
        })

        setEvents(sortedEvents)
      } catch (err) {
        console.error('Error fetching upcoming events:', err)
        setError('Unable to load upcoming events')
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingEvents()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white text-lg">Loading upcoming events...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-white/5 p-4 md:p-8 border border-white/10">
        <div className="text-center py-8">
          <p className="text-gray-400">{error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Make sure LUMA_API_KEY is configured in your environment variables
          </p>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-white/5 p-4 md:p-8 border border-white/10">
        <div className="text-center py-8">
          <p className="text-gray-400">No upcoming events found</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((eventWrapper) => {
          const event = eventWrapper.event

          // Parse the date and handle different formats
          let formattedDate = 'Date unavailable'

          try {
            const dateStr = event.start_at

            if (dateStr) {
              const eventDate = new Date(dateStr)

              if (!isNaN(eventDate.getTime())) {
                formattedDate = eventDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              }
            }
          } catch (err) {
            console.error('Error parsing date:', err, event)
          }

          return (
            <a
              key={eventWrapper.api_id}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20 flex flex-col"
            >
              {/* Event Image */}
              {event.cover_url && (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
                  <img
                    src={event.cover_url}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00002c]/60 via-[#00002c]/15 to-transparent"></div>
                </div>
              )}

              {/* Date Badge - between image and content */}
              <div className="px-4 pt-3">
                <div className="inline-block">
                  <div className="px-3 py-1 rounded-md bg-[#d0006f]/20 border border-[#d0006f]/40">
                    <p className="text-xs text-[#d0006f] font-bold uppercase tracking-wide">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4 pt-2">
                <h3 className="text-base font-bold text-white mb-2 line-clamp-3">
                  {event.name}
                </h3>

                {event.description && (
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                )}

                {/* Link indicator */}
                {/* <div className="flex items-center gap-2 mt-5 text-[#d0006f] text-base font-semibold">
                  <span>View Details</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div> */}
              </div>

              {/* Hover effect accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
