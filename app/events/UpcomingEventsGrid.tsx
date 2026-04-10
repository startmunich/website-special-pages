"use client"

import { useState, useEffect } from 'react'
import UpcomingEventTile from '@/components/UpcomingEventTile'

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
  const [showAll, setShowAll] = useState(false)
  const mobileLimit = 3

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {events.map((eventWrapper, index) => {
          const event = eventWrapper.event
          const hiddenOnMobile = !showAll && index >= mobileLimit

          // Format date for subheader
          let formattedDate = ''
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
          } catch {
            // ignore
          }

          return (
            <UpcomingEventTile
              key={eventWrapper.api_id}
              href={event.url}
              title={event.name}
              date={formattedDate}
              imageUrl={event.cover_url}
              hiddenClassName={hiddenOnMobile ? 'hidden sm:flex' : ''}
            />
          )
        })}
      </div>

      {/* See more button - mobile only */}
      {!showAll && events.length > mobileLimit && (
        <div className="md:hidden mt-6 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-white font-bold text-sm hover:bg-[#d0006f] hover:border-[#d0006f] transition-all duration-300"
          >
            See {events.length - mobileLimit} more events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
