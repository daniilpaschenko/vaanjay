'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-xl font-bold text-text-primary">Something went wrong</h1>
        <p className="text-sm text-text-secondary mt-2">Please try again</p>
        <button onClick={reset} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
          Try Again
        </button>
      </div>
    </div>
  )
}
