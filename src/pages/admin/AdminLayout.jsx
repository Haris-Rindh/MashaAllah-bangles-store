import { useState } from 'react';
import { LayoutDashboard, Package, ShoppingBag, Menu, X, Plus, LogOut } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { ADMIN_PIN, STORE_NAME } from '../../config';

/* ─── PIN Gate ────────────────────────────────────────────────────────────── */
function PinGate({ onUnlock }) {
  const [pin,   setPin]   = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('masha_admin_auth', '1')
      onUnlock()
    } else {
      setError(true)
      setPin('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EDE0]">
      <form onSubmit={handleSubmit}
        className="bg-[#FDFBF7] p-10 rounded-2xl shadow-lg border border-[#E5D7CA] w-80 flex flex-col items-center gap-2">
        {/* Logo */}
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
          style={{ background: 'linear-gradient(135deg,#C9906A,#EAB8C8)', boxShadow: '0 4px 20px rgba(201,144,106,0.3)' }}>
          <span style={{ fontFamily: '"Playfair Display"', fontWeight: 700, color: '#fff', fontSize: '1.3rem' }}>M</span>
        </div>
        <h2 className="font-serif text-2xl text-[#3A3029]">Admin Access</h2>
        <p className="text-sm text-[#8B7355] mb-4 text-center">{STORE_NAME}</p>

        <input
          type="password"
          value={pin}
          onChange={e => setPin(e.target.value)}
          placeholder="Enter PIN"
          autoFocus
          className={`w-full px-4 py-3 rounded-xl border text-center text-[#5C4D43] tracking-widest focus:outline-none focus:ring-2 focus:ring-[#C9906A]/40 transition-all
            ${error ? 'border-red-400 bg-red-50 shake' : 'border-[#E5D7CA]'}`}
        />
        {error && <p className="text-red-500 text-xs -mt-1">Incorrect PIN. Try again.</p>}

        <button type="submit"
          className="w-full py-3 mt-1 bg-[#C9906A] text-white rounded-xl font-semibold hover:bg-[#b87d55] transition-colors shadow-md shadow-[#C9906A]/20">
          Unlock Panel
        </button>
      </form>
    </div>
  )
}

/* ─── Admin Layout ────────────────────────────────────────────────────────── */
export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('masha_admin_auth') === '1'
  )

  if (!authed) {
    return <PinGate onUnlock={() => setAuthed(true)} />
  }

  const logout = () => {
    sessionStorage.removeItem('masha_admin_auth')
    setAuthed(false)
  }

  return (
    <div className="flex h-screen bg-[#F5EDE0] font-sans">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-[#3A3029]/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#FDFBF7] border-r border-[#E5D7CA]
        transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-[#E5D7CA]/50">
            <h2 className="text-xl font-semibold text-[#5C4D43] tracking-wide font-serif">MashaAllah</h2>
            <button className="lg:hidden text-[#8B7355]" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {[
              { to: '/admin/products',    icon: <Package className="w-5 h-5" />,     label: 'Products'    },
              { to: '/admin/add-product', icon: <Plus className="w-5 h-5" />,        label: 'Add Product' },
              { to: '/admin/orders',      icon: <ShoppingBag className="w-5 h-5" />, label: 'Orders'      },
            ].map(({ to, icon, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive
                    ? 'bg-[#C9906A] text-white shadow-md shadow-[#C9906A]/20'
                    : 'text-[#8B7355] hover:bg-[#F5EDE0] hover:text-[#5C4D43]'}`}>
                {icon}
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-4 pb-6">
            <button onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-[#8B7355] hover:bg-red-50 hover:text-red-500 transition-all duration-300">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="lg:hidden bg-[#FDFBF7] border-b border-[#E5D7CA] p-4 flex items-center shadow-sm relative z-30">
          <button onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-[#8B7355] hover:bg-[#F5EDE0] rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-3 font-semibold text-[#5C4D43] font-serif">Admin Panel</span>
        </header>
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
