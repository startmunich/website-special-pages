import type { Metadata } from 'next'
import PartnersContent from './PartnersContent'
import { OG_IMAGES } from '@/lib/metadata'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Our Partners',
  description:
    'Meet START Munich\'s partners — leading companies, VCs, research institutions, and ecosystem players that empower our student entrepreneur community.',
  alternates: { canonical: 'https://www.startmunich.de/partners' },
  openGraph: {
    url: 'https://www.startmunich.de/partners',
    title: 'Our Partners | START Munich',
    description:
      'Meet START Munich\'s partners — leading companies, VCs, research institutions, and ecosystem players that empower our student entrepreneur community.',
    images: OG_IMAGES,
  },
}

export default function PartnersPage() {
  return <PartnersContent />
}
