import { NextResponse } from 'next/server'

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_MEMBERS_TABLE_ID = process.env.NOCODB_MEMBERS_TABLE_ID;

interface Member {
  id: number
  name: string
  batch: string
  role: string
  company?: string
  linkedinUrl?: string
  imageUrl: string
  bio?: string
  expertise?: string[]
  achievements?: string
}

// Transform NocoDB record to Member format
function transformNocoDBRecord(record: any): Member {
  // Handle profile pic - NocoDB stores it as an array of attachment objects
  let profilePicUrl = '/placeholder-profile.jpg';
  if (record['Member Picture'] && Array.isArray(record['Member Picture']) && record['Member Picture'][0]) {
    const profilePic = record['Member Picture'][0];
    if (profilePic.signedPath) {
      profilePicUrl = `https://ndb.startmunich.de/${profilePic.signedPath}`;
    }
  }

  const expertise = record.Expertise 
    ? record.Expertise.split(',').map((e: string) => e.trim()).filter(Boolean)
    : undefined;

  return {
    id: record.Id || record.id,
    name: record.Name || 'Unknown',
    batch: record.Batch || '',
    role: record.Role || '',
    company: record.Company || undefined,
    linkedinUrl: record.LinkedIn || undefined,
    imageUrl: profilePicUrl,
    bio: record.Bio || undefined,
    expertise: expertise,
    achievements: record.Achievements || undefined,
  };
}

export async function GET() {
  // If members table is not configured, return empty array
  if (!NOCODB_API_TOKEN || !NOCODB_MEMBERS_TABLE_ID) {
    console.log('Members table not configured in NocoDB');
    return NextResponse.json([]);
  }

  try {
    console.log('Fetching members from NocoDB...');
    
    const response = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_MEMBERS_TABLE_ID}/records?limit=1000&offset=0`,
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
      throw new Error(`NocoDB API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const members = (data.list || []).map(transformNocoDBRecord);
    
    console.log(`Successfully fetched ${members.length} members from NocoDB`);
    return NextResponse.json(members);
    
  } catch (error) {
    console.error('Error fetching from NocoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members from database' },
      { status: 500 }
    );
  }
}
