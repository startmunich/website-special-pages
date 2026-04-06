"use client"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-brand-dark-blue flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <button
          onClick={reset}
          className="px-6 py-3 bg-brand-pink text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(208,0,111,0.4)] transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
