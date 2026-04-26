import { NextResponse } from 'next/server';

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_WAITLIST_TABLE_ID = process.env.NOCODB_WAITLIST_TABLE_ID;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!NOCODB_API_TOKEN || !NOCODB_WAITLIST_TABLE_ID) {
    console.error('Waitlist NocoDB not configured - missing API token or table ID');
    return NextResponse.json(
      { error: 'Waitlist is not configured' },
      { status: 500 }
    );
  }

  let email: string | undefined;
  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? body.email.trim() : undefined;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_WAITLIST_TABLE_ID}/records`,
      {
        method: 'POST',
        headers: {
          'xc-token': NOCODB_API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          SignedUpAt: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NocoDB waitlist error: ${response.status} ${response.statusText}`, errorText);
      return NextResponse.json(
        { error: 'Could not save your email. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error writing to NocoDB waitlist:', error);
    return NextResponse.json(
      { error: 'Could not save your email. Please try again later.' },
      { status: 500 }
    );
  }
}
