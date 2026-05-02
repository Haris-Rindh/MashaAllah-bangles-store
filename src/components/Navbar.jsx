import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setIsOpen } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { label: 'Home',       to: '/' },
    { label: 'Shop',       to: '/shop' },
    { label: 'Bangles',    to: '/shop?cat=bangles' },
    { label: 'Jewellery',  to: '/shop?cat=jewellery' },
    { label: 'Pikoo',      to: '/#section-about' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(253,251,247,0.92)' : isHome ? 'transparent' : 'rgba(253,251,247,0.95)',
        backdropFilter: 'blur(18px)',
        borderBottom: scrolled ? '1px solid #E4D5C8' : '1px solid transparent',
        padding: scrolled ? '0.75rem 0' : '1.1rem 0',
      }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#C9906A,#EAB8C8)', boxShadow: '0 2px 12px rgba(201,144,106,0.3)' }}>
            <span style={{ fontFamily: '"Playfair Display"', fontWeight: 700, color: '#fff', fontSize: '0.8rem' }}>M</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="font-display text-sm font-semibold text-charcoal">MashaAllah</p>
            <p className="text-[9px] tracking-[0.25em] uppercase" style={{ color: '#C9906A' }}>Bangles & Cosmetics</p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7 items-center">
          {links.map(l => (
            <li key={l.label}>
              <Link to={l.to}
                className="text-xs font-medium tracking-widest uppercase transition-colors duration-200"
                style={{ color: '#6B5548' }}
                onMouseEnter={e => e.target.style.color = '#C9906A'}
                onMouseLeave={e => e.target.style.color = '#6B5548'}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Bag button */}
          <button id="open-bag-btn" onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 text-xs font-medium tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200"
            style={{ border: '1.5px solid #E4D5C8', color: '#6B5548' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#C9906A'; e.currentTarget.style.color='#C9906A' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#E4D5C8'; e.currentTarget.style.color='#6B5548' }}>
            Bag
            {count > 0 && (
              <span className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ background: '#C9906A', color: '#fff' }}>
                {count}
              </span>
            )}
          </button>

          {/* Shop CTA */}
          <Link to="/shop" className="hidden md:block btn-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.72rem' }}>
            Shop Now
          </Link>

          {/* Mobile burger */}
          <button id="mobile-menu-btn" className="md:hidden flex flex-col gap-1.5 ml-1" onClick={() => setMenuOpen(p => !p)}>
            {[0,1,2].map(i => (
              <span key={i} className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  background: '#1C1412',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px,5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px,-5px)' : 'none',
                }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#FDFBF7', borderTop: '1px solid #E4D5C8' }}>
          {links.map(l => (
            <Link key={l.label} to={l.to} onClick={() => setMenuOpen(false)}
              className="block px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors"
              style={{ color: '#6B5548', borderBottom: '1px solid #F5EDE0' }}
              onMouseEnter={e => e.target.style.color='#C9906A'}
              onMouseLeave={e => e.target.style.color='#6B5548'}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
