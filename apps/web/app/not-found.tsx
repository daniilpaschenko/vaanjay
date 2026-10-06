export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-text-secondary mt-2">Page not found</p>
        <a href="/" className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
          Go Home
        </a>
      </div>
    </div>
  )
}
