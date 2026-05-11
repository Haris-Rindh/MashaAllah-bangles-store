import { useState, useMemo, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Store from '../store'

export default function Search() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q') || ''
  const [search, setSearch] = useState(query)
  const [val, setVal] = useState(query)

  const products = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return Store.getProducts().filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q))
    )
  }, [search])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [search])

  return (
    <div className="pt-28 min-h-screen bg-white text-swa-dark">
      <div className="px-4 lg:px-16 py-10 lg:py-16 text-center bg-swa-gray border-b border-gray-200">
        <h1 className="font-display uppercase tracking-[.1em] text-[clamp(28px,5vw,48px)] mb-6">Search</h1>
        <form onSubmit={e => { e.preventDefault(); setSearch(val) }} className="max-w-xl mx-auto flex items-center border-b border-swa-dark pb-2">
          <input 
            autoFocus
            value={val} 
            onChange={e => setVal(e.target.value)}
            placeholder="WHAT ARE YOU LOOKING FOR?"
            className="flex-1 bg-transparent border-none outline-none text-xs tracking-widest uppercase font-bold text-swa-dark placeholder:text-swa-dark/40"
          />
          <button type="submit" className="text-swa-dark hover:opacity-60 transition-opacity p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-16">
        {search.trim() && (
          <p className="text-[10px] tracking-widest uppercase font-bold mb-10 text-center text-gray">
            {products.length} {products.length === 1 ? 'Result' : 'Results'} for "{search}"
          </p>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            {products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <ProductCard product={p}/>
              </motion.div>
            ))}
          </div>
        ) : search.trim() ? (
          <div className="text-center py-20">
            <p className="text-sm tracking-widest uppercase text-gray mb-6">No products found matching your search.</p>
            <Link to="/products" className="inline-block border border-swa-dark px-10 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-swa-dark hover:text-white transition-colors">Browse All Products</Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
