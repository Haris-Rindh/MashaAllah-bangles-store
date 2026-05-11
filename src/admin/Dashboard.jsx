import { useState, useEffect } from 'react'
import Store, { fmt } from '../store'

const STATUS_CLS = { pending:'bg-yellow-400/15 text-yellow-400', confirmed:'bg-blue-400/15 text-blue-400', delivered:'bg-green-400/15 text-green-400', cancelled:'bg-red-400/15 text-red-400' }

export default function AdminDashboard() {
  const [products, setP] = useState(Store.getProducts())
  const [orders,   setO] = useState(Store.getOrders())
  const refresh = () => { setP(Store.getProducts()); setO(Store.getOrders()) }
  useEffect(() => { refresh() }, [])

  const delivered = orders.filter(o=>o.status==='delivered')
  const revenue   = delivered.reduce((s,o)=>s+(o.total||0),0)

  const stats = [
    { label:'Total Products', value: products.length, color:'text-[#C47A92]' },
    { label:'Total Orders',   value: orders.length,   color:'text-[#facc15]' },
    { label:'Pending',        value: orders.filter(o=>o.status==='pending').length, color:'text-yellow-400' },
    { label:'Revenue (COD)',  value: 'PKR '+revenue.toLocaleString(), color:'text-green-400' },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#3a2535]">
        <h2 className="text-lg font-semibold text-[#d4c0ca]">Dashboard</h2>
        <span className="text-[12px] text-[#8a6878]">{new Date().toLocaleDateString('en-PK',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-[#231a20] border border-[#3a2535] rounded p-5">
            <p className="text-[11px] uppercase tracking-[.1em] text-[#8a6878] mb-2">{s.label}</p>
            <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#231a20] border border-[#3a2535] rounded mb-6">
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#3a2535]">
          <span className="text-sm font-semibold text-[#d4c0ca]">Recent Orders</span>
          <a href="/admin/orders" className="text-[12px] text-[#8a6878] hover:text-[#C47A92]">View All →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-[11px] uppercase tracking-[.1em] text-[#8a6878] border-b border-[#3a2535]">
              <th className="px-4 py-3">Order ID</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th>
            </tr></thead>
            <tbody>{orders.slice(0,6).map(o=>(
              <tr key={o.id} className="border-b border-[#3a2535]/50 hover:bg-white/5">
                <td className="px-4 py-3 text-[11px] text-[#C47A92]">{o.id}</td>
                <td className="px-4 py-3 text-[13px]">{o.customer?.name||'—'}</td>
                <td className="px-4 py-3 text-[13px]">PKR {(o.total||0).toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`text-[11px] px-2.5 py-1 rounded-full ${STATUS_CLS[o.status]||STATUS_CLS.pending}`}>{o.status}</span></td>
                <td className="px-4 py-3 text-[11px] text-[#8a6878]">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}{!orders.length && <tr><td colSpan="5" className="text-center py-10 text-[#8a6878] text-sm">No orders yet.</td></tr>}</tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#231a20] border border-[#3a2535] rounded">
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#3a2535]">
          <span className="text-sm font-semibold text-[#d4c0ca]">Products</span>
          <a href="/admin/products" className="text-[12px] text-[#8a6878] hover:text-[#C47A92]">Manage →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-[11px] uppercase tracking-[.1em] text-[#8a6878] border-b border-[#3a2535]">
              <th className="px-4 py-3">Image</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th>
            </tr></thead>
            <tbody>{products.slice(0,6).map(p=>(
              <tr key={p.id} className="border-b border-[#3a2535]/50 hover:bg-white/5">
                <td className="px-4 py-3"><img src={`/${p.image}`} alt={p.name} className="w-10 h-14 object-cover bg-[#3a2535]"/></td>
                <td className="px-4 py-3 text-[13px] font-medium text-[#d4c0ca]">{p.name}</td>
                <td className="px-4 py-3"><span className="text-[11px] bg-[#C47A92]/20 text-[#C47A92] px-2 py-0.5 rounded">{p.category}</span></td>
                <td className="px-4 py-3 text-[13px]">PKR {p.price.toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`text-[12px] ${p.inStock?'text-green-400':'text-red-400'}`}>{p.inStock?'● In Stock':'● Out'}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
