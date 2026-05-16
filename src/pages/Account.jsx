import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import store from '../store'

export default function Account() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const currentUser = store.getCurrentUser()
    if (!currentUser) {
      navigate('/login')
    } else {
      setUser(currentUser)
      // Fetch orders async
      store.getUserOrders().then(orders => setOrders(orders))
      // Fetch wishlist products async
      const wIds = store.getWishlist()
      Promise.all(wIds.map(id => store.getProductById(id)))
        .then(items => setWishlist(items.filter(Boolean)))
    }
  }, [navigate])

  const handleLogout = () => {
    store.logoutUser()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen pt-36 pb-20 bg-swa-gray/10">
    <div className="max-w-6xl mx-auto px-4 lg:px-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-gray-200 pb-4 mb-10 gap-4">
        <div>
          <h1 className="text-[clamp(28px,5vw,42px)] font-display uppercase tracking-[.1em] text-swa-dark mb-1">My Account</h1>
          <p className="text-[11px] uppercase tracking-widest text-gray font-bold">Welcome back, {user.name} ({user.email})</p>
        </div>
        <button onClick={handleLogout} className="text-[10px] font-bold uppercase tracking-[.2em] underline text-swa-dark hover:text-black transition-colors">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Orders Section */}
        <div>
          <h2 className="text-xl font-display uppercase tracking-[.1em] text-swa-dark mb-6 font-bold">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-[12px] text-gray uppercase tracking-widest font-bold">You haven't placed any orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">
                    <span className="font-bold text-swa-dark">{order.id}</span>
                    <span className="text-gray">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray">Status</span>
                    <span className="uppercase tracking-[.2em] text-[9px] font-bold bg-swa-gray/50 border border-gray-200 px-3 py-1 text-swa-dark">{order.status}</span>
                  </div>
                  <div className="text-[12px] font-bold text-swa-dark mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray mr-2">Total</span> 
                    {store.fmt(order.total || order.items?.reduce((sum, i) => sum + i.price * i.qty, 0) || 0)}
                  </div>
                  <div className="text-[11px] text-gray uppercase tracking-widest leading-relaxed">
                    {order.items?.map(i => `${i.qty}x ${i.name}`).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wishlist Section */}
        <div>
          <h2 className="text-xl font-display uppercase tracking-[.1em] text-swa-dark mb-6 font-bold">My Wishlist</h2>
          {wishlist.length === 0 ? (
            <p className="text-[12px] text-gray uppercase tracking-widest font-bold">Your wishlist is empty.</p>
          ) : (
            <div className="space-y-4">
              {wishlist.map(item => (
                <div key={item.id} className="flex gap-5 bg-white border border-gray-200 p-4 items-center shadow-sm">
                  <img src={store.img(item.image)} alt={item.name} className="w-16 h-20 object-cover bg-swa-gray" />
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`} className="block text-[11px] uppercase tracking-widest font-bold text-swa-dark hover:underline mb-1">
                      {item.name}
                    </Link>
                    <div className="text-[12px] font-body text-swa-dark">{store.fmt(item.price)}</div>
                  </div>
                  <button 
                    onClick={() => {
                      store.toggleWishlist(item.id)
                      setWishlist(wishlist.filter(w => w.id !== item.id))
                    }}
                    className="text-[10px] font-bold uppercase tracking-[.2em] underline text-red-500 hover:text-red-700 transition-colors p-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}
