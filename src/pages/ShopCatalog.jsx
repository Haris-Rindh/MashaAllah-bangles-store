import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ShopCatalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState(searchParams.get('cat') || 'all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setActive(searchParams.get('cat') || 'all')
  }, [searchParams])

  const filtered = useMemo(() => {
    let r = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === active)
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    }
    return r
  }, [active, search])

  useEffect(() => {
    gsap.fromTo('.cat-card', { opacity: 0, y: 22 },
      { opacity: 1, y: 0, stagger: 0.055, duration: 0.5, ease: 'power2.out' })
  }, [filtered])

  const setFilter = val => {
    setActive(val)
    setSearchParams(val === 'all' ? {} : { cat: val })
  }

  return (
    <div style={{ background: '#FDFBF7', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div className="pt-28 pb-10 px-6 md:px-16 lg:px-24"
        style={{ borderBottom: '1px solid #E4D5C8' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="ornament mb-4" style={{ justifyContent: 'flex-start' }}>Our Store</div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-charcoal">
              All <em className="not-italic gradient-text">Collections</em>
            </h1>
            <p className="text-sm mt-2 font-light" style={{ color: '#6B5548' }}>
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'} available
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
              style={{ color: '#C9906A' }}>🔍</span>
            <input
              type="text" placeholder="Search products..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-full text-sm font-light"
              style={{ background: '#fff', border: '1.5px solid #E4D5C8', color: '#1C1412',
                width: '220px', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#C9906A'}
              onBlur={e => e.target.style.borderColor = '#E4D5C8'}
            />
          </div>
        </div>
      </div>

      {/* ── Sticky Filter Pills ── */}
      <div className="sticky z-30 px-6 md:px-16 lg:px-24 py-4"
        style={{ top: 65, background: 'rgba(253,251,247,0.96)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E4D5C8' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c.value} id={`filter-${c.value}`}
              onClick={() => setFilter(c.value)}
              className={`filter-pill${active === c.value ? ' active' : ''}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="px-6 md:px-16 lg:px-24 py-12">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-charcoal mb-2">No products found</p>
              <p className="text-sm font-light" style={{ color: '#6B5548' }}>
                Try adjusting your search or filter
              </p>
              <button onClick={() => { setSearch(''); setFilter('all') }}
                className="btn-ghost mt-6 inline-block"
                style={{ padding: '0.6rem 1.5rem' }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(p => (
                <div key={p.id} className="cat-card">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
