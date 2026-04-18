import { NextResponse } from 'next/server';
import { getAllPartners } from '@/lib/partners';

export const revalidate = 3600;

export async function GET() {
    console.log('========== FETCHING ALL PARTNERS ==========');
    console.log('🔍 Environment Variables:');
    const token = process.env.NOCODB_API_TOKEN;
    console.log('NOCODB_API_TOKEN:', token ? `${token.substring(0, 10)}... (${token.length} chars)` : 'NOT SET');
    console.log('NOCODB_BASE_URL:', process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de');
    console.log('NOCODB_PARTNERS_TABLE_ID:', process.env.NOCODB_PARTNERS_TABLE_ID);

    const partners = await getAllPartners();

    if (partners.length === 0 && (!process.env.NOCODB_API_TOKEN || !process.env.NOCODB_PARTNERS_TABLE_ID)) {
        return NextResponse.json(
            { error: 'NocoDB not configured for partners' },
            { status: 500 }
        );
    }

    console.log(`Successfully fetched ${partners.length} partners from NocoDB`);
    return NextResponse.json(partners);
}
