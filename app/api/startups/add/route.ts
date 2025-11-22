import { NextResponse } from 'next/server';

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_TABLE_ID = process.env.NOCODB_STARTUPS_TABLE_ID;

export async function POST(request: Request) {
  // Check if NocoDB is configured
  if (!NOCODB_API_TOKEN || !NOCODB_TABLE_ID) {
    console.error('NocoDB not configured - missing API token or table ID');
    return NextResponse.json(
      { error: 'NocoDB not configured' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.json();

    // Map form data to NocoDB field names
    const nocoDBRecord = {
      "Startup Name": formData.startupName,
      "Company Website": formData.companyWebsite,
      "Short Description": formData.shortDescription,
      "Description Long": formData.descriptionLong,
      "Company Logo": formData.companyLogo,
      "Founding Year": parseInt(formData.foundingYear) || new Date().getFullYear(),
      "Chategory": formData.chategory,
      "STARTMunich Member": formData.startMunichMember,
      "Company Role": formData.companyRole,
      "Batch": formData.batch,
      "Member Picture": formData.memberPicture,
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

    console.log('Adding startup to NocoDB...');
    
    const response = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records`,
      {
        method: 'POST',
        headers: {
          'xc-token': NOCODB_API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nocoDBRecord),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NocoDB API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Failed to add startup: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Successfully added startup to NocoDB:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Startup added successfully',
      data: result 
    });
    
  } catch (error) {
    console.error('Error adding startup to NocoDB:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add startup' },
      { status: 500 }
    );
  }
}
