import { NextResponse } from 'next/server';
import { parseStartupsCSV } from '@/lib/parseStartups';

export async function GET() {
  try {
    const companies = parseStartupsCSV();
    return NextResponse.json(companies);
  } catch (error) {
    console.error('Error in startups API:', error);
    return NextResponse.json({ error: 'Failed to load startups' }, { status: 500 });
  }
}
