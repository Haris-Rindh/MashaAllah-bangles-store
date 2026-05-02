import { useState } from 'react'
import { Edit2, Trash2, Search, Plus, Eye, Package } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllProducts, deleteProduct } from './adminStore'
import { PRODUCTS } from '../../data/products'

export default function ProductList() {
  const navigate = useNavigate()
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [products, setProducts] = useState(() => getAllProducts())

  const reload = () => setProducts(getAllProducts())

  const handleDelete = (id) => {
    // Only admin-added products (prefixed with "admin_") can be deleted
    if (!id.toString().startsWith('admin_')) {
      alert('Static catalog products cannot be deleted from here.\nEdit src/data/products.js directly.')
      return
    }
    if (!window.confirm('Delete this product?')) return
    deleteProduct(id)
    reload()
  }

  const filtered = products.filter(p => {
    const matchCat = category === 'All' || p.category?.toLowerCase() === category.toLowerCase()
    const matchQ   = !search || p.name?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchQ
  })

  const isStatic = (p) => !p._id?.toString().startsWith('admin_')

  return (
    <div className="p-6 md:p-10 text-[#5C4D43] max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#3A3029] tracking-tight">Product Inventory</h1>
          <p className="text-[#8B7355] mt-1 text-sm">
            {filtered.length} products · {products.filter(p => !isStatic(p)).length} added via admin
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/add-product')}
          className="bg-[#C9906A] text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-[#b87d55] transition-all flex items-center gap-2 font-medium">
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Card */}
      <div className="bg-[#FDFBF7] rounded-2xl shadow-sm border border-[#E5D7CA]/60 overflow-hidden">

        {/* Filter Bar */}
        <div className="p-5 border-b border-[#E5D7CA]/50 flex flex-col md:flex-row gap-3 bg-white/40">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BFAEA3]" />
            <input type="text" placeholder="Search products..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5D7CA] focus:outline-none focus:ring-2 focus:ring-[#C9906A]/40 focus:border-[#C9906A] bg-white text-[#5C4D43] placeholder-[#BFAEA3] text-sm" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[#E5D7CA] focus:outline-none focus:ring-2 focus:ring-[#C9906A]/40 focus:border-[#C9906A] bg-white text-[#5C4D43] text-sm cursor-pointer">
            {['All','Bangles','Cosmetics','Perfumes','Jewellery'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#E5D7CA]/50 bg-[#F5EDE0]/40 text-[#8B7355] text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Source</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5D7CA]/30">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <Package className="w-10 h-10 mx-auto mb-3 text-[#E5D7CA]" />
                    <p className="text-[#8B7355] font-medium">No products found</p>
                  </td>
                </tr>
              ) : filtered.map((product) => (
                <tr key={product._id || product.id} className="hover:bg-[#F5EDE0]/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#E5D7CA] bg-[#F5EDE0] shrink-0 flex items-center justify-center">
                        {product.images?.[0]
                          ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          : <span className="text-xl">💍</span>}
                      </div>
                      <div>
                        <p className="font-medium text-[#3A3029] line-clamp-1">{product.name}</p>
                        <p className="text-xs text-[#BFAEA3] mt-0.5 font-mono">{product._id || product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#F5EDE0] text-[#8B7355] border border-[#E5D7CA]/50">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#5C4D43]">
                        Rs. {(product.discountPrice || product.price || product.regularPrice || 0).toLocaleString()}
                      </span>
                      {product.discountPrice && product.regularPrice && (
                        <span className="text-xs text-[#BFAEA3] line-through">Rs. {product.regularPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      isStatic(product)
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}>
                      {isStatic(product) ? 'Catalog' : 'Admin Added'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/product/${product.id || product._id}`}
                        className="p-2 text-[#8B7355] hover:text-[#3A3029] hover:bg-[#F5EDE0] rounded-lg transition-all" title="View in store">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id || product.id)}
                        className="p-2 text-[#8B7355] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5D7CA]/50 text-sm text-[#8B7355] bg-[#F5EDE0]/20 flex justify-between items-center">
          <span>Showing <strong className="text-[#5C4D43]">{filtered.length}</strong> of <strong className="text-[#5C4D43]">{products.length}</strong> products</span>
          <span className="text-xs text-[#BFAEA3]">Data stored locally · no backend required</span>
        </div>
      </div>
    </div>
  )
}
