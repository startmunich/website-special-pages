import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_PARTNERS_TABLE_ID = process.env.NOCODB_PARTNERS_TABLE_ID;

export interface Partner {
    id: string;
    name: string;
    category: string;
    logoUrl: string;
    featured?: boolean;
}

// Transform NocoDB record to Partner format
function transformNocoDBRecord(record: any): Partner {
    // Handle partner logo - NocoDB stores it as an array of attachment objects
    // Note: Keys are capitalized in the API response
    let logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(record.Name || 'Partner')}&size=300&background=4f46e5&color=fff&bold=true&font-size=0.4`;

    // Check for Logo (capitalized)
    if (record.Logo && Array.isArray(record.Logo) && record.Logo[0]) {
        const logo = record.Logo[0];
        if (logo.signedPath) {
            logoUrl = `https://ndb.startmunich.de/${logo.signedPath}`;
        }
    }

    return {
        id: record.Id || String(Math.random()),
        name: record.Name || 'Unnamed Partner',
        category: record.Categrory || 'Other', // Using the exact spelling from DB
        logoUrl: logoUrl,
        featured: record.Featured === true || record.Featured === 1 || String(record.Featured).toLowerCase() === 'true',
    };
}

export async function GET() {
    console.log('========== FETCHING ALL PARTNERS ==========');
    console.log('🔍 Environment Variables:');
    console.log('NOCODB_API_TOKEN:', NOCODB_API_TOKEN ? `${NOCODB_API_TOKEN.substring(0, 10)}... (${NOCODB_API_TOKEN.length} chars)` : 'NOT SET');
    console.log('NOCODB_BASE_URL:', NOCODB_BASE_URL);
    console.log('NOCODB_PARTNERS_TABLE_ID:', NOCODB_PARTNERS_TABLE_ID);

    // Check if NocoDB is configured
    if (!NOCODB_API_TOKEN || !NOCODB_PARTNERS_TABLE_ID) {
        console.error('NocoDB not configured - missing API token or partners table ID');
        return NextResponse.json(
            { error: 'NocoDB not configured for partners' },
            { status: 500 }
        );
    }

    try {
        console.log('Fetching partners from NocoDB...');

        const response = await fetch(
            `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_PARTNERS_TABLE_ID}/records?limit=1000&offset=0`,
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

        // Debug: Log the first raw record to see actual column names
        if (data.list && data.list[0]) {
            console.log('📋 Sample raw record from NocoDB:', JSON.stringify(data.list[0], null, 2));
        }

        const partners = (data.list || [])
            .filter((record: any) => {
                // Check if 'Show' column is true, 1, or 'true' (case-insensitive)
                const show = record.Show;
                return show === true || show === 1 || String(show).toLowerCase() === 'true';
            })
            .map(transformNocoDBRecord);

        console.log(`Successfully fetched ${partners.length} partners from NocoDB`);
        return NextResponse.json(partners);

    } catch (error) {
        console.error('Error fetching from NocoDB:', error);
        return NextResponse.json(
            { error: 'Failed to fetch partners from database' },
            { status: 500 }
        );
    }
}
