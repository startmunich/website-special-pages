import type { Metadata } from 'next'
import StartupDetailsContent from './StartupDetailsContent'

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de'
const NOCODB_STARTUPS_TABLE_ID = process.env.NOCODB_STARTUPS_TABLE_ID

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params

  try {
    if (NOCODB_API_TOKEN && NOCODB_STARTUPS_TABLE_ID) {
      const res = await fetch(
        `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_STARTUPS_TABLE_ID}/records?where=(Id,eq,${id})&limit=1`,
        {
          headers: { 'xc-token': NOCODB_API_TOKEN },
          next: { revalidate: 3600 },
        }
      )
      if (res.ok) {
        const data = await res.json()
        const startup = data?.list?.[0]
        if (startup) {
          const name = startup['Startup Name'] || 'Startup'
          const description = startup['Description'] || `Learn about ${name}, a startup founded by START Munich alumni.`
          return {
            title: name,
            description,
            alternates: { canonical: `https://www.startmunich.de/startup-details/${id}` },
            openGraph: {
              url: `https://www.startmunich.de/startup-details/${id}`,
              title: `${name} | START Munich`,
              description,
            },
          }
        }
      }
    }
  } catch {
    // fall through to default
  }

  return {
    title: 'Startup',
    description: 'A startup founded by START Munich alumni.',
    alternates: { canonical: `https://www.startmunich.de/startup-details/${id}` },
  }
}

export default function StartupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return <StartupDetailsContent params={params} />
}
