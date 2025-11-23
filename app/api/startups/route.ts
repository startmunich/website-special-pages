import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_TABLE_ID = process.env.NOCODB_STARTUPS_TABLE_ID;

interface Founder {
  name: string
  role: string
  batch: string
  imageUrl: string
  linkedinUrl?: string
}

interface Company {
  id: number
  name: string
  website: string
  summary: string
  description: string
  logoUrl: string
  foundingYear: number | string
  category: string[]
  founders: Founder[]
  totalRaised?: string
  employees?: number
  isSpotlight?: boolean
  isYCombinator?: boolean
  companyLinkedin?: string
  investmentRound?: string
  milestones?: string
  supportingPrograms?: string
}

// Transform NocoDB record to Company format
function transformNocoDBRecord(record: any): Company {
  const founders: Founder[] = [];
  const memberName = record['STARTMunich Member'];
  if (memberName) {
    // Handle profile pic - NocoDB stores it as an array of attachment objects
    let profilePicUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&size=80&background=4f46e5&color=fff`;
    if (record['Member Picture'] && Array.isArray(record['Member Picture']) && record['Member Picture'][0]) {
      const profilePic = record['Member Picture'][0];
      if (profilePic.signedPath) {
        profilePicUrl = `https://ndb.startmunich.de/${profilePic.signedPath}`;
      }
    }
    
    const memberBatch = record.Batch || record['Member Batch'] || '';
    
    founders.push({
      name: memberName,
      role: record['Company Role'] || 'Founder',
      batch: memberBatch.trim(),
      imageUrl: profilePicUrl,
      linkedinUrl: record['Member Linkedin'] || undefined
    });
  }

  const categories = record.Chategory 
    ? record.Chategory.split(',').map((c: string) => c.trim()).filter(Boolean)
    : ['Other'];

  // Handle company logo - NocoDB stores it as an array of attachment objects
  let logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(record['Startup Name'] || 'Company')}&size=300&background=00002c&color=fff&bold=true&font-size=0.4`;
  if (record['Company Logo'] && Array.isArray(record['Company Logo']) && record['Company Logo'][0]) {
    const logo = record['Company Logo'][0];
    if (logo.signedPath) {
      logoUrl = `https://ndb.startmunich.de/${logo.signedPath}`;
    }
  }

  return {
    id: record.Id || record.id,
    name: record['Startup Name'] || 'Unnamed Startup',
    website: (record['Company Website'] || '').replace(/^https?:\/\//, ''),
    summary: record['Short Description'] || 'No description available',
    description: record['Description Long'] || record['Short Description'] || 'No description available',
    logoUrl: logoUrl,
    foundingYear: record['Founding Year'] || new Date().getFullYear(),
    category: categories,
    founders: founders,
    totalRaised: record['Investment Size €'] || undefined,
    employees: record['Employees'] ? parseInt(record['Employees']) : undefined,
    isSpotlight: record['Featured Startup']?.toLowerCase() === 'yes' || false,
    isYCombinator: record['Y Combinator Alumni']?.toLowerCase() === 'yes' || false,
    companyLinkedin: record['Company Linkedin'] || undefined,
    investmentRound: record['Last investment round'] || undefined,
    milestones: record['First milestones'] || undefined,
    supportingPrograms: record['Supporting Programs'] || undefined,
  };
}

export async function GET() {
  console.log('========== FETCHING ALL STARTUPS ==========');
  console.log('🔍 Environment Variables:');
  console.log('NOCODB_API_TOKEN:', NOCODB_API_TOKEN ? `${NOCODB_API_TOKEN.substring(0, 10)}... (${NOCODB_API_TOKEN.length} chars)` : 'NOT SET');
  console.log('NOCODB_BASE_URL:', NOCODB_BASE_URL);
  console.log('NOCODB_TABLE_ID (startups):', NOCODB_TABLE_ID);
  console.log('NOCODB_MEMBERS_TABLE_ID:', process.env.NOCODB_MEMBERS_TABLE_ID);
  console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('VERCEL:', process.env.VERCEL);
  console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
  
  // Check if NocoDB is configured
  if (!NOCODB_API_TOKEN || !NOCODB_TABLE_ID) {
    console.error('NocoDB not configured - missing API token or table ID');
    return NextResponse.json(
      { error: 'NocoDB not configured' },
      { status: 500 }
    );
  }

  try {
    console.log('Fetching startups from NocoDB...');
    
    const response = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records?limit=1000&offset=0`,
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
    const companies = (data.list || []).map(transformNocoDBRecord);
    
    console.log(`Successfully fetched ${companies.length} startups from NocoDB`);
    return NextResponse.json(companies);
    
  } catch (error) {
    console.error('Error fetching from NocoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch startups from database' },
      { status: 500 }
    );
  }
}
