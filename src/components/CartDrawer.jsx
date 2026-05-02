import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, total, count, isOpen, setIsOpen, removeFromCart, increment, decrement, clearCart } = useCart()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[200]" style={{ background: 'rgba(28,20,18,0.2)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)} />
      )}
      <div className="fixed top-0 right-0 h-full z-[210] flex flex-col"
        style={{
          width: 'min(420px, 100vw)',
          background: '#FDFBF7',
          borderLeft: '1px solid #E4D5C8',
          boxShadow: '-8px 0 40px rgba(28,20,18,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.44s cubic-bezier(.77,0,.175,1)',
        }}>

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6" style={{ borderBottom: '1px solid #E4D5C8' }}>
          <div>
            <h2 className="font-display text-xl font-semibold text-charcoal">Your Bag</h2>
            <p className="text-xs mt-0.5" style={{ color: '#C9906A' }}>{count} {count === 1 ? 'item' : 'items'}</p>
          </div>
          <button id="close-bag-btn" onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
            style={{ border: '1.5px solid #E4D5C8', color: '#6B5548' }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: '#F5EDE0', border: '1.5px solid #E4D5C8' }}>
                <span className="text-2xl">🛍</span>
              </div>
              <p className="font-display text-base text-charcoal">Your bag is empty</p>
              <p className="text-xs mt-1" style={{ color: '#6B5548' }}>Discover our collections</p>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="rounded-2xl p-4 flex gap-4"
              style={{ background: '#F9F4EE', border: '1px solid #E4D5C8' }}>

              {/* Color swatch */}
              <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background: `${item.color}18`, border: `1.5px solid ${item.color}40` }}>
                <div className="w-4 h-4 rounded-full" style={{ background: item.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm text-charcoal truncate">{item.name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#C9906A' }}>Rs. {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  {[['−', () => decrement(item.id)], ['+', () => increment(item.id)]].map(([lbl, fn], i) => (
                    <button key={i} onClick={fn}
                      className="w-6 h-6 rounded-full text-sm flex items-center justify-center transition-all"
                      style={{ border: '1.5px solid #E4D5C8', color: '#C9906A', background: '#FDFBF7' }}>
                      {lbl}
                    </button>
                  ))}
                  <span className="text-sm font-semibold text-charcoal w-5 text-center">{item.qty}</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-display font-semibold text-sm" style={{ color: '#C9906A' }}>
                  Rs. {(item.price * item.qty).toLocaleString()}
                </p>
                <button onClick={() => removeFromCart(item.id)} className="text-xs mt-2 transition-colors"
                  style={{ color: '#C4AEAB' }}
                  onMouseEnter={e => e.target.style.color = '#CC4444'}
                  onMouseLeave={e => e.target.style.color = '#C4AEAB'}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-7 py-6" style={{ borderTop: '1px solid #E4D5C8' }}>
            <div className="flex justify-between items-baseline mb-5">
              <span className="text-xs tracking-wider uppercase" style={{ color: '#6B5548' }}>Order Total</span>
              <span className="font-display text-2xl font-semibold" style={{ color: '#C9906A' }}>
                Rs. {total.toLocaleString()}
              </span>
            </div>
            <button id="whatsapp-checkout-btn" className="btn-primary w-full"
              onClick={() => {
                const lines = items.map(i => `• ${i.name} ×${i.qty} — Rs.${(i.price*i.qty).toLocaleString()}`).join('\n')
                window.open(`https://wa.me/?text=${encodeURIComponent(`*MashaAllah Bangles & Cosmetics*\n\n${lines}\n\n*Total: Rs.${total.toLocaleString()}*\n\n📍 Main Circular Road, She Shop Wali Gali, Shujabad`)}`, '_blank')
              }}>
              Order via WhatsApp 📱
            </button>
            <button onClick={clearCart} className="w-full text-center py-2 mt-2 text-xs"
              style={{ color: '#C4AEAB' }}
              onMouseEnter={e => e.target.style.color='#6B5548'}
              onMouseLeave={e => e.target.style.color='#C4AEAB'}>
              Clear bag
            </button>
          </div>
        )}
      </div>
    </>
  )
}
