import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toast } = useCart()
  return (
    <div className="fixed bottom-6 left-1/2 z-[300] pointer-events-none transition-all duration-400"
      style={{
        transform: `translateX(-50%) translateY(${toast ? '0' : '14px'})`,
        opacity: toast ? 1 : 0,
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>
      <div className="flex items-center gap-3 rounded-full px-5 py-3 shadow-hover"
        style={{ background: '#FDFBF7', border: '1.5px solid #E4D5C8' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: '#C9906A' }} />
        <span className="text-sm font-medium text-charcoal">
          <span className="font-semibold" style={{ color: '#C9906A' }}>{toast}</span>{' '}added to bag
        </span>
      </div>
    </div>
  )
}
