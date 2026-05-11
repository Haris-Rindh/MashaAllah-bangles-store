import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const NAV = [
  { label: 'Jewellery', cat: 'jewellery', cols: [
    { heading: 'Bridal Sets',  links: [['Bridal Heavy Set','bridal-heavy'],['Light Bridal Set','light-bridal'],['Gold Necklace','gold-necklace'],['Silver Jewellery','silver'],['Pearl Necklace','pearl-necklace'],['Stone Studded','stone-studded']] },
    { heading: 'Necklaces & Earrings', links: [['Choker Necklace','choker'],['Long Chain','long-chain'],['Stud Earrings','stud'],['Jhumka Earrings','jhumka']] },
    { heading: 'Rings & More', links: [['Fancy Rings','fancy-rings'],['Anklets (Payal)','anklets'],['Nose Ring (Nath)','nose-ring'],['Kids Jewellery','kids']] },
  ], feat: { img: 'images (3).jpeg', caption: 'Bridal & Party' } },
  { label: 'Bangles', cat: 'bangles', cols: [
    { heading: 'Bridal',      links: [['Bridal Heavy','bridal-heavy'],['Fancy Set','fancy'],['Wedding Bangles','wedding'],['Luxury','luxury'],['Designer','designer']] },
    { heading: 'By Material', links: [['Glass (Chooriyan)','glass'],['Metal Gold','metal-gold'],['Silver','silver'],['Lac Bangles','lac'],['Stone','stone'],['Silk Thread','silk']] },
    { heading: 'Everyday',    links: [['Daily Wear','daily'],['Adjustable','adjustable'],['Kids','kids']] },
  ], feat: { img: 'images (4).jpeg', caption: 'Signature Collections' } },
  { label: 'Cosmetics', cat: 'cosmetics', cols: [
    { heading: 'Face Makeup', links: [['Bridal Kit','bridal-kit'],['Pro Kit','pro-kit'],['Foundation','foundation'],['Compact Powder','compact'],['Concealer','concealer']] },
    { heading: 'Eyes & Lips', links: [['Matte Lipsticks','matte-lip'],['Gloss','gloss'],['Eyeliner','eyeliner'],['Mascara','mascara'],['Blush','blush']] },
    { heading: 'Skincare',    links: [['Face Wash','face-wash'],['Face Creams','creams'],['Whitening Lotion','lotion'],['Sunscreen','sunscreen'],['Beauty Serum','serum']] },
  ], feat: { img: 'images (5).jpeg', caption: 'Premium Beauty' } },
  { label: 'Perfumes', cat: 'perfumes', cols: [
    { heading: 'Luxury',       links: [['Arabic Luxury','arabic'],['Oud Perfume','oud'],['Bridal Box','bridal-box'],['Gift Set','gift-set']] },
    { heading: 'Floral & Fresh',links: [['Floral','floral'],['Rose','rose'],['Vanilla','vanilla'],['Body Mist','body-mist']] },
    { heading: 'Daily Wear',   links: [['Roll-On Attar','attar'],['Pocket Mini','pocket'],['Unisex','unisex'],['Daily Spray','daily']] },
  ], feat: { img: 'images (6).jpeg', caption: 'Signature Fragrances' } },
  { label: 'Baby Care', cat: 'baby', cols: [
    { heading: 'Skincare',  links: [['Baby Lotion','lotion'],['Baby Shampoo','shampoo'],['Baby Oil','oil'],['Baby Powder','powder'],['Baby Soap','soap']] },
    { heading: 'Kits',      links: [['Gift Kit','gift-kit'],['Bath Kit','bath-kit'],['Newborn Box','newborn'],['Baby Wipes','wipes'],['Diaper Pack','diaper']] },
  ], feat: { img: 'images (7).jpeg', caption: 'Gentle Baby Care' } },
  { label: 'Clothing', cat: 'clothing', cols: [
    { heading: 'Innerwear', links: [['Ladies Bunyan','bunyan'],['Bras Collection','bras'],['Sports Bra','sports-bra'],['Innerwear Set','innerwear-set'],['Undergarments','undergarments']] },
  ], feat: { img: 'images (8).jpeg', caption: 'Comfort & Style' } },
]

export default function Header() {
  const [navOpen,  setNavOpen]        = useState(false)   // mega hover
  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [openSub,  setOpenSub]        = useState(null)
  const [megaTop,  setMegaTop]        = useState(0)
  const hdrRef  = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useCart()

  // Promo messages
  const promos = ['Free delivery on orders over PKR 2,000 · Shop Now','New Bridal Collection 2025 — Online Now','Luxury Bangles · Jewellery · Cosmetics · Perfumes']
  const [promoIdx, setPromoIdx] = useState(0)
  useEffect(() => { const t = setInterval(() => setPromoIdx(i => (i+1)%promos.length), 4000); return () => clearInterval(t) }, [])

  useEffect(() => {
    function update() {
      if (hdrRef.current) setMegaTop(hdrRef.current.getBoundingClientRect().bottom)
    }
    // Use ResizeObserver for accurate header measurement
    const ro = new ResizeObserver(update)
    if (hdrRef.current) ro.observe(hdrRef.current)
    update()
    return () => ro.disconnect()
  }, [navOpen])

  // Close drawer and mega menu on route change
  useEffect(() => { setDrawerOpen(false); setNavOpen(false) }, [location])

  useEffect(() => {
    if (drawerOpen) {
      document.getElementById('drawer-close-btn')?.focus()
    }
  }, [drawerOpen])

  return (
    <>
      {/* PROMO — Always visible */}
      <div className="fixed top-0 left-0 right-0 h-10 z-[1002] bg-swa-dark text-white flex items-center justify-center text-[10px] tracking-[.15em] uppercase">
        <span key={promoIdx} className="animate-fade">{promos[promoIdx]}</span>
      </div>

      {/* HEADER — Always static style */}
      <header
        ref={hdrRef}
        className="fixed left-0 right-0 top-10 z-[1001] flex flex-col bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.08)] transition-all duration-400"
      >
        {/* Main row */}
        <div className="flex items-center px-4 lg:px-10 py-3 lg:py-4">
          {/* Hamburger — mobile only */}
          <button className="lg:hidden flex flex-col gap-1.5 p-1.5 mr-3" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            {[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-swa-dark"/>)}
          </button>

          {/* Logo */}
          <Link to="/" className="flex flex-col mr-4 lg:mr-10 flex-shrink-0">
            <span className="font-display uppercase tracking-[.15em] text-swa-dark text-xl lg:text-3xl leading-none">MashaAllah</span>
            <span className="font-body text-[7px] tracking-[.2em] text-gray uppercase mt-1 hidden lg:block">Bangles &amp; Cosmetic</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex flex-1 justify-center lg:justify-start items-center gap-2" onMouseLeave={() => setNavOpen(null)}>
            {NAV.map(item => (
              <div key={item.cat} className="nav-item group relative flex items-center h-full" onMouseEnter={() => setNavOpen(item.cat)}>
                <Link
                  to={`/category/${item.cat}`}
                  onClick={() => setNavOpen(null)}
                  className="block px-4 py-2 text-[11px] font-body font-bold uppercase tracking-[.12em] border-b-2 border-transparent text-swa-dark hover:border-swa-dark transition-all duration-200"
                >
                  {item.label}
                </Link>
                {/* Mega menu */}
                {navOpen === item.cat && (
                  <div className="mega-menu border-t border-gray-200" style={{ top: megaTop }}>
                    <div className="max-w-6xl mx-auto flex gap-10 px-10 py-10">
                      {item.cols.map((col, ci) => (
                        <div key={ci} className="flex-1 pr-6 border-r border-gray-200 last:border-0 last:pr-0">
                          <h5 className="text-[10px] uppercase tracking-[.15em] text-swa-dark font-bold mb-4">{col.heading}</h5>
                          {col.links.map(([label, sub]) => (
                            <Link key={sub} to={`/category/${item.cat}?sub=${sub}`}
                              onClick={() => setNavOpen(null)}
                              className="block text-[12px] text-gray py-1.5 hover:text-swa-dark hover:underline transition-all">
                              {label}
                            </Link>
                          ))}
                        </div>
                      ))}
                      {item.feat && (
                        <div className="w-56 flex-shrink-0 ml-5">
                          <div className="aspect-[4/5] overflow-hidden mb-3 bg-swa-gray p-2">
                            <img src={`/${item.feat.img}`} alt={item.feat.caption} className="w-full h-full object-cover"/>
                          </div>
                          <p className="text-[11px] uppercase tracking-[.1em] text-swa-dark text-center font-bold">{item.feat.caption}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 ml-auto flex-shrink-0">
            <button onClick={() => navigate('/search')} className="p-1.5 transition-colors text-swa-dark hover:opacity-60" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <Link to="/cart" className="p-1.5 relative transition-colors text-swa-dark hover:opacity-60" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {count > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-swa-dark text-white text-[9px] font-bold rounded-full flex items-center justify-center">{count > 9 ? '9+' : count}</span>}
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {drawerOpen && <div className="fixed inset-0 bg-black/50 z-[1003]" onClick={() => setDrawerOpen(false)}/>}
      <nav className={`fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-white z-[1004] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <span className="font-display uppercase tracking-[.15em] text-swa-dark text-xl">MashaAllah</span>
          <button id="drawer-close-btn" onClick={() => setDrawerOpen(false)} className="text-swa-dark text-2xl p-1 leading-none">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {NAV.map(item => (
            <div key={item.cat}>
              <button
                className="w-full text-left flex justify-between items-center px-6 py-4 border-b border-gray-100 text-[11px] uppercase tracking-[.1em] text-swa-dark hover:bg-swa-gray transition-colors font-bold"
                onClick={() => setOpenSub(openSub === item.cat ? null : item.cat)}
              >
                {item.label} <span className={`text-gray transition-transform ${openSub===item.cat ? 'rotate-90' : ''}`}>›</span>
              </button>
              {openSub === item.cat && (
                <div className="bg-swa-gray/30">
                  {item.cols.flatMap(c => c.links).map(([label, sub]) => (
                    <Link key={sub} to={`/category/${item.cat}?sub=${sub}`}
                      className="block px-8 py-3 text-[12px] text-gray border-b border-gray-100 hover:text-swa-dark hover:underline transition-colors"
                      onClick={() => setDrawerOpen(false)}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6 px-6 pb-10">
            <Link to="/products" className="block w-full text-center bg-swa-dark text-white py-3.5 text-[10px] uppercase tracking-[.15em] font-bold hover:bg-black/80 transition-colors mb-3" onClick={() => setDrawerOpen(false)}>All Products</Link>
            <Link to="/cart" className="block w-full text-center border border-swa-dark text-swa-dark py-3.5 text-[10px] uppercase tracking-[.15em] font-bold hover:bg-swa-gray transition-colors" onClick={() => setDrawerOpen(false)}>Bag ({count})</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
