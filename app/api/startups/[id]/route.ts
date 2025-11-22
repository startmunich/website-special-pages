import { NextResponse } from 'next/server';

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_TABLE_ID = process.env.NOCODB_STARTUPS_TABLE_ID;

interface Founder {
  name: string
  role: string
  batch: string[]
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
  const batch = record.Batch ? record.Batch.split(',').map((b: string) => b.trim()).filter(Boolean) : [];
  
  const founders: Founder[] = [];
  const memberName = record['STARTMunich Member'];
  if (memberName) {
    let profilePicUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&size=80&background=4f46e5&color=fff`;
    if (record['Member Picture'] && Array.isArray(record['Member Picture']) && record['Member Picture'][0]) {
      const profilePic = record['Member Picture'][0];
      if (profilePic.signedPath) {
        profilePicUrl = `https://ndb.startmunich.de/${profilePic.signedPath}`;
      }
    }
    
    founders.push({
      name: memberName,
      role: record['Company Role'] || 'Founder',
      batch: batch,
      imageUrl: profilePicUrl,
      linkedinUrl: record['Member Linkedin'] || undefined
    });
  }

  const categories = record.Chategory 
    ? record.Chategory.split(',').map((c: string) => c.trim()).filter(Boolean)
    : ['Other'];

  let logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(record['Startup Name'] || 'Company')}&size=300&background=00002c&color=fff&bold=true&font-size=0.4`;
  if (record['Company Logo']) {
    logoUrl = record['Company Logo'];
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
    employees: record['Employees'] || undefined,
    isSpotlight: record['Featured Startup']?.toLowerCase() === 'yes' || false,
    isYCombinator: record['Y Combinator Alumni']?.toLowerCase() === 'yes' || false,
    companyLinkedin: record['Company Linkedin'] || undefined,
    investmentRound: record['Last investment round'] || undefined,
    milestones: record['First milestones'] || undefined,
    supportingPrograms: record['Supporting Programs'] || undefined,
  };
}

// GET single startup by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!NOCODB_API_TOKEN || !NOCODB_TABLE_ID) {
    return NextResponse.json(
      { error: 'NocoDB not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records/${params.id}`,
      {
        headers: {
          'xc-token': NOCODB_API_TOKEN,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch startup: ${response.status}`);
    }

    const record = await response.json();
    const company = transformNocoDBRecord(record);
    
    return NextResponse.json(company);
  } catch (error) {
    console.error('Error fetching startup:', error);
    return NextResponse.json(
      { error: 'Failed to fetch startup' },
      { status: 500 }
    );
  }
}

// PUT update startup by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!NOCODB_API_TOKEN || !NOCODB_TABLE_ID) {
    return NextResponse.json(
      { error: 'NocoDB not configured' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.json();

    // Process base64 images - upload to NocoDB storage first
    let memberPictureUrl = formData.memberPicture;
    let companyLogoUrl = formData.companyLogo;

    // Upload member picture to NocoDB storage if it's a base64 image
    if (formData.memberPicture && formData.memberPicture.startsWith('data:image/')) {
      try {
        const base64Data = formData.memberPicture.split(',')[1];
        const mimeType = formData.memberPicture.match(/data:(.*?);/)?.[1] || 'image/png';
        const extension = mimeType.split('/')[1];
        const filename = `member_${Date.now()}.${extension}`;
        
        const binaryString = Buffer.from(base64Data, 'base64');
        const uploadFormData = new FormData();
        const blob = new Blob([binaryString], { type: mimeType });
        uploadFormData.append('file', blob, filename);
        
        const uploadResponse = await fetch(
          `${NOCODB_BASE_URL}/api/v1/db/storage/upload`,
          {
            method: 'POST',
            headers: {
              'xc-token': NOCODB_API_TOKEN,
            },
            body: uploadFormData,
          }
        );
        
        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          memberPictureUrl = uploadResult; // Store entire upload response
        }
      } catch (uploadError) {
        console.error('Error uploading member picture:', uploadError);
      }
    }

    // Upload company logo to NocoDB storage if it's a base64 image
    if (formData.companyLogo && formData.companyLogo.startsWith('data:image/')) {
      try {
        const base64Data = formData.companyLogo.split(',')[1];
        const mimeType = formData.companyLogo.match(/data:(.*?);/)?.[1] || 'image/png';
        const extension = mimeType.split('/')[1];
        const filename = `logo_${Date.now()}.${extension}`;
        
        const binaryString = Buffer.from(base64Data, 'base64');
        const uploadFormData = new FormData();
        const blob = new Blob([binaryString], { type: mimeType });
        uploadFormData.append('file', blob, filename);
        
        const uploadResponse = await fetch(
          `${NOCODB_BASE_URL}/api/v1/db/storage/upload`,
          {
            method: 'POST',
            headers: {
              'xc-token': NOCODB_API_TOKEN,
            },
            body: uploadFormData,
          }
        );
        
        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          companyLogoUrl = uploadResult; // Store entire upload response
        }
      } catch (uploadError) {
        console.error('Error uploading company logo:', uploadError);
      }
    }

    // Map form data to NocoDB field names
    const nocoDBRecord = {
      "Startup Name": formData.startupName,
      "Company Website": formData.companyWebsite,
      "Short Description": formData.shortDescription,
      "Description Long": formData.descriptionLong,
      "Company Logo": companyLogoUrl || null,
      "Founding Year": parseInt(formData.foundingYear) || new Date().getFullYear(),
      "Chategory": formData.chategory,
      "STARTMunich Member": formData.startMunichMember,
      "Company Role": formData.companyRole,
      "Batch": formData.batch,
      "Member Picture": memberPictureUrl || null,
      "Member Linkedin": formData.memberLinkedin,
      "Investment Size €": formData.investmentSize,
      "Employees": formData.employees ? parseInt(formData.employees) : null,
      "Featured Startup": formData.featuredStartup,
      "Y Combinator Alumni": formData.yCombinatorAlumni,
      "Company Linkedin": formData.companyLinkedin,
      "Last investment round": formData.lastInvestmentRound,
      "First milestones": formData.firstMilestones,
      "Supporting Programs": formData.supportingPrograms,
    };

    const response = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records/${params.id}`,
      {
        method: 'PATCH',
        headers: {
          'xc-token': NOCODB_API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nocoDBRecord),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NocoDB API error: ${response.status}`, errorText);
      throw new Error(`Failed to update startup: ${response.status}`);
    }

    const result = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Startup updated successfully',
      data: result 
    });
  } catch (error) {
    console.error('Error updating startup:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update startup' },
      { status: 500 }
    );
  }
}

// DELETE startup by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!NOCODB_API_TOKEN || !NOCODB_TABLE_ID) {
    return NextResponse.json(
      { error: 'NocoDB not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records/${params.id}`,
      {
        method: 'DELETE',
        headers: {
          'xc-token': NOCODB_API_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NocoDB API error: ${response.status}`, errorText);
      throw new Error(`Failed to delete startup: ${response.status}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Startup deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting startup:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete startup' },
      { status: 500 }
    );
  }
}
