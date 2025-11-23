import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_TABLE_ID = process.env.NOCODB_STARTUPS_TABLE_ID;

export async function POST(request: Request) {
  console.log('========== ADD STARTUP API CALLED ==========');
  console.log('🔍 Environment Variables:');
  console.log('NOCODB_API_TOKEN:', NOCODB_API_TOKEN ? `${NOCODB_API_TOKEN.substring(0, 10)}... (${NOCODB_API_TOKEN.length} chars)` : 'NOT SET');
  console.log('NOCODB_BASE_URL:', NOCODB_BASE_URL);
  console.log('NOCODB_STARTUPS_TABLE_ID:', NOCODB_TABLE_ID);
  console.log('NOCODB_TABLE_ID (members):', process.env.NOCODB_TABLE_ID);
  console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('VERCEL:', process.env.VERCEL);
  console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
  
  // Check if NocoDB is configured
  if (!NOCODB_API_TOKEN || !NOCODB_TABLE_ID) {
    console.error('❌ NocoDB not configured - missing API token or table ID');
    console.error('NOCODB_API_TOKEN present:', !!NOCODB_API_TOKEN);
    console.error('NOCODB_TABLE_ID present:', !!NOCODB_TABLE_ID);
    return NextResponse.json(
      { error: 'NocoDB not configured' },
      { status: 500 }
    );
  }

  console.log('✓ NocoDB configuration found');
  console.log('Base URL:', NOCODB_BASE_URL);
  console.log('Table ID:', NOCODB_TABLE_ID);

  try {
    const formData = await request.json();
    console.log('📥 Received form data (images truncated)');
    console.log('Member Picture type:', typeof formData.memberPicture);
    console.log('Member Picture present:', !!formData.memberPicture);
    console.log('Member Picture starts with data:image:', formData.memberPicture?.startsWith('data:image/'));
    console.log('Company Logo type:', typeof formData.companyLogo);
    console.log('Company Logo present:', !!formData.companyLogo);
    console.log('Company Logo starts with data:image:', formData.companyLogo?.startsWith('data:image/'));

    // Process base64 images - upload to NocoDB storage first
    let memberPictureUrl = formData.memberPicture;
    let companyLogoUrl = formData.companyLogo;

    // Upload member picture to NocoDB storage if it's a base64 image
    if (formData.memberPicture && formData.memberPicture.startsWith('data:image/')) {
      console.log('📸 Uploading member picture to NocoDB storage...');
      try {
        const base64Data = formData.memberPicture.split(',')[1];
        const mimeType = formData.memberPicture.match(/data:(.*?);/)?.[1] || 'image/png';
        const extension = mimeType.split('/')[1];
        const filename = `member_${Date.now()}.${extension}`;
        
        console.log('Image details:', { mimeType, extension, filename, dataLength: base64Data.length });
        
        // Convert base64 to buffer
        const binaryData = Buffer.from(base64Data, 'base64');
        console.log('Binary data size:', binaryData.length, 'bytes');
        
        // Create form data for file upload
        const uploadFormData = new FormData();
        const blob = new Blob([binaryData], { type: mimeType });
        uploadFormData.append('file', blob, filename);
        
        // Use the generic storage upload endpoint (v1)
        const uploadUrl = `${NOCODB_BASE_URL}/api/v1/db/storage/upload`;
        console.log('Upload URL:', uploadUrl);
        
        // Upload to NocoDB storage
        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'xc-token': NOCODB_API_TOKEN,
          },
          body: uploadFormData,
        });
        
        console.log('Upload response status:', uploadResponse.status, uploadResponse.statusText);
        const responseText = await uploadResponse.text();
        console.log('Upload response body:', responseText);
        
        if (uploadResponse.ok) {
          const uploadResult = JSON.parse(responseText);
          console.log('Upload result:', JSON.stringify(uploadResult, null, 2));
          // NocoDB returns the upload data that should be stored directly in the attachment field
          memberPictureUrl = uploadResult;
          console.log('✓ Member picture uploaded successfully');
        } else {
          console.error('⚠️ Failed to upload member picture');
          console.error('Status:', uploadResponse.status);
          console.error('Response:', responseText);
          memberPictureUrl = null; // Will use default avatar
        }
      } catch (uploadError) {
        console.error('⚠️ Error uploading member picture:', uploadError);
        console.error('Error stack:', uploadError instanceof Error ? uploadError.stack : 'No stack');
        memberPictureUrl = ""; // Will use default avatar
      }
    }

    // Upload company logo to NocoDB storage if it's a base64 image
    if (formData.companyLogo && formData.companyLogo.startsWith('data:image/')) {
      console.log('📸 Uploading company logo to NocoDB storage...');
      try {
        const base64Data = formData.companyLogo.split(',')[1];
        const mimeType = formData.companyLogo.match(/data:(.*?);/)?.[1] || 'image/png';
        const extension = mimeType.split('/')[1];
        const filename = `logo_${Date.now()}.${extension}`;
        
        console.log('Logo details:', { mimeType, extension, filename, dataLength: base64Data.length });
        
        // Convert base64 to buffer
        const binaryData = Buffer.from(base64Data, 'base64');
        
        // Create form data for file upload
        const uploadFormData = new FormData();
        const blob = new Blob([binaryData], { type: mimeType });
        uploadFormData.append('file', blob, filename);
        
        // Use the generic storage upload endpoint (v1)
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
        
        console.log('Logo upload response status:', uploadResponse.status);
        const responseText = await uploadResponse.text();
        console.log('Logo upload response body:', responseText);
        
        if (uploadResponse.ok) {
          const uploadResult = JSON.parse(responseText);
          console.log('Logo upload result:', JSON.stringify(uploadResult, null, 2));
          // NocoDB returns the upload data that should be stored directly in the attachment field
          companyLogoUrl = uploadResult;
          console.log('✓ Company logo uploaded successfully');
        } else {
          console.error('⚠️ Failed to upload company logo');
          companyLogoUrl = null; // Will use default logo
        }
      } catch (uploadError) {
        console.error('⚠️ Error uploading company logo:', uploadError);
        companyLogoUrl = ""; // Will use default logo
      }
    }

    // Get current date in ISO format
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

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
      "Last Updated": currentDate,
    };

    console.log('📤 Mapped NocoDB record (images as attachments)');
    
    const url = `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records`;
    console.log('🌐 API URL:', url);
    console.log('🔑 Using API token (first 10 chars):', NOCODB_API_TOKEN.substring(0, 10) + '...');
    
    console.log('⏳ Sending POST request to NocoDB...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'xc-token': NOCODB_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nocoDBRecord),
    });

    console.log('📊 Response status:', response.status, response.statusText);
    console.log('📊 Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ NocoDB API error response body:', errorText);
      console.error('❌ Full error details:', {
        status: response.status,
        statusText: response.statusText,
        url: url,
        body: errorText
      });
      throw new Error(`Failed to add startup: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Successfully added startup to NocoDB!');
    console.log('✅ Result:', JSON.stringify(result, null, 2));
    
    // Verify the record was created by fetching it back
    if (result.Id) {
      console.log('🔍 Verifying record creation by fetching ID:', result.Id);
      try {
        const verifyResponse = await fetch(
          `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_TABLE_ID}/records/${result.Id}`,
          {
            headers: {
              'xc-token': NOCODB_API_TOKEN,
              'Content-Type': 'application/json',
            },
          }
        );
        if (verifyResponse.ok) {
          const verifiedRecord = await verifyResponse.json();
          console.log('✅ Record verified in database:', JSON.stringify(verifiedRecord, null, 2));
        } else {
          console.log('⚠️ Could not verify record (but it was created):', verifyResponse.status);
        }
      } catch (verifyError) {
        console.log('⚠️ Verification fetch failed (but record was created):', verifyError);
      }
    }
    
    console.log('========== ADD STARTUP SUCCESS ==========');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Startup added successfully',
      data: result,
      recordId: result.Id
    });
    
  } catch (error) {
    console.error('========== ADD STARTUP FAILED ==========');
    console.error('❌ Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('❌ Error message:', error instanceof Error ? error.message : String(error));
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('========================================');
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add startup' },
      { status: 500 }
    );
  }
}
