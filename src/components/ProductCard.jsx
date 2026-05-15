import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fmt, discount } from '../store'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="prod-card group flex flex-col h-full bg-white text-swa-dark">
      <div className="relative overflow-hidden prod-img-wrap mb-4">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img src={`/${product.image}`} alt={product.name} className="prod-img-main"/>
          {product.image2 && <img src={`/${product.image2}`} alt={product.name} className="prod-img-hover"/>}
          
          {/* Badges */}
          <div className="absolute top-2 lg:top-3 left-2 lg:left-3 flex flex-col gap-1 z-10">
            {product.badge && <span className="bg-swa-dark text-white text-[9px] px-2 py-0.5 tracking-[.2em] uppercase font-bold">{product.badge}</span>}
            {product.originalPrice > product.price && <span className="bg-swa-yellow text-swa-dark text-[9px] px-2 py-0.5 tracking-[.2em] uppercase font-bold">{discount(product.originalPrice, product.price)}</span>}
          </div>
        </Link>
        <button onClick={() => addToCart(product.id, 1)} className="prod-bag border-none cursor-pointer z-20">Add to Bag</button>
      </div>
      
      <div className="flex-1 flex flex-col text-center px-2 pb-2">
        <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed mb-2 line-clamp-2">
          <Link to={`/product/${product.id}`} className="hover:text-gray transition-colors">{product.name}</Link>
        </h3>
        <div className="mt-auto flex items-center justify-center gap-2">
          <span className="font-body text-xs lg:text-sm text-swa-dark">{fmt(product.price)}</span>
          {product.originalPrice > product.price && <span className="font-body text-[10px] lg:text-xs text-gray/50 line-through">{fmt(product.originalPrice)}</span>}
        </div>
      </div>
    </div>
  )
}
