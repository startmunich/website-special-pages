import type { Metadata } from 'next'
import MemberJourneyContent from './MemberJourneyContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Member Journey',
  description:
    'Discover the START Munich member journey — how you grow from applicant to founder within Europe\'s most vibrant student entrepreneurship community.',
  alternates: { canonical: 'https://www.startmunich.de/member-journey' },
  openGraph: {
    url: 'https://www.startmunich.de/member-journey',
    title: 'Member Journey | START Munich',
    description:
      'Discover the START Munich member journey — how you grow from applicant to founder within Europe\'s most vibrant student entrepreneurship community.',
  },
}

export default function MemberJourneyPage() {
  return <MemberJourneyContent />
}
