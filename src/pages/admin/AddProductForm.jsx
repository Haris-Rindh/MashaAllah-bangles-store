import { useState } from 'react'
import { UploadCloud, X, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../../store/productStore'

const CATEGORIES = ['Bangles', 'Cosmetics', 'Perfumes', 'Jewellery', 'Pikoo Service']

/** Convert a File object to a base64 data URL (persists in localStorage) */
const toBase64 = file => new Promise(resolve => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.readAsDataURL(file)
})

export default function AddProductForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '', description: '', category: 'Bangles',
    regularPrice: '', discountPrice: '', tag: 'New',
  })
  const [previews,    setPreviews]    = useState([])   // object URLs for preview
  const [imageFiles,  setImageFiles]  = useState([])   // raw File objects
  const [saved,       setSaved]       = useState(false)
  const [loading,     setLoading]     = useState(false)

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleImages = e => {
    const files = Array.from(e.target.files)
    if (imageFiles.length + files.length > 5) return alert('Maximum 5 images.')
    setImageFiles(prev  => [...prev, ...files])
    setPreviews(prev    => [...prev, ...files.map(f => URL.createObjectURL(f))])
  }

  const removeImg = i => {
    setImageFiles(prev => prev.filter((_, idx) => idx !== i))
    setPreviews(prev   => prev.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (imageFiles.length === 0) return alert('Please add at least 1 image.')
    setLoading(true)

    // Convert to base64 so images persist after page refresh
    const base64Images = await Promise.all(imageFiles.map(toBase64))

    const reg  = Number(formData.regularPrice)
    const disc = formData.discountPrice ? Number(formData.discountPrice) : undefined

    addProduct({
      name:           formData.name,
      desc:           formData.description,
      longDesc:       formData.description,
      description:    formData.description,
      category:       formData.category.toLowerCase().replace(' service', ''),
      tag:            formData.tag,
      price:          disc || reg,
      regularPrice:   reg,
      discountPrice:  disc,
      discountPercent: disc ? Math.round(((reg - disc) / reg) * 100) : 0,
      color:          '#C9906A',
      images:         base64Images,
      specs:          {
        Category: formData.category,
        Price:    `Rs. ${reg.toLocaleString()}`,
        ...(disc ? { 'Sale Price': `Rs. ${disc.toLocaleString()}` } : {}),
      },
    })

    setSaved(true)
    setTimeout(() => navigate('/admin/products'), 1200)
  }

  return (
    <div className="p-6 md:p-10 text-[#5C4D43] max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate('/admin/products')}
          className="p-2 rounded-xl hover:bg-[#F5EDE0] transition-colors text-[#8B7355]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-serif text-[#3A3029] tracking-tight">Add New Product</h1>
          <p className="text-sm text-[#8B7355] mt-0.5">Fill in the details below to add a product to the store</p>
        </div>
      </div>

      {saved && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Product saved! Redirecting…</span>
        </div>
      )}

      <form onSubmit={handleSubmit}
        className="bg-[#FDFBF7] p-6 md:p-10 rounded-2xl shadow-sm border border-[#E5D7CA]/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB8C8]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9906A]/10 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Left: Details ── */}
          <div className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-[#8B7355] mb-1.5">Product Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} required
                placeholder="e.g. Bridal Kundan Set"
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#E5D7CA] focus:ring-2 focus:ring-[#C9906A]/40 focus:border-[#C9906A] focus:outline-none transition-all text-[#5C4D43] placeholder-[#BFAEA3]" />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#8B7355] mb-1.5">Category</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#E5D7CA] focus:ring-2 focus:ring-[#C9906A]/40 focus:border-[#C9906A] focus:outline-none transition-all text-[#5C4D43]">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Tag */}
            <div>
              <label className="block text-sm font-medium text-[#8B7355] mb-1.5">Tag / Label</label>
              <select name="tag" value={formData.tag} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#E5D7CA] focus:ring-2 focus:ring-[#C9906A]/40 focus:border-[#C9906A] focus:outline-none transition-all text-[#5C4D43]">
                {['New', 'Bestseller', 'Sale', 'Trending', 'Luxury', 'Festive', 'Daily', 'Bridal'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Regular Price (Rs.) *', name: 'regularPrice', required: true },
                { label: 'Sale Price (Rs.) — optional', name: 'discountPrice', required: false },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-[#8B7355] mb-1.5">{f.label}</label>
                  <input type="number" name={f.name} value={formData[f.name]} onChange={handleChange}
                    min="0" required={f.required} placeholder="0"
                    className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#E5D7CA] focus:ring-2 focus:ring-[#C9906A]/40 focus:border-[#C9906A] focus:outline-none transition-all text-[#5C4D43]" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#8B7355] mb-1.5">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                required rows={5} placeholder="Describe the product details…"
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#E5D7CA] focus:ring-2 focus:ring-[#C9906A]/40 focus:border-[#C9906A] focus:outline-none transition-all text-[#5C4D43] resize-none placeholder-[#BFAEA3]" />
            </div>
          </div>

          {/* ── Right: Images ── */}
          <div>
            <label className="block text-sm font-medium text-[#8B7355] mb-2">
              Product Images (up to 5)
              <span className="ml-1 text-xs text-[#BFAEA3]">— stored locally, no server needed</span>
            </label>
            <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-8 min-h-[200px] cursor-pointer transition-all
              ${previews.length >= 1 ? 'border-[#C9906A]/40 bg-[#C9906A]/5' : 'border-[#E5D7CA] hover:bg-[#F5EDE0]/40'}`}>
              <UploadCloud className={`w-10 h-10 transition-colors ${previews.length >= 1 ? 'text-[#C9906A]' : 'text-[#BFAEA3]'}`} />
              <p className="text-sm text-[#8B7355]">Click to browse images</p>
              <p className="text-xs text-[#BFAEA3]">JPG, PNG, WEBP · Max 2 MB each for best performance</p>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
            </label>

            {previews.length > 0 && (
              <div className="mt-5 grid grid-cols-3 gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden aspect-square border border-[#E5D7CA] bg-white shadow-sm">
                    <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {i === 0 && (
                      <div className="absolute bottom-1.5 left-1.5 bg-[#C9906A] text-white text-[9px] px-2 py-0.5 rounded-full font-semibold">Cover</div>
                    )}
                    <button type="button" onClick={() => removeImg(i)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                      <X className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                ))}
                {previews.length < 5 && (
                  <label className="rounded-xl border-2 border-dashed border-[#E5D7CA] aspect-square flex items-center justify-center cursor-pointer hover:bg-[#F5EDE0]/40 transition-colors">
                    <span className="text-2xl text-[#BFAEA3] font-light">+</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-10 pt-6 border-t border-[#E5D7CA]/60 flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin/products')}
            className="px-6 py-2.5 rounded-xl text-[#8B7355] hover:bg-[#F5EDE0] font-medium transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="px-8 py-2.5 rounded-xl bg-[#C9906A] text-white hover:bg-[#b87d55] font-medium shadow-md shadow-[#C9906A]/20 transition-all flex items-center gap-2 disabled:opacity-60">
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
              : <><CheckCircle className="w-4 h-4" /> Save Product</>}
          </button>
        </div>
      </form>
    </div>
  )
}
