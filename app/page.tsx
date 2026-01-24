import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Pages</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/startups" className="text-blue-600 hover:underline text-lg">
              Startups
            </Link>
          </li>
          <li>
            <Link href="/members" className="text-blue-600 hover:underline text-lg">
              Members
            </Link>
          </li>
          <li>
            <Link href="/events" className="text-blue-600 hover:underline text-lg">
              Events
            </Link>
          </li>
          <li>
            <Link href="/admin" className="text-blue-600 hover:underline text-lg">
              Admin - Manage Startups
            </Link>
          </li>
          <li>
           <Link href="/member-network" className="text-blue-600 hover:underline text-lg">
             Member Network
           </Link>
          </li>
          <li>
            <Link href="/member-journey" className="text-blue-600 hover:underline text-lg">
              Member Journey
            </Link>
            </li>
        </ul>
      </div>
    </main>
  )
}
