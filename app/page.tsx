import Link from 'next/link'
import SocialFeeds from '@/components/SocialFeeds'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Pages</h1>
        <ul className="space-y-4 mb-12">
          <li>
            <Link href="/admin" className="text-blue-600 hover:underline text-lg">
              Admin - Manage Startups
            </Link>
          </li>
          <li>
            <Link href="/events" className="text-blue-600 hover:underline text-lg">
              Events
            </Link>
          </li>
          <li>
            <Link href="/member-journey" className="text-blue-600 hover:underline text-lg">
              Member Journey
            </Link>
          </li>
          <li>
            <Link href="/member-network" className="text-blue-600 hover:underline text-lg">
              Member Network
            </Link>
          </li>
          <li>
            <Link href="/members" className="text-blue-600 hover:underline text-lg">
              Members
            </Link>
          </li>
          <li>
            <Link href="/partners" className="text-blue-600 hover:underline text-lg">
              Our Partners
            </Link>
          </li>
          <li>
            <Link href="/for-partners" className="text-blue-600 hover:underline text-lg">
              For Partners
            </Link>
          </li>
          <li>
            <Link href="/startups" className="text-blue-600 hover:underline text-lg">
              Startups
            </Link>
          </li>
          <li>
            <Link href="/home" className="text-blue-600 hover:underline text-lg">
              Home (Landing Page)
            </Link>
          </li>
        </ul>

        <SocialFeeds />
      </div>
    </main>
  )
}
