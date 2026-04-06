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

const EVENTS_PER_PAGE = 12

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
  }

  return (
    <div>
      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {currentEvents.map((eventWrapper) => {
          const event = eventWrapper.event

          return (
            <a
              key={eventWrapper.api_id}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/40 flex flex-col"
            >
              {/* Inset rounded image */}
              <div className="p-3 pb-0">
                <div className="relative overflow-hidden rounded-xl bg-black/20">
                  {event.cover_url ? (
                    <img
                      src={event.cover_url}
                      alt={event.name}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="h-36 bg-gradient-to-br from-[#1a1a3e] to-[#0a0a2e] rounded-xl" />
                  )}
                </div>
              </div>

              {/* Text content area */}
              <div className="px-4 pt-4 pb-5 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug line-clamp-2">
                  {event.name}
                </h3>
                {event.description && (
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">
                    {event.description}
                  </p>
                )}
              </div>
            </a>
          )
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-11 h-11 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${
              currentPage === 1
                ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-[#d0006f]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)

              if (!showPage) {
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="text-gray-600 px-1">
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
                  className={`w-11 h-11 rounded-full font-bold text-sm transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-[#d0006f] text-white shadow-lg shadow-[#d0006f]/30'
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
            className={`w-11 h-11 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${
              currentPage === totalPages
                ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-[#d0006f]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

    </div>
  )
}
