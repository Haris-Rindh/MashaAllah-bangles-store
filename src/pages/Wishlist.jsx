import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Store from '../store'

export default function Wishlist() {
  const { wishlist } = useCart()
  const products = Store.getProducts().filter(p => wishlist.includes(p.id))

  return (
    <div className="pt-28 min-h-screen bg-white">
      <div className="bg-swa-gray px-4 lg:px-16 py-16 text-center">
        <h1 className="font-display uppercase tracking-[.15em] text-swa-dark text-[clamp(28px,5vw,48px)] mb-4">My Wishlist</h1>
        <p className="text-[10px] uppercase tracking-[.2em] text-gray font-bold">{products.length} {products.length === 1 ? 'item' : 'items'} saved</p>
      </div>
      
      <div className="px-4 lg:px-16 py-10 max-w-7xl mx-auto">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        ) : (
          <div className="text-center py-32 text-swa-dark flex flex-col items-center justify-center">
            <p className="text-[12px] uppercase tracking-widest font-bold mb-4">Your wishlist is empty</p>
            <p className="text-xs mb-8 max-w-sm opacity-70">Save your favorite items here to easily find them later.</p>
            <Link to="/products" className="bg-swa-dark text-white px-10 py-4 text-[10px] tracking-[.2em] uppercase hover:bg-black/80 transition-colors font-bold">Explore Collection</Link>
          </div>
        )}
      </div>
    </div>
  )
}
