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
            <Link href="/admin/add-startup" className="text-blue-600 hover:underline text-lg">
              Add Startup (Admin)
            </Link>
          </li>
          <li>
            <Link href="/admin/edit-startups" className="text-blue-600 hover:underline text-lg">
              Edit Startups (Admin)
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
