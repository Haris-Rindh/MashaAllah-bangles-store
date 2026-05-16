import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Store from '../store'

export default function Products() {
  const highestPrice = useMemo(() => Math.max(5000, ...Store.getProducts().map(p => p.price)), [])
  const [cat,     setCat]     = useState('all')
  const [maxP,    setMaxP]    = useState(highestPrice)
  const [stock,   setStock]   = useState(false)
  const [sort,    setSort]    = useState('default')
  const [search,  setSearch]  = useState('')
  const [mobileFilter, setMobileFilter] = useState(false)

  const products = useMemo(() => {
    let p = Store.getProducts()
    if (cat !== 'all')  p = p.filter(x => x.category === cat)
    p = p.filter(x => x.price <= maxP)
    if (stock)        p = p.filter(x => x.inStock)
    if (search)       p = p.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    if (sort==='price-asc')  p.sort((a,b)=>a.price-b.price)
    if (sort==='price-desc') p.sort((a,b)=>b.price-a.price)
    if (sort==='name')       p.sort((a,b)=>a.name.localeCompare(b.name))
    return p
  }, [cat, maxP, stock, sort, search])

  const CAT_LIST = ['jewellery','bangles','cosmetics','perfumes','baby','clothing']

  return (
    <div className="pt-28 min-h-screen bg-white">
      <div className="bg-swa-gray px-4 lg:px-16 py-16 text-center text-swa-dark">
        <h1 className="font-display uppercase tracking-[.1em] text-[clamp(32px,5vw,56px)] mb-4">All Products</h1>
        <p className="text-xs tracking-widest uppercase opacity-70">Discover our complete collection of bangles, jewellery, cosmetics &amp; more</p>
      </div>
      <div className="flex gap-8 px-4 lg:px-16 py-10 max-w-7xl mx-auto">
        {/* Sidebar */}
        {mobileFilter && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileFilter(false)}/>}
        <aside className={`w-64 lg:w-56 flex-shrink-0 fixed inset-y-0 left-0 z-50 bg-white p-6 overflow-y-auto transform transition-transform duration-300 lg:relative lg:transform-none lg:p-0 lg:bg-transparent border-r lg:border-0 border-gray-200 ${mobileFilter ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8 lg:mb-5">
            <h3 className="font-display uppercase tracking-[.15em] text-swa-dark text-xl">Filter</h3>
            <button onClick={() => setMobileFilter(false)} className="lg:hidden text-swa-dark text-xl">✕</button>
          </div>
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h4 className="text-[10px] uppercase tracking-[.2em] text-swa-dark font-bold mb-4">Category</h4>
            <label className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-swa-dark cursor-pointer mb-3">
              <input type="radio" name="category" checked={cat === 'all'} onChange={() => setCat('all')} className="accent-swa-dark w-3 h-3"/>
              All
            </label>
            {CAT_LIST.map(c => (
              <label key={c} className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-swa-dark cursor-pointer mb-3">
                <input type="radio" name="category" checked={cat === c} onChange={() => setCat(c)} className="accent-swa-dark w-3 h-3"/>
                {c}
              </label>
            ))}
          </div>
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h4 className="text-[10px] uppercase tracking-[.2em] text-swa-dark font-bold mb-4">Price Range</h4>
            <input type="range" min="0" max={highestPrice} step="100" value={maxP} onChange={e=>setMaxP(+e.target.value)} className="w-full accent-swa-dark"/>
            <p className="text-[10px] uppercase tracking-wider text-gray mt-2">Up to PKR {maxP.toLocaleString()}</p>
          </div>
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h4 className="text-[10px] uppercase tracking-[.2em] text-swa-dark font-bold mb-4">Availability</h4>
            <label className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-swa-dark cursor-pointer">
              <input type="checkbox" checked={stock} onChange={e=>setStock(e.target.checked)} className="accent-swa-dark w-3 h-3"/> In Stock Only
            </label>
          </div>
          <button onClick={()=>{setCat('all');setMaxP(highestPrice);setStock(false);setSort('default');setSearch('');setMobileFilter(false)}}
            className="w-full bg-swa-dark text-white py-3.5 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-black/80 transition-colors">Reset Filters</button>
          
          {mobileFilter && <button onClick={() => setMobileFilter(false)} className="w-full mt-3 border border-swa-dark text-swa-dark py-3.5 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-swa-gray lg:hidden transition-colors">View Results</button>}
        </aside>
        {/* Grid */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
            <div className="flex items-center gap-3 flex-1 w-full">
              <button onClick={() => setMobileFilter(true)} className="lg:hidden border border-swa-dark text-swa-dark px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold flex-shrink-0">Filter</button>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="SEARCH PRODUCTS..." className="border border-gray-200 px-4 py-2.5 text-[10px] tracking-widest uppercase font-body text-swa-dark outline-none focus:border-swa-dark flex-1 max-w-xs bg-transparent"/>
              <span className="text-[10px] tracking-widest uppercase text-gray hidden sm:inline ml-4">{products.length} Products</span>
            </div>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="border border-gray-200 px-4 py-2.5 text-[10px] tracking-widest uppercase font-body text-swa-dark bg-transparent outline-none focus:border-swa-dark">
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
          {products.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {products.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          ) : (
            <div className="text-center py-32 text-gray">
              <p className="text-sm uppercase tracking-widest mb-4">No products found.</p>
              <button onClick={()=>{setCat('all');setMaxP(highestPrice);setStock(false);setSort('default');setSearch('');}} className="text-swa-dark border-b border-swa-dark text-[10px] uppercase tracking-widest font-bold">Clear filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
