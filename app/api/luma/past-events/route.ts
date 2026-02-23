import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const lumaApiKey = process.env.LUMA_API_KEY

  if (!lumaApiKey) {
    console.error('LUMA_API_KEY not configured')
    return NextResponse.json({ error: 'Luma API key not configured' }, { status: 500 })
  }

  try {
    // Get current date for 'before' parameter
    const now = new Date()

    // Get date from 18 months ago for 'after' parameter to get recent past events
    const eighteenMonthsAgo = new Date()
    eighteenMonthsAgo.setMonth(now.getMonth() - 18)

    const beforeDate = now.toISOString()
    const afterDate = eighteenMonthsAgo.toISOString()

    console.log('Fetching latest past events')
    console.log('After date (18 months ago):', afterDate)
    console.log('Before date (now):', beforeDate)

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

    // Filter to only include past events (before now)
    const pastEvents = (data.entries || []).filter((entry: any) => {
      const eventDate = new Date(entry.event.start_at)
      return eventDate < now
    })

    console.log('Luma API response received')
    console.log('Total events in range:', data.entries?.length || 0)
    console.log('Past events (filtered):', pastEvents.length)

    if (pastEvents.length > 0) {
      console.log('First past event date:', pastEvents[0].event.start_at)
      console.log('Last past event date:', pastEvents[pastEvents.length - 1].event.start_at)
    }

    // Return filtered past events
    return NextResponse.json({ ...data, entries: pastEvents })
  } catch (error) {
    console.error('Error fetching past events from Luma:', error)
    return NextResponse.json(
      { error: 'Failed to fetch past events', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
