import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const lumaApiKey = process.env.LUMA_API_KEY

  if (!lumaApiKey) {
    console.error('LUMA_API_KEY not configured')
    return NextResponse.json({ error: 'Luma API key not configured' }, { status: 500 })
  }

  try {
    // Get current date for 'after' parameter
    const now = new Date()

    // Get date 12 months from now for 'before' parameter
    const twelveMonthsFromNow = new Date()
    twelveMonthsFromNow.setMonth(now.getMonth() + 12)

    const afterDate = now.toISOString()
    const beforeDate = twelveMonthsFromNow.toISOString()

    console.log('Fetching upcoming events')
    console.log('After date (now):', afterDate)
    console.log('Before date (12 months from now):', beforeDate)

    const response = await fetch(
      `https://public-api.luma.com/v1/calendar/list-events?calendar_id=cal-1MxD65bgV0Hcb0r&after=${afterDate}&before=${beforeDate}&pagination_limit=50`,
      {
        headers: {
          'accept': 'application/json',
          'x-luma-api-key': lumaApiKey,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Luma API error: ${response.status}`, errorText)
      throw new Error(`Luma API error: ${response.status}`)
    }

    const data = await response.json()

    // Filter to only include future events (after now)
    const upcomingEvents = (data.entries || []).filter((entry: any) => {
      const eventDate = new Date(entry.event.start_at)
      return eventDate >= now
    })

    console.log('Luma API response received')
    console.log('Total events in range:', data.entries?.length || 0)
    console.log('Upcoming events (filtered):', upcomingEvents.length)

    if (upcomingEvents.length > 0) {
      console.log('First upcoming event date:', upcomingEvents[0].event.start_at)
      console.log('Last upcoming event date:', upcomingEvents[upcomingEvents.length - 1].event.start_at)
    }

    // Return filtered upcoming events
    return NextResponse.json({ ...data, entries: upcomingEvents })
  } catch (error) {
    console.error('Error fetching upcoming events from Luma:', error)
    return NextResponse.json(
      { error: 'Failed to fetch upcoming events', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
