import type { Metadata } from 'next'
import Hero from '@/components/Hero'

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
  return (
    <main className="min-h-screen bg-brand-dark-blue text-white">
      <Hero
        backgroundImage="/memberJourney/hero-opt.png"
        title={<>JOIN <span className="outline-text">START MUNICH</span></>}
        description="Applications for 2026 will open soon. Stay tuned."
      />
    </main>
  )
}
