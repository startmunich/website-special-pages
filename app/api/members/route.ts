import { NextResponse } from 'next/server'
import { mockMembers } from '@/lib/mockMembers'

export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 3600;

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_MEMBERS_TABLE_ID = process.env.NOCODB_MEMBERS_TABLE_ID;

interface Member {
  id: number
  name: string
  batch: string
  role: string
  study?: string
  company?: string
  linkedinUrl?: string
  imageUrl: string
  bio?: string
  expertise?: string[]
  achievements?: string
  gender?: string
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
    gender: record.Gender || undefined,
  };
}

export async function GET() {
  console.log('========== FETCHING ALL MEMBERS ==========');
  console.log('🔍 Environment Variables:');
  console.log('NOCODB_API_TOKEN:', NOCODB_API_TOKEN ? `${NOCODB_API_TOKEN.substring(0, 10)}... (${NOCODB_API_TOKEN.length} chars)` : 'NOT SET');
  console.log('NOCODB_BASE_URL:', NOCODB_BASE_URL);
  console.log('NOCODB_MEMBERS_TABLE_ID:', NOCODB_MEMBERS_TABLE_ID);
  console.log('NOCODB_STARTUPS_TABLE_ID:', process.env.NOCODB_STARTUPS_TABLE_ID);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  // If members table is not configured, return mock data
  if (!NOCODB_API_TOKEN || !NOCODB_MEMBERS_TABLE_ID) {
    console.log('Members table not configured in NocoDB, using mock data');
    return NextResponse.json(mockMembers);
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
        next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
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
