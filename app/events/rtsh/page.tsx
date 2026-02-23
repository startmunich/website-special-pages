"use client"

import { useRouter } from "next/navigation"

export default function RTSHPage() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 pt-20 bg-[#00002c] flex flex-col">
      {/* Header with back button */}
      <div className="bg-[#00002c]/95 border-b border-white/10 p-4 flex items-center justify-between flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-[#d0006f] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-bold">Back to Events</span>
        </button>
        <h1 className="text-xl font-bold text-white">Road to START Hack</h1>
        <div className="w-32"></div>
      </div>

      {/* iframe */}
      <div className="flex-1 w-full overflow-hidden">
        <iframe
          src="https://hack.startmunich.de/events/rtsh"
          className="w-full h-full border-0"
          title="Road to START Hack"
          allowFullScreen
        />
      </div>
    </div>
  )
}
