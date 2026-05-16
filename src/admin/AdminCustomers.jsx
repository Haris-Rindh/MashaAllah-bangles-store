import { useState, useEffect } from 'react'
import store from '../store'

export default function AdminCustomers() {
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    setUsers(store.getUsers())
    setOrders(store.getOrders())
  }, [])

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#C47A92] mb-1">Customers</h1>
          <p className="text-[#8a6878] text-sm">Manage registered users</p>
        </div>
      </div>
      
      <div className="bg-[#1a1017] border border-[#3a2535] overflow-x-auto">
        <table className="w-full text-left text-sm text-[#d4c0ca]">
          <thead className="bg-[#231a20] border-b border-[#3a2535] text-[11px] uppercase tracking-wider text-[#8a6878]">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3a2535]">
            {users.length === 0 ? (
              <tr><td colSpan="4" className="px-4 py-8 text-center text-[#8a6878]">No registered customers found.</td></tr>
            ) : (
              users.map(user => {
                const userOrders = orders.filter(o => o.userId === user.id || o.customer?.email === user.email)
                return (
                  <tr key={user.id} className="hover:bg-[#231a20] transition-colors">
                    <td className="px-4 py-3 font-medium text-[#C47A92]">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{userOrders.length}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
