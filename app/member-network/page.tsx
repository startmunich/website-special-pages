import type { Metadata } from 'next'
import MemberNetworkContent from './MemberNetworkContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Member Network',
  description:
    'Explore the START Munich member network — connect with fellow students, alumni, and founders from TUM, LMU, and HM who are shaping the future.',
  alternates: { canonical: 'https://www.startmunich.de/member-network' },
  openGraph: {
    url: 'https://www.startmunich.de/member-network',
    title: 'Member Network | START Munich',
    description:
      'Explore the START Munich member network — connect with fellow students, alumni, and founders from TUM, LMU, and HM who are shaping the future.',
  },
}

export default function MemberNetworkPage() {
  return <MemberNetworkContent />
}
