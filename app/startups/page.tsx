import type { Metadata } from 'next'
import StartupsContent from './StartupsContent'
import { OG_IMAGES } from '@/lib/metadata'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Startups',
  description:
    'Explore startups founded by START Munich alumni — from Y Combinator companies to cutting-edge deep tech. Discover the next generation of Munich founders.',
  alternates: { canonical: 'https://www.startmunich.de/startups' },
  openGraph: {
    url: 'https://www.startmunich.de/startups',
    title: 'Startups | START Munich',
    description:
      'Explore startups founded by START Munich alumni — from Y Combinator companies to cutting-edge deep tech. Discover the next generation of Munich founders.',
    images: OG_IMAGES,
  },
}

export default function StartupsPage() {
  return <StartupsContent />
}
