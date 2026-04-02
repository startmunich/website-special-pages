import { NextResponse } from 'next/server'

export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 3600

export async function GET(request: Request) {
  const url = new URL(request.url)
  const termStartYears = url.searchParams.get('termStartYears') || '2024,2025'

  const API_KEY = process.env.STARTMUNICH_API_KEY || 'YOUR_API_KEY_PLACEHOLDER'

  try {
    const response = await fetch(
      `https://my.startmunich.de/api/v1/public/board?termStartYears=${encodeURIComponent(termStartYears)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Board API fetch error', response.status, response.statusText, errorText)
      return NextResponse.json({ error: 'Failed to fetch board data' }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error fetching board data', error)
    return NextResponse.json({ error: 'Error fetching board data' }, { status: 500 })
  }
}
