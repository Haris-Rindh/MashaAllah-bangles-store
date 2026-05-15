import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Store, { fmt } from '../store'

export default function Cart() {
  const { cartItems, count, total, removeFromCart, updateQty } = useCart()
  const shipping = total >= 2000 ? 0 : 200

  if (!count) return (
    <div className="pt-28 min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="font-display uppercase tracking-[.1em] text-swa-dark text-4xl mb-2">Your Bag is Empty</h1>
      <p className="text-gray text-[11px] uppercase tracking-widest max-w-xs">Add some beautiful products to continue shopping.</p>
      <Link to="/products" className="mt-6 bg-swa-dark text-white px-10 py-4 text-[10px] tracking-[.2em] uppercase font-bold hover:bg-black/80 transition-colors">Browse Products</Link>
    </div>
  )

  return (
    <div className="pt-28 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 lg:px-10 pb-20">
        <h1 className="font-display uppercase text-swa-dark tracking-[.1em] text-[clamp(28px,5vw,42px)] mb-8 border-b border-gray-200 pb-4">Your Bag</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          {/* Items */}
          <div>
            {cartItems.map(item => {
              const product = Store.getProductById(item.id);
              const isBangles = product?.category === 'bangles' || item.category === 'bangles';
              const step = isBangles ? 0.5 : 1;
              const minQty = isBangles ? 0.5 : 1;
              return (
                <div key={item.id} className="grid grid-cols-[80px_1fr_auto] sm:grid-cols-[96px_1fr_auto] gap-4 sm:gap-6 items-center py-6 border-b border-gray-100">
                  <img src={`/${item.image}`} alt={item.name} className="w-full aspect-[4/5] object-cover bg-swa-gray"/>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-swa-dark font-bold mb-1.5">{item.name} {isBangles && <span className="text-[9px] text-gray">(Dozens)</span>}</p>
                    <p className="text-sm font-body text-swa-text mb-4">{fmt(item.price)}</p>
                    <div className="flex items-center border border-gray-300 w-fit">
                      <button aria-label="Decrease quantity" onClick={() => updateQty(item.id, Math.max(minQty, item.qty - step))} className="w-10 h-10 text-swa-dark text-lg hover:bg-swa-gray transition-colors">−</button>
                      <span className="w-8 text-center text-sm font-medium text-swa-dark" aria-label="Quantity">{item.qty}</span>
                      <button aria-label="Increase quantity" onClick={() => updateQty(item.id, item.qty + step)} className="w-10 h-10 text-swa-dark text-lg hover:bg-swa-gray transition-colors">+</button>
                    </div>
                  </div>
                  <button aria-label={`Remove ${item.name} from bag`} onClick={() => removeFromCart(item.id)} className="text-gray/40 text-xl hover:text-swa-dark transition-colors self-start mt-2">✕</button>
                </div>
              );
            })}
          </div>
          {/* Summary */}
          <div className="bg-swa-gray/30 border border-gray-200 p-8 h-fit lg:sticky lg:top-28">
            <h3 className="font-display uppercase tracking-[.1em] text-swa-dark text-xl mb-6">Order Summary</h3>
            <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray mb-4"><span>Subtotal</span><span className="text-swa-dark font-body font-bold">{fmt(total)}</span></div>
            <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray mb-6">
              <span>Shipping</span>
              <span className="font-body font-bold text-swa-dark">{shipping===0 ? <span className="bg-swa-dark text-white px-2 py-0.5 text-[9px]">FREE</span> : fmt(shipping)}</span>
            </div>
            <div className="flex justify-between font-bold text-swa-dark text-base border-t border-gray-300 pt-6 mb-4">
              <span className="text-[12px] uppercase tracking-widest">Total</span><span className="font-body">{fmt(total+shipping)}</span>
            </div>
            {shipping > 0 && <p className="text-[10px] uppercase tracking-widest text-gray mb-6">Add <strong>{fmt(2000-total)}</strong> more for free shipping!</p>}
            <Link to="/checkout" className="block w-full text-center bg-swa-dark text-white py-4.5 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-black/80 transition-colors mb-4">Proceed to Checkout</Link>
            <Link to="/products" className="block text-center border-b border-swa-dark w-fit mx-auto text-swa-dark text-[10px] uppercase tracking-widest font-bold">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
