import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const MEMBER_NETWORK_TABLE_ID = 'mh8taz9b8ne38yg';

export interface MemberNetworkLogo {
  id: string;
  name: string;
  type: string;
  logoUrl: string;
}

function transformRecord(record: any): MemberNetworkLogo {
  let logoUrl = '';

  if (record.Logo && Array.isArray(record.Logo) && record.Logo[0]) {
    const logo = record.Logo[0];
    if (logo.path) {
      logoUrl = `${NOCODB_BASE_URL}/${logo.path}`;
    }
  }

  return {
    id: String(record.Id),
    name: record.Name || 'Company',
    type: record.Type || 'Other',
    logoUrl,
  };
}

export async function GET() {
  if (!NOCODB_API_TOKEN) {
    return NextResponse.json({ error: 'NocoDB not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${MEMBER_NETWORK_TABLE_ID}/records?limit=1000&offset=0`,
      {
        headers: {
          'xc-token': NOCODB_API_TOKEN,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NocoDB API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`NocoDB API error: ${response.status}`);
    }

    const data = await response.json();
    const logos = (data.list || []).map(transformRecord);

    return NextResponse.json(logos);
  } catch (error) {
    console.error('Error fetching member network logos:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
