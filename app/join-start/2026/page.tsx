import Hero from '@/components/Hero'

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
