import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = PRODUCTS.find(p => p.id === id)
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#FDFBF7' }}>
        <p className="font-display text-2xl text-charcoal mb-4">Product not found</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleOrder = () => {
    const msg = `*Order Enquiry*\n\nProduct: ${product.name}\nPrice: Rs.${product.price.toLocaleString()}\n\n📍 MashaAllah Bangles & Cosmetics\nMain Circular Road, She Shop Wali Gali, Shujabad`
    window.open(`https://wa.me/923017506498?text=${encodeURIComponent(msg)}`, '_blank')
  }

  // Related products (same category, exclude current)
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const catLabel = {
    bangles: 'Bangles', cosmetics: 'Cosmetics',
    perfumes: 'Perfumes', jewellery: 'Jewellery',
  }

  return (
    <div style={{ background: '#FDFBF7', minHeight: '100vh' }}>

      {/* ── Breadcrumb ── */}
      <div className="pt-24 pb-4 px-6 md:px-16 lg:px-24" style={{ borderBottom: '1px solid #E4D5C8' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs" style={{ color: '#6B5548' }}>
          <Link to="/" className="hover:text-rose-gold transition-colors" style={{ color: '#C9906A' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-rose-gold transition-colors"
            onMouseEnter={e => e.target.style.color='#C9906A'} onMouseLeave={e => e.target.style.color='#6B5548'}>
            Shop
          </Link>
          <span>/</span>
          <Link to={`/shop?cat=${product.category}`}
            onMouseEnter={e => e.target.style.color='#C9906A'} onMouseLeave={e => e.target.style.color='#6B5548'}>
            {catLabel[product.category]}
          </Link>
          <span>/</span>
          <span className="text-charcoal font-medium">{product.name}</span>
        </div>
      </div>

      {/* ── Main Product Layout ── */}
      <div className="px-6 md:px-16 lg:px-24 py-10 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Image Gallery ── */}
          <div>
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden mb-4"
              style={{ paddingBottom: '75%', background: '#F5EDE0', border: '1px solid #E4D5C8' }}>
              <img
                key={activeImg}
                src={product.images[activeImg]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ animation: 'fadeIn 0.35s ease' }}
              />
              {/* Tag overlay */}
              <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(253,251,247,0.92)', color: '#C9906A', border: '1px solid rgba(201,144,106,0.3)' }}>
                {product.tag}
              </span>
            </div>

            {/* Thumbnail row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`thumb flex-shrink-0${i === activeImg ? ' active' : ''}`}
                    style={{ width: '72px', height: '72px' }}>
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Details ── */}
          <div className="flex flex-col">
            {/* Category & Tag */}
            <div className="flex items-center gap-3 mb-4">
              <Link to={`/shop?cat=${product.category}`}
                className="text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full transition-colors"
                style={{ background: '#F5EDE0', color: '#C9906A', border: '1px solid #E4D5C8' }}>
                {catLabel[product.category]}
              </Link>
              <span className="text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ background: `${product.color}18`, color: product.color, border: `1px solid ${product.color}35` }}>
                {product.tag}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-charcoal leading-tight mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid #E4D5C8' }}>
              <span className="font-display text-3xl font-semibold" style={{ color: '#C9906A' }}>
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="text-xs font-light" style={{ color: '#6B5548' }}>incl. tax</span>
            </div>

            {/* Description */}
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#6B5548' }}>
              About this product
            </h3>
            <p className="text-sm leading-relaxed mb-8 font-light" style={{ color: '#6B5548' }}>
              {product.longDesc}
            </p>

            {/* Specifications */}
            <div className="rounded-2xl p-5 mb-8" style={{ background: '#F9F4EE', border: '1px solid #E4D5C8' }}>
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#6B5548' }}>
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-3">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <p className="text-[10px] tracking-wider uppercase mb-0.5" style={{ color: '#C4AEAB' }}>{key}</p>
                    <p className="text-sm font-medium text-charcoal">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button id={`detail-add-${product.id}`} onClick={handleAdd}
                className="flex-1 btn-primary text-center py-4"
                style={added ? { background: 'linear-gradient(135deg,#5CB85C,#3D9A3D)' } : {}}>
                {added ? '✓ Added to Bag!' : 'Add to Bag'}
              </button>
              <button id={`detail-order-${product.id}`} onClick={handleOrder}
                className="flex-1 btn-ghost py-4">
                Order via WhatsApp 📱
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6" style={{ borderTop: '1px solid #E4D5C8' }}>
              {['🚚 Fast Delivery', '✅ Authentic Products', '💬 WhatsApp Support'].map(b => (
                <span key={b} className="text-xs font-light" style={{ color: '#6B5548' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <div className="px-6 md:px-16 lg:px-24 py-14" style={{ borderTop: '1px solid #E4D5C8' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="ornament mb-3" style={{ justifyContent: 'flex-start' }}>You May Also Like</div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal">
                  More <em className="not-italic gradient-text">{catLabel[product.category]}</em>
                </h2>
              </div>
              <Link to={`/shop?cat=${product.category}`} className="btn-ghost hidden sm:block"
                style={{ padding: '0.55rem 1.3rem', fontSize: '0.72rem' }}>
                See All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      )}

      {/* Fade-in keyframe */}
      <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(1.015) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  )
}
