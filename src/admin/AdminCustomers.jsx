import { useState, useEffect } from 'react'
import Store from '../store'

export default function AdminCustomers() {
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([Store.getUsers(), Store.getOrders()]).then(([u, o]) => {
      setUsers(u)
      setOrders(o)
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-display font-bold text-swa-dark uppercase tracking-widest mb-1">Customers</h1>
          <p className="text-gray text-[10px] uppercase tracking-widest font-bold">Registered users ({users.length})</p>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-swa-gray/30 border-b border-gray-200 text-[10px] uppercase tracking-widest text-gray font-bold">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && <tr><td colSpan="4" className="px-4 py-10 text-center text-gray text-[11px] uppercase tracking-widest font-bold">Loading from Firestore...</td></tr>}
            {!loading && users.length === 0 && <tr><td colSpan="4" className="px-4 py-10 text-center text-gray text-[11px] uppercase tracking-widest font-bold">No registered customers found.</td></tr>}
            {!loading && users.map(user => {
              const userOrders = orders.filter(o => o.userId === user.id || o.customer?.email === user.email)
              return (
                <tr key={user.id} className="hover:bg-swa-gray/30 transition-colors">
                  <td className="px-4 py-3 font-bold text-[12px] text-swa-dark">{user.name}</td>
                  <td className="px-4 py-3 text-[12px] text-gray">{user.email}</td>
                  <td className="px-4 py-3 text-[11px] text-gray font-bold uppercase tracking-widest">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-[12px] font-bold text-swa-dark">{userOrders.length}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
