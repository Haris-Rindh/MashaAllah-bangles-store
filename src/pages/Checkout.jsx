import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fmt } from '../store'
import Store from '../store'

export default function Checkout() {
  const { cartItems, total, count } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', city:'', province:'Punjab', notes:'' })
  const [err, setErr]   = useState('')

  if (!count) { navigate('/cart'); return null }

  function set(k, v) { setForm(f => ({...f, [k]: v})) }

  async function place(e) {
    e.preventDefault()
    if (!form.name||!form.phone||!form.address||!form.city) { setErr('Please fill all required (*) fields.'); return }
    const order  = await Store.saveOrder({ customer: form, items: cartItems, total })
    const waUrl  = Store.buildWAOrder(form, cartItems)
    window.open(waUrl, '_blank')
    Store.clearCart()
    navigate('/?order=success')
  }

  const inp = 'border border-gray-300 px-4 py-3.5 text-[11px] font-bold tracking-widest uppercase font-body text-swa-dark bg-white outline-none focus:border-swa-dark w-full transition-colors placeholder:text-gray/50'
  const lbl = 'block text-[9px] uppercase tracking-[.2em] text-swa-dark font-bold mb-2'

  return (
    <div className="pt-28 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 lg:px-10 pb-20">
        <h1 className="font-display uppercase tracking-[.1em] text-swa-dark text-[clamp(28px,5vw,42px)] mb-8 border-b border-gray-200 pb-4">Checkout</h1>
        {err && <p className="bg-swa-gray border border-swa-dark text-swa-dark font-bold px-5 py-4 text-[10px] tracking-widest uppercase mb-6">{err}</p>}
        <form onSubmit={place} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <div className="bg-swa-gray/30 border border-gray-200 p-8 mb-6">
              <h3 className="font-display uppercase tracking-[.1em] text-swa-dark text-xl font-bold mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={lbl}>Full Name *</label><input className={inp} value={form.name}    onChange={e=>set('name',e.target.value)}    placeholder="Your full name" required/></div>
                <div><label className={lbl}>Phone *</label>    <input className={inp} value={form.phone}   onChange={e=>set('phone',e.target.value)}   placeholder="03XX-XXXXXXX" required/></div>
              </div>
              <div className="mt-4"><label className={lbl}>Email (Optional)</label><input className={inp} type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="your@email.com"/></div>
            </div>
            <div className="bg-swa-gray/30 border border-gray-200 p-8 mb-6">
              <h3 className="font-display uppercase tracking-[.1em] text-swa-dark text-xl font-bold mb-6">Delivery Address</h3>
              <div className="mb-5"><label className={lbl}>Street Address *</label><input className={inp} value={form.address} onChange={e=>set('address',e.target.value)} placeholder="House No., Street, Area" required/></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={lbl}>City *</label><input className={inp} value={form.city} onChange={e=>set('city',e.target.value)} placeholder="Lahore, Karachi..." required/></div>
                <div><label className={lbl}>Province</label>
                  <select className={inp} value={form.province} onChange={e=>set('province',e.target.value)}>
                    {['Punjab','Sindh','KPK','Balochistan','AJK','Gilgit-Baltistan'].map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-swa-gray/30 border border-gray-200 p-8">
              <h3 className="font-display uppercase tracking-[.1em] text-swa-dark text-xl font-bold mb-6">Order Notes</h3>
              <textarea className={`${inp} min-h-[100px] resize-y`} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="ANY SPECIAL INSTRUCTIONS?"/>
            </div>
          </div>

          <div>
            <div className="bg-swa-gray/30 border border-gray-200 p-8 lg:sticky lg:top-28">
              <h3 className="font-display uppercase tracking-[.1em] text-swa-dark text-xl font-bold mb-6">Order Summary</h3>
              {cartItems.map(i => (
                <div key={i.id} className="flex gap-4 mb-5 pb-5 border-b border-gray-200">
                  <img src={`/${i.image}`} alt={i.name} className="w-14 h-18 object-cover bg-white flex-shrink-0"/>
                  <div><p className="text-[11px] uppercase tracking-widest text-swa-dark font-bold mb-1.5">{i.name} ×{i.qty}</p><p className="text-[12px] font-body text-swa-text">{fmt(i.price*i.qty)}</p></div>
                </div>
              ))}
              <div className="flex justify-between font-bold text-swa-dark text-base mt-4 mb-6 pt-2">
                <span className="text-[12px] uppercase tracking-widest">Total</span><span className="font-body">{fmt(total)}</span>
              </div>
              <button type="submit" className="w-full mt-2 bg-[#25D366] text-white py-4.5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] hover:bg-[#1da851] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Place Order via WhatsApp
              </button>
              <p className="text-[9px] uppercase tracking-widest text-gray mt-5 leading-relaxed font-bold">📦 COD available. Team will confirm via WhatsApp within 1–2 hours.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
