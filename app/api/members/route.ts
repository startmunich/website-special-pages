import { NextResponse } from 'next/server'
import { parseMembers } from '@/lib/parseMembers'

export async function GET() {
  try {
    const members = await parseMembers()
    return NextResponse.json(members)
  } catch (error) {
    console.error('Error in members API:', error)
    return NextResponse.json(
      { error: 'Failed to load members' },
      { status: 500 }
    )
  }
}
