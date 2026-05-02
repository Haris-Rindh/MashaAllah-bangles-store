import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link to={`/product/${product.id}`}
      className="product-card rounded-2xl overflow-hidden flex flex-col group"
      style={{ background: '#FFFFFF', border: '1px solid #E4D5C8', boxShadow: '0 1px 4px rgba(28,20,18,0.06)' }}>

      {/* Product image */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '72%', background: '#F5EDE0' }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category tag */}
        <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(253,251,247,0.9)', color: '#C9906A', border: '1px solid rgba(201,144,106,0.3)' }}>
          {product.tag}
        </span>
        {/* Color dot */}
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full"
          style={{ background: product.color, boxShadow: `0 0 0 2px rgba(253,251,247,0.9)` }} />
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: '#C9906A' }}>
          {product.category}
        </p>
        <h3 className="font-display font-semibold text-sm text-charcoal leading-snug mb-1 flex-1">{product.name}</h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: '#6B5548' }}>{product.desc}</p>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #F0E8DF' }}>
          <div>
            <p className="text-[9px] tracking-wider uppercase" style={{ color: '#C4AEAB' }}>Price</p>
            <p className="font-display font-semibold text-sm" style={{ color: '#C9906A' }}>
              Rs. {product.price.toLocaleString()}
            </p>
          </div>
          <button id={`add-${product.id}`} onClick={handleAdd}
            className="text-xs font-medium tracking-wider uppercase px-3.5 py-2 rounded-full transition-all duration-250"
            style={{
              background: added ? '#C9906A' : 'transparent',
              color: added ? '#fff' : '#C9906A',
              border: `1.5px solid ${added ? '#C9906A' : '#E4D5C8'}`,
            }}>
            {added ? '✓ Added' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </Link>
  )
}
