import { useState } from 'react'
import { ShoppingBag, MessageCircle, Clock } from 'lucide-react'

// WhatsApp orders are tracked via localStorage
const KEY = 'masha_admin_orders'

function getOrders() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

const STATUS_COLORS = {
  New:        'bg-blue-50 text-blue-600 border-blue-100',
  Processing: 'bg-amber-50 text-amber-600 border-amber-100',
  Shipped:    'bg-purple-50 text-purple-600 border-purple-100',
  Delivered:  'bg-emerald-50 text-emerald-600 border-emerald-100',
  Cancelled:  'bg-red-50 text-red-500 border-red-100',
}

export default function OrderList() {
  const [orders, setOrders] = useState(() => getOrders())

  const updateStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o)
    localStorage.setItem(KEY, JSON.stringify(updated))
    setOrders(updated)
  }

  return (
    <div className="p-6 md:p-10 text-[#5C4D43] max-w-7xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#3A3029] tracking-tight">Orders</h1>
        <p className="text-[#8B7355] mt-1 text-sm">
          Orders are placed via WhatsApp. Track their status here.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#FDFBF7] rounded-2xl border border-[#E5D7CA]/60 p-16 text-center">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-[#E5D7CA]" />
          <h2 className="font-serif text-xl text-[#3A3029] mb-2">No orders yet</h2>
          <p className="text-sm text-[#8B7355] max-w-sm mx-auto mb-6">
            When customers place orders via WhatsApp, you can manually log them here to track their status.
          </p>
          <button
            onClick={() => {
              const demo = {
                id: `order_${Date.now()}`,
                customer: 'Demo Customer',
                items: 'Metal Bangle Set ×2, Oud Al Layl ×1',
                total: 6100,
                status: 'New',
                phone: '03001234567',
                date: new Date().toLocaleDateString('en-PK'),
              }
              const updated = [demo, ...orders]
              localStorage.setItem(KEY, JSON.stringify(updated))
              setOrders(updated)
            }}
            className="bg-[#C9906A] text-white px-5 py-2.5 rounded-xl hover:bg-[#b87d55] transition-all font-medium text-sm">
            + Add Demo Order
          </button>
        </div>
      ) : (
        <div className="bg-[#FDFBF7] rounded-2xl shadow-sm border border-[#E5D7CA]/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E5D7CA]/50 bg-[#F5EDE0]/40 text-[#8B7355] text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Order</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Items</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5D7CA]/30">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-[#F5EDE0]/20 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-mono text-xs text-[#BFAEA3]">#{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-[#8B7355] mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.date}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-[#3A3029]">{order.customer}</p>
                      <a href={`https://wa.me/92${order.phone}`} target="_blank" rel="noreferrer"
                        className="text-xs text-[#C9906A] flex items-center gap-1 mt-0.5 hover:underline">
                        <MessageCircle className="w-3 h-3" /> {order.phone}
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-[#5C4D43] max-w-[200px] line-clamp-2">{order.items}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-[#5C4D43]">Rs. {order.total.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[order.status] || STATUS_COLORS.New}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-[#E5D7CA] bg-white text-[#5C4D43] focus:outline-none focus:ring-2 focus:ring-[#C9906A]/40 cursor-pointer">
                        {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-[#E5D7CA]/50 text-sm text-[#8B7355] bg-[#F5EDE0]/20">
            {orders.length} total order{orders.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  )
}
