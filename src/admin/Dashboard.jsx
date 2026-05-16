import { useState, useEffect } from 'react'
import Store from '../store'

const STATUS_CLS = { pending:'bg-yellow-400/15 text-yellow-600', confirmed:'bg-blue-400/15 text-blue-600', delivered:'bg-green-400/15 text-green-600', cancelled:'bg-red-400/15 text-red-600' }

export default function AdminDashboard() {
  const [products, setP] = useState([])
  const [orders,   setO] = useState([])

  useEffect(() => {
    const unsub1 = Store.onProductsSnapshot(setP)
    const unsub2 = Store.onOrdersSnapshot(setO)
    return () => { unsub1(); unsub2() }
  }, [])

  const delivered = orders.filter(o=>o.status==='delivered')
  const revenue   = delivered.reduce((s,o)=>s+(o.total||0),0)

  const stats = [
    { label:'Total Products', value: products.length, color:'text-swa-dark' },
    { label:'Total Orders',   value: orders.length,   color:'text-swa-dark' },
    { label:'Pending',        value: orders.filter(o=>o.status==='pending').length, color:'text-yellow-600' },
    { label:'Revenue (COD)',  value: 'PKR '+revenue.toLocaleString(), color:'text-green-600' },
  ]

  return (
    <div className="p-4 lg:p-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-display uppercase tracking-widest text-swa-dark font-bold">Dashboard</h2>
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray">{new Date().toLocaleDateString('en-PK',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-gray font-bold mb-2">{s.label}</p>
            <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 shadow-sm mb-6">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
          <span className="text-[11px] uppercase tracking-widest font-bold text-swa-dark">Recent Orders</span>
          <a href="/admin/orders" className="text-[10px] uppercase tracking-widest text-gray hover:text-swa-dark font-bold">View All →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-[10px] uppercase tracking-widest text-gray font-bold border-b border-gray-200 bg-swa-gray/30">
              <th className="px-4 py-3">Order ID</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th>
            </tr></thead>
            <tbody>{orders.slice(0,6).map(o=>(
              <tr key={o.id} className="border-b border-gray-100 hover:bg-swa-gray/30 transition-colors">
                <td className="px-4 py-3 text-[11px] font-bold text-swa-dark">{o.id}</td>
                <td className="px-4 py-3 text-[13px]">{o.customer?.name||'—'}</td>
                <td className="px-4 py-3 text-[13px] font-bold text-swa-dark">PKR {(o.total||0).toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 ${STATUS_CLS[o.status]||STATUS_CLS.pending}`}>{o.status}</span></td>
                <td className="px-4 py-3 text-[11px] text-gray uppercase tracking-widest font-bold">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}{!orders.length && <tr><td colSpan="5" className="text-center py-10 text-gray text-[11px] uppercase tracking-widest font-bold">No orders yet.</td></tr>}</tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
          <span className="text-[11px] uppercase tracking-widest font-bold text-swa-dark">Products</span>
          <a href="/admin/products" className="text-[10px] uppercase tracking-widest text-gray hover:text-swa-dark font-bold">Manage →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-[10px] uppercase tracking-widest text-gray font-bold border-b border-gray-200 bg-swa-gray/30">
              <th className="px-4 py-3">Image</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th>
            </tr></thead>
            <tbody>{products.slice(0,6).map(p=>(
              <tr key={p.id} className="border-b border-gray-100 hover:bg-swa-gray/30 transition-colors">
                <td className="px-4 py-3"><img src={`/${p.image}`} alt={p.name} className="w-10 h-14 object-cover bg-swa-gray"/></td>
                <td className="px-4 py-3 text-[12px] font-bold text-swa-dark">{p.name}</td>
                <td className="px-4 py-3"><span className="text-[9px] uppercase tracking-widest font-bold bg-swa-gray text-swa-dark px-2 py-1">{p.category}</span></td>
                <td className="px-4 py-3 text-[12px] font-bold text-swa-dark">PKR {p.price.toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`text-[10px] uppercase tracking-widest font-bold ${p.inStock?'text-green-600':'text-red-500'}`}>{p.inStock?'● In Stock':'● Out'}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
