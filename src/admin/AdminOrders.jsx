import { useState, useEffect } from 'react'
import Store from '../store'

const STATUS_CLS = { pending:'bg-yellow-400/15 text-yellow-600', confirmed:'bg-blue-400/15 text-blue-600', delivered:'bg-green-400/15 text-green-600', cancelled:'bg-red-400/15 text-red-600' }
const STATUSES   = ['pending','confirmed','delivered','cancelled']

export default function AdminOrders() {
  const [orders, setO]    = useState([])
  const [q, setQ]         = useState('')
  const [sf, setSf]       = useState('')
  const [selected, setSel]= useState(null)

  useEffect(() => {
    const unsub = Store.onOrdersSnapshot(setO)
    return () => unsub()
  }, [])

  async function changeStatus(id, status) {
    await Store.updateStatus(id, status)
    if (selected?.id === id) setSel(s => ({ ...s, status }))
  }

  const filtered = orders.filter(o => {
    if (sf && o.status!==sf) return false
    if (q && !(o.customer?.name||'').toLowerCase().includes(q.toLowerCase()) && !o.id.includes(q)) return false
    return true
  })
  const pending   = orders.filter(o=>o.status==='pending').length
  const delivered = orders.filter(o=>o.status==='delivered').length
  const revenue   = orders.filter(o=>o.status==='delivered').reduce((s,o)=>s+(o.total||0),0)

  const inp = 'bg-white border border-gray-300 text-swa-dark px-3 py-2 text-sm outline-none focus:border-swa-dark rounded-none'

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl font-display uppercase tracking-widest text-swa-dark font-bold mb-6 pb-4 border-b border-gray-200">Orders Management</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[['Total',orders.length,'text-swa-dark'],['Pending',pending,'text-yellow-600'],['Delivered',delivered,'text-green-600'],['Revenue','PKR '+revenue.toLocaleString(),'text-swa-dark']].map(([l,v,c])=>(
          <div key={l} className="bg-white border border-gray-200 shadow-sm p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray font-bold mb-1">{l}</p>
            <p className={`font-display text-2xl font-bold ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-5">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name or order ID..." className={`${inp} flex-1 max-w-sm`}/>
        <select value={sf} onChange={e=>setSf(e.target.value)} className={`${inp} w-44`}>
          <option value="">All Statuses</option>
          {STATUSES.map(s=><option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead><tr className="text-left text-[10px] uppercase tracking-widest text-gray font-bold border-b border-gray-200 bg-swa-gray/30">
            <th className="px-4 py-3">ID</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Items</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Actions</th>
          </tr></thead>
          <tbody>{filtered.map(o=>(
            <tr key={o.id} className="border-b border-gray-100 hover:bg-swa-gray/30 transition-colors cursor-pointer" onClick={()=>setSel(o)}>
              <td className="px-4 py-3 text-[11px] font-bold text-swa-dark">{o.id}</td>
              <td className="px-4 py-3 text-[13px] font-medium text-swa-dark">{o.customer?.name||'—'}</td>
              <td className="px-4 py-3 text-[12px] text-gray font-bold">{o.customer?.phone||'—'}</td>
              <td className="px-4 py-3 text-[12px] font-bold text-swa-dark">{(o.items||[]).length}</td>
              <td className="px-4 py-3 text-[13px] font-bold text-swa-dark">PKR {(o.total||0).toLocaleString()}</td>
              <td className="px-4 py-3"><span className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 ${STATUS_CLS[o.status]||STATUS_CLS.pending}`}>{o.status}</span></td>
              <td className="px-4 py-3 text-[11px] text-gray uppercase tracking-widest font-bold">{new Date(o.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                <div className="flex gap-1.5 flex-wrap">
                  <button onClick={()=>changeStatus(o.id,'confirmed')} className="text-[11px] bg-blue-50 border border-blue-200 text-blue-600 px-2 py-1 hover:bg-blue-600 hover:text-white transition-colors">✓</button>
                  <button onClick={()=>changeStatus(o.id,'delivered')} className="text-[11px] bg-green-50 border border-green-200 text-green-600 px-2 py-1 hover:bg-green-600 hover:text-white transition-colors">📦</button>
                  <button onClick={()=>changeStatus(o.id,'cancelled')} className="text-[11px] bg-red-50 border border-red-200 text-red-600 px-2 py-1 hover:bg-red-600 hover:text-white transition-colors">✕</button>
                </div>
              </td>
            </tr>
          ))}{!filtered.length&&<tr><td colSpan="8" className="text-center py-10 text-gray uppercase tracking-widest font-bold text-[11px]">No orders found.</td></tr>}</tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={()=>setSel(null)}>
          <div className="bg-white border border-gray-200 shadow-xl rounded-none w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-swa-dark">{selected.id}</h3>
              <button onClick={()=>setSel(null)} className="text-gray text-lg hover:text-swa-dark">✕</button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                <div><p className="text-[10px] uppercase tracking-widest font-bold text-gray mb-2">Customer</p><p className="text-swa-dark font-bold text-[13px]">{selected.customer?.name}</p><p className="text-gray text-[12px] mt-1 font-bold">📞 {selected.customer?.phone}</p><p className="text-gray text-[12px] font-bold mt-1">📍 {selected.customer?.address}, {selected.customer?.city}</p></div>
                <div><p className="text-[10px] uppercase tracking-widest font-bold text-gray mb-2">Status</p><span className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 ${STATUS_CLS[selected.status]||STATUS_CLS.pending}`}>{selected.status}</span><div className="flex flex-wrap gap-1.5 mt-3">{STATUSES.map(s=><button key={s} onClick={()=>changeStatus(selected.id,s)} className="text-[9px] uppercase tracking-widest font-bold bg-swa-gray border border-gray-200 text-swa-dark px-2 py-1 hover:bg-black hover:text-white transition-colors">{s}</button>)}</div></div>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray mb-2">Items</p>
              {(selected.items||[]).map(i=><div key={i.id} className="flex justify-between text-[13px] py-1.5 border-b border-gray-100 font-bold"><span className="text-swa-dark">{i.name} ×{i.qty}</span><span className="text-swa-dark">PKR {(i.price*i.qty).toLocaleString()}</span></div>)}
              <div className="flex justify-between font-display text-xl text-swa-dark mt-3 pt-3 border-t border-gray-200 uppercase tracking-widest"><span>Total</span><span>PKR {(selected.total||0).toLocaleString()}</span></div>
              <a href={Store.buildWAOrder(selected.customer||{},selected.items||[])} target="_blank" rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-[#1da851] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                Resend via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
