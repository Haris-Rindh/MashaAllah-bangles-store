import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fmt, discount } from '../store'
import Store from '../store'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

function Toast({ msg }) {
  return <div className="fixed bottom-6 right-6 bg-swa-dark text-white px-5 py-3.5 text-xs tracking-widest font-bold z-[9999] shadow-2xl">{msg}</div>
}

export default function Product() {
  const { id }   = useParams()
  const product  = Store.getProductById(id)
  const { addToCart, toggleWish, wishlist } = useCart()
  const navigate = useNavigate()
  const [qty,      setQty]   = useState(1)
  const [imgIdx,   setImg]   = useState(0)
  const [toast,    setToast] = useState('')

  if (!product) return (
    <div className="pt-44 text-center py-20 text-swa-dark">
      <h2 className="font-display text-4xl mb-4 uppercase tracking-widest">Product Not Found</h2>
      <Link to="/products" className="text-gray underline text-[10px] tracking-widest uppercase">Browse Products</Link>
    </div>
  )

  const imgs = product.images?.length > 0 
    ? product.images 
    : [product.image, product.image2 || product.image];
  const wished  = wishlist.includes(product.id)
  const related = Store.getByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2500) }

  return (
    <div className="pt-28 min-h-screen bg-white">
      {toast && <Toast msg={toast}/>}
      <div className="text-[10px] tracking-widest uppercase text-gray px-4 lg:px-16 py-3 max-w-7xl mx-auto border-b border-gray-100 mb-8">
        <Link to="/" className="text-swa-text hover:text-swa-dark transition-colors">Home</Link> › <Link to="/products" className="text-swa-text hover:text-swa-dark transition-colors">Products</Link> › <span className="text-swa-dark font-bold">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-16 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="bg-swa-gray/30 aspect-[3/4] overflow-hidden mb-4 cursor-zoom-in">
            <img src={`/${imgs[imgIdx]}`} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"/>
          </div>
          <div className="flex gap-3 flex-wrap mt-4">
            {imgs.map((img, i) => (
              <button key={i} onClick={() => setImg(i)} className={`w-20 h-24 overflow-hidden border transition-colors ${imgIdx===i ? 'border-swa-dark' : 'border-transparent hover:border-gray-300'}`}>
                <img src={`/${img}`} alt={`view ${i+1}`} className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} className="flex flex-col pt-4">
          {product.badge && <span className="inline-block bg-swa-dark text-white text-[9px] px-3 py-1 tracking-[.2em] font-bold uppercase mb-4 self-start">{product.badge}</span>}
          <h1 className="font-display uppercase text-swa-dark text-[clamp(28px,4vw,48px)] leading-[1.1] mb-4">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl font-body text-swa-dark">{fmt(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-sm font-body text-gray/50 line-through">{fmt(product.originalPrice)}</span>
                <span className="text-[10px] font-bold bg-swa-yellow text-swa-dark px-2 py-0.5 uppercase tracking-widest">{discount(product.originalPrice, product.price)}</span>
              </>
            )}
          </div>
          <p className="text-sm leading-relaxed text-gray mb-8 pb-8 border-b border-gray-200">{product.description}</p>

          {/* Qty */}
          <div className="flex items-center gap-6 mb-8">
            <span className="text-[10px] uppercase tracking-[.2em] text-swa-dark font-bold">Quantity</span>
            <div className="flex items-center border border-gray-300">
              <button onClick={() => setQty(q => Math.max(1,q-1))} className="w-12 h-12 text-swa-dark text-lg hover:bg-swa-gray transition-colors">−</button>
              <span className="w-12 text-center text-sm font-medium text-swa-dark">{qty}</span>
              <button onClick={() => setQty(q => q+1)} className="w-12 h-12 text-swa-dark text-lg hover:bg-swa-gray transition-colors">+</button>
            </div>
          </div>

          <button onClick={() => { addToCart(product.id, qty); showToast(`✓ ${product.name} added to bag`) }}
            className="w-full bg-swa-dark text-white py-4.5 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-black/80 transition-colors mb-3">
            Add to Bag
          </button>
          <button onClick={() => toggleWish(product.id)}
            className={`w-full border py-4 text-[10px] font-bold tracking-[.2em] uppercase transition-colors ${wished ? 'border-swa-dark bg-swa-gray text-swa-dark' : 'border-gray-300 text-swa-dark hover:border-swa-dark'}`}>
            {wished ? '♥ Wishlisted' : '♡ Add to Wishlist'}
          </button>

          <ul className="mt-8 pt-8 border-t border-gray-200 space-y-3">
            {['Free delivery on orders over PKR 2,000','Cash on Delivery (COD) available','Easy returns within 7 days','Authentic & quality guaranteed'].map(f => (
              <li key={f} className="flex items-center gap-3 text-[11px] uppercase tracking-[.05em] text-swa-dark"><span className="text-swa-dark font-bold text-sm">✓</span>{f}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto px-4 lg:px-16 pb-20">
          <h2 className="font-display uppercase text-swa-dark text-[clamp(28px,4vw,36px)] tracking-[.1em] mb-10 text-center">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        </motion.div>
      )}
    </div>
  )
}
