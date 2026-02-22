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

const EVENTS_PER_PAGE = 6

export default function PastEventsGrid() {
  const [events, setEvents] = useState<LumaEventWrapper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchPastEvents() {
      try {
        const response = await fetch('/api/luma/past-events')

        if (!response.ok) {
          throw new Error('Failed to fetch past events')
        }

        const data = await response.json()

        // Log the full API response for debugging
        console.log('Luma API Response:', data)
        console.log('Number of events:', data.entries?.length || 0)

        // Sort events by date (most recent first)
        const sortedEvents = (data.entries || []).sort((a: LumaEventWrapper, b: LumaEventWrapper) => {
          return new Date(b.event.start_at).getTime() - new Date(a.event.start_at).getTime()
        })

        setEvents(sortedEvents)
      } catch (err) {
        console.error('Error fetching past events:', err)
        setError('Unable to load past events')
      } finally {
        setLoading(false)
      }
    }

    fetchPastEvents()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white text-lg">Loading past events...</div>
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
          <p className="text-gray-400">No past events found</p>
        </div>
      </div>
    )
  }

  // Calculate pagination
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE)
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE
  const endIndex = startIndex + EVENTS_PER_PAGE
  const currentEvents = events.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the events section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentEvents.map((eventWrapper) => {
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
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20"
            >
              {/* Event Image */}
              {event.cover_url && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={event.cover_url}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                {/* Date Badge */}
                <div className="inline-block mb-3">
                  <div className="px-3 py-1 rounded-lg bg-[#d0006f]/20 border border-[#d0006f]/40">
                    <p className="text-xs text-[#d0006f] font-bold uppercase tracking-wide">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {event.name}
                </h3>

                {event.description && (
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                )}

                {/* Link indicator */}
                <div className="flex items-center gap-2 mt-4 text-[#d0006f] text-sm font-semibold">
                  <span>View Details</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Hover effect accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </a>
          )
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === 1
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-[#d0006f] hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)

              if (!showPage) {
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="text-gray-500 px-2">
                      ...
                    </span>
                  )
                }
                return null
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-[#d0006f] text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === totalPages
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-[#d0006f] hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center mt-4 text-sm text-gray-400">
        Showing {startIndex + 1}-{Math.min(endIndex, events.length)} of {events.length} events
      </div>
    </div>
  )
}
