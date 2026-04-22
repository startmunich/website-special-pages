/**
 * Home page — Server Component
 *
 * Fetches featured partners and startups directly from NocoDB at request time.
 * Next.js ISR caches the result for 1 hour (`revalidate = 3600`), so the
 * database is only hit once per hour across all visitors. The pre-fetched data
 * is passed as props to HomeClient, which means logos are available on the
 * initial HTML render — no client-side fetch or flash of missing content.
 */
import type { Metadata } from 'next'
import HomeClient from './home/HomeClient'
import type { Partner, Startup, NewsItem } from '@/lib/types'
import { OG_IMAGES } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'START Munich – Student Entrepreneurship Community',
  description:
    'START Munich is the largest student-run entrepreneurship community in Munich. We empower the next generation of founders to dare, build, and belong.',
  alternates: { canonical: 'https://www.startmunich.de/' },
  openGraph: {
    url: 'https://www.startmunich.de/',
    title: 'START Munich – Student Entrepreneurship Community',
    description:
      'START Munich is the largest student-run entrepreneurship community in Munich. We empower the next generation of founders to dare, build, and belong.',
    images: OG_IMAGES,
  },
}

// Revalidate the cached page every hour
export const revalidate = 3600

const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN
const NOCODB_BASE_URL = process.env.NOCODB_BASE_URL || 'https://ndb.startmunich.de'
const NOCODB_PARTNERS_TABLE_ID = process.env.NOCODB_PARTNERS_TABLE_ID
const NOCODB_STARTUPS_TABLE_ID = process.env.NOCODB_STARTUPS_TABLE_ID
const NOCODB_NEWS_TABLE_ID = process.env.NOCODB_NEWS_TABLE_ID

async function fetchFeaturedPartners(): Promise<Partner[]> {
  if (!NOCODB_API_TOKEN || !NOCODB_PARTNERS_TABLE_ID) return []
  try {
    const res = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_PARTNERS_TABLE_ID}/records?limit=1000`,
      {
        headers: { 'xc-token': NOCODB_API_TOKEN, 'Content-Type': 'application/json' },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.list || [])
      .filter((r: any) => {
        const show = r.Show
        const featured = r.Featured
        return (show === true || show === 1 || String(show).toLowerCase() === 'true') &&
               (featured === true || featured === 1 || String(featured).toLowerCase() === 'true')
      })
      .map((r: any) => {
        const logos: any[] = r.LogoNoBackground || []
        const logo = logos.length > 0 ? logos[logos.length - 1] : null
        const logoUrl = logo?.signedPath
          ? `${NOCODB_BASE_URL}/${logo.signedPath}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(r.Name || 'Partner')}&size=300&background=4f46e5&color=fff&bold=true&font-size=0.4`
        return { id: r.Id || String(Math.random()), name: r.Name || 'Partner', category: r.Categrory || 'Other', logoUrl, featured: true }
      })
  } catch {
    return []
  }
}

async function fetchFeaturedStartups(): Promise<Startup[]> {
  if (!NOCODB_API_TOKEN || !NOCODB_STARTUPS_TABLE_ID) return []
  try {
    const res = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_STARTUPS_TABLE_ID}/records?limit=1000`,
      {
        headers: { 'xc-token': NOCODB_API_TOKEN, 'Content-Type': 'application/json' },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.list || [])
      .filter((r: any) =>
        r['Featured Startup']?.toLowerCase() === 'yes' ||
        r['Y Combinator Alumni']?.toLowerCase() === 'yes' ||
        r['EWOR']?.toLowerCase() === 'yes'
      )
      .map((r: any) => {
        let logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(r['Startup Name'] || 'Startup')}&size=300&background=00002c&color=fff&bold=true&font-size=0.4`
        if (r['Company Logo']?.[0]?.signedPath) logoUrl = `${NOCODB_BASE_URL}/${r['Company Logo'][0].signedPath}`
        return {
          id: r.Id || r.id,
          name: r['Startup Name'] || 'Startup',
          logoUrl,
          isSpotlight: r['Featured Startup']?.toLowerCase() === 'yes',
          isYCombinator: r['Y Combinator Alumni']?.toLowerCase() === 'yes',
          isEWOR: r['EWOR']?.toLowerCase() === 'yes',
        }
      })
  } catch {
    return []
  }
}

async function fetchNews(): Promise<NewsItem[]> {
  if (!NOCODB_API_TOKEN || !NOCODB_NEWS_TABLE_ID) return []
  try {
    const res = await fetch(
      `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_NEWS_TABLE_ID}/records?limit=100`,
      {
        headers: { 'xc-token': NOCODB_API_TOKEN, 'Content-Type': 'application/json' },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.list || [])
      .sort((a: any, b: any) => (a.Order ?? Infinity) - (b.Order ?? Infinity))
      .map((r: any) => {
      let imageUrl = ''
      if (r.Image && Array.isArray(r.Image) && r.Image[0]?.signedPath) {
        imageUrl = `${NOCODB_BASE_URL}/${r.Image[0].signedPath}`
      }
      return {
        id: r.Id || r.id || String(Math.random()),
        title: r.Title || '',
        description: r.Desciption || r.Description || '',
        url: r.URL || r.Url || '',
        imageUrl,
      }
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [partners, startups, news] = await Promise.all([
    fetchFeaturedPartners(),
    fetchFeaturedStartups(),
    fetchNews(),
  ])

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'START Munich',
    url: 'https://www.startmunich.de',
    logo: 'https://www.startmunich.de/startIcon.png',
    description:
      'START Munich is the largest student-run entrepreneurship community in Munich.',
    foundingDate: '2003',
    sameAs: [
      'https://www.linkedin.com/company/start-munich',
      'https://www.instagram.com/startmunich',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeClient initialPartners={partners} initialStartups={startups} initialNews={news} />
    </>
  )
}
