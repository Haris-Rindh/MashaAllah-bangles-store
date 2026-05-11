import { useState, useEffect } from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'

const PIN = '1234'

function NavItem({ to, icon, label }) {
  const loc = useLocation()
  const active = loc.pathname === to
  return (
    <Link to={to} className={`flex items-center gap-3 px-6 py-3 text-[13px] border-l-[3px] transition-colors ${active ? 'border-rose-400 bg-rose-400/10 text-rose-400' : 'border-transparent text-[#8a6878] hover:text-[#d4c0ca] hover:bg-white/5'}`}>
      <span>{icon}</span>{label}
    </Link>
  )
}

export default function AdminLayout() {
  const [auth, setAuth]   = useState(sessionStorage.getItem('mab_admin')==='1')
  const [pin,  setPin]    = useState(['','','',''])
  const [err,  setErr]    = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  function handleDigit(i, v) {
    if (!/^\d?$/.test(v)) return
    const next = [...pin]; next[i] = v; setPin(next)
    if (v && i < 3) document.getElementById(`pd${i+1}`)?.focus()
    if (next.every(d=>d)) {
      if (next.join('') === PIN) { sessionStorage.setItem('mab_admin','1'); setAuth(true) }
      else { setErr('Incorrect PIN'); setPin(['','','','']); document.getElementById('pd0')?.focus() }
    }
  }
  function handleKey(i, e) { if (e.key==='Backspace' && !pin[i] && i>0) document.getElementById(`pd${i-1}`)?.focus() }

  if (!auth) return (
    <div className="min-h-screen bg-[#0f0a0d] flex flex-col items-center justify-center gap-6">
      <h2 className="font-display text-[#C47A92] text-4xl font-bold">Admin Access</h2>
      <p className="text-[#8a6878] text-sm">Enter your 4-digit PIN</p>
      <div className="flex gap-3">
        {pin.map((d,i) => (
          <input key={i} id={`pd${i}`} type="password" maxLength={1} inputMode="numeric" value={d}
            aria-label={`PIN digit ${i+1}`} autoComplete="off"
            onChange={e=>handleDigit(i,e.target.value)} onKeyDown={e=>handleKey(i,e)}
            className="w-12 h-14 bg-[#231a20] border border-[#3a2535] text-[#d4c0ca] text-2xl text-center outline-none focus:border-[#C47A92] rounded"/>
        ))}
      </div>
      {err && <p className="text-red-400 text-sm">{err}</p>}
      <p className="text-[#8a6878] text-xs">Default PIN: <strong className="text-[#C47A92]">1234</strong></p>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#0f0a0d] text-[#d4c0ca]">
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      
      <aside className={`w-56 bg-[#1a1017] border-r border-[#3a2535] flex flex-col fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="px-6 py-7 border-b border-[#3a2535] flex justify-between items-center">
          <div>
            <h1 className="font-display text-[#C47A92] text-xl font-bold">MashaAllah</h1>
            <span className="text-[10px] text-[#8a6878] uppercase tracking-widest">Admin Panel</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#8a6878] text-xl">✕</button>
        </div>
        <nav className="py-4 flex-1" onClick={() => setSidebarOpen(false)}>
          <p className="px-6 py-2 text-[10px] text-[#8a6878] uppercase tracking-[.14em]">Main</p>
          <NavItem to="/admin"          icon="⊞" label="Dashboard"/>
          <NavItem to="/admin/products" icon="◈" label="Products"/>
          <NavItem to="/admin/orders"   icon="⊡" label="Orders"/>
          <p className="px-6 py-2 mt-2 text-[10px] text-[#8a6878] uppercase tracking-[.14em]">Store</p>
          <a href="/" target="_blank" className="flex items-center gap-3 px-6 py-3 text-[13px] text-[#8a6878] hover:text-[#d4c0ca] transition-colors">⌂ View Storefront ↗</a>
        </nav>
        <div className="px-6 py-4 border-t border-[#3a2535] text-[11px] text-[#8a6878]">
          <p>Logged in as Admin</p>
          <button onClick={() => { sessionStorage.removeItem('mab_admin'); setAuth(false) }} className="text-[#C47A92] mt-1 hover:underline">Logout</button>
        </div>
      </aside>
      
      <div className="flex-1 flex flex-col min-h-screen lg:ml-56 w-full max-w-full">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#1a1017] border-b border-[#3a2535] px-4 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="text-[#d4c0ca] p-1 flex flex-col gap-1.5">
            <span className="w-5 h-px bg-current"></span>
            <span className="w-5 h-px bg-current"></span>
            <span className="w-5 h-px bg-current"></span>
          </button>
          <span className="font-display text-[#C47A92] font-bold text-lg">Admin</span>
        </div>
        <Outlet/>
      </div>
    </div>
  )
}
