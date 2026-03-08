import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de';
const NOCODB_NETWORK_LOGOS_TABLE_ID = process.env.NOCODB_NETWORK_LOGOS_TABLE_ID;

export interface NetworkLogo {
    id: string;
    name: string;
    category: string;
    logoUrl: string;
}

function transformNocoDBRecord(record: any): NetworkLogo {
    let logoUrl = '';

    // Handle logo attachment - NocoDB stores it as an array of attachment objects
    if (record.Logo && Array.isArray(record.Logo) && record.Logo[0]) {
        const logo = record.Logo[0];
        if (logo.signedPath) {
            logoUrl = `${NOCODB_BASE_URL}/${logo.signedPath}`;
        } else if (logo.path) {
            logoUrl = `${NOCODB_BASE_URL}/${logo.path}`;
        } else if (logo.url) {
            logoUrl = logo.url;
        }
    }
    // Fallback to ui-avatars if no logo found
    if (!logoUrl) {
        logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(record.Name || 'Company')}&size=300&background=00002c&color=fff&bold=true&font-size=0.4`;
    }
    return {
        id: record.Id || String(record.id || Math.random()),
        name: record.Name || 'Unnamed Company',
        category: record.Category || record.Categrory || 'Other',
        logoUrl,
    };
}

export async function GET() {
    if (!NOCODB_API_TOKEN || !NOCODB_NETWORK_LOGOS_TABLE_ID) {
        console.error('NocoDB not configured - missing API token or network logos table ID');
        return NextResponse.json(
            { error: 'NocoDB not configured for network logos' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_NETWORK_LOGOS_TABLE_ID}/records?limit=1000&offset=0`,
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

        // Log first record for debugging column names
        if (data.list && data.list[0]) {
            console.log('Network logos sample record:', JSON.stringify(data.list[0], null, 2));
        }

        const logos = (data.list || []).map(transformNocoDBRecord);

        console.log(`Successfully fetched ${logos.length} network logos from NocoDB`);
        return NextResponse.json(logos);

    } catch (error) {
        console.error('Error fetching network logos from NocoDB:', error);
        return NextResponse.json(
            { error: 'Failed to fetch network logos from database' },
            { status: 500 }
        );
    }
}
