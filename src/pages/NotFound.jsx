import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ background: '#FDFBF7', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center text-center px-6 pt-24">
      <div className="ornament justify-center mb-6">Error 404</div>
      <h1 className="font-display text-5xl font-semibold text-charcoal mb-4">
        Page Not Found
      </h1>
      <p className="text-sm font-light mb-10 max-w-xs" style={{ color: '#6B5548' }}>
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )
}
