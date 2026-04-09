import type { Metadata } from 'next'
import JoinStartClient from './JoinStartClient'

export const metadata: Metadata = {
  title: 'Join START Munich 2026',
  description:
    'Apply to become a START Munich member in 2026. Join Munich\'s leading student entrepreneurship community at TUM, LMU, and HM.',
  alternates: { canonical: 'https://www.startmunich.de/join-start/2026' },
  openGraph: {
    url: 'https://www.startmunich.de/join-start/2026',
    title: 'Join START Munich 2026',
    description:
      'Apply to become a START Munich member in 2026. Join Munich\'s leading student entrepreneurship community at TUM, LMU, and HM.',
  },
}

export default function JoinStart2026Page() {
  return <JoinStartClient />
}
