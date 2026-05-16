import { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Store from '../store'

const CAT_META = {
  jewellery:{ label:'Jewellery',          desc:'Exquisite jewellery for every occasion' },
  bangles:  { label:'Bangles Collection', desc:'Handcrafted bangles from everyday to bridal luxury' },
  cosmetics:{ label:'Cosmetics',          desc:'Premium makeup & skincare for the modern woman' },
  perfumes: { label:'Perfumes',           desc:'Luxury fragrances that leave a lasting impression' },
  baby:     { label:'Baby Care',          desc:'Gentle and safe care products for your little one' },
  clothing: { label:'Clothing',           desc:'Comfortable and stylish innerwear collections' },
}

export default function Category() {
  const { cat }          = useParams()
  const [params]         = useSearchParams()
  const [activeSub, setSub] = useState(params.get('sub') || '')
  const [products, setProducts] = useState([])
  const meta = CAT_META[cat] || { label: cat, desc: '' }

  useEffect(() => {
    setProducts([]) // reset on category change
    Store.getByCategory(cat).then(setProducts)
  }, [cat])

  const subcats  = useMemo(() => [...new Set(products.map(p=>p.subcategory).filter(Boolean))], [products])
  const filtered = useMemo(() => activeSub ? products.filter(p=>p.subcategory===activeSub) : products, [products, activeSub])

  return (
    <div className="pt-28 min-h-screen bg-white">
      <div className="bg-swa-gray px-4 lg:px-16 py-16 text-center text-swa-dark">
        <h1 className="font-display uppercase tracking-[.1em] text-[clamp(28px,5vw,48px)] mb-4">{meta.label}</h1>
        <p className="text-[10px] uppercase tracking-widest opacity-70">{meta.desc}</p>
      </div>
      <div className="text-[10px] uppercase tracking-widest text-gray px-4 lg:px-16 py-3 max-w-7xl mx-auto border-b border-gray-100 mb-6">
        <Link to="/" className="text-swa-text hover:text-swa-dark transition-colors">Home</Link> › <Link to="/products" className="text-swa-text hover:text-swa-dark transition-colors">All Products</Link> › <span className="text-swa-dark font-bold">{meta.label}</span>
      </div>
      {subcats.length > 0 && (
        <div className="flex flex-wrap gap-3 px-4 lg:px-16 pb-6 border-b border-gray-200 max-w-7xl mx-auto">
          <button onClick={() => setSub('')} className={`border px-5 py-2 text-[10px] uppercase tracking-[.15em] font-bold transition-colors ${!activeSub ? 'bg-swa-dark text-white border-swa-dark' : 'border-gray-200 text-gray hover:border-swa-dark hover:text-swa-dark'}`}>All</button>
          {subcats.map(s => (
            <button key={s} onClick={() => setSub(s)} className={`border px-5 py-2 text-[10px] uppercase tracking-[.15em] font-bold transition-colors ${activeSub===s ? 'bg-swa-dark text-white border-swa-dark' : 'border-gray-200 text-gray hover:border-swa-dark hover:text-swa-dark'}`}>
              {s.replace(/-/g,' ')}
            </button>
          ))}
        </div>
      )}
      <div className="px-4 lg:px-16 py-8 max-w-7xl mx-auto">
        {filtered.length ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {filtered.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        ) : (
          <div className="text-center py-32 text-gray">
            <p className="text-[11px] uppercase tracking-widest font-bold mb-4 text-swa-dark">No products in {meta.label} yet — check back soon!</p>
            <Link to="/products" className="text-[10px] uppercase tracking-widest font-bold text-swa-dark border-b border-swa-dark">Browse all products</Link>
          </div>
        )}
      </div>
    </div>
  )
}
