import { useState, useEffect } from 'react'
import Store, { uploadToCloudinary, CLOUDINARY_CLOUD } from '../store'

const EMPTY = { name:'', category:'bangles', subcategory:'', price:'', originalPrice:'', images:['',''], description:'', badge:'', inStock:true, featured:false }

export default function AdminProducts() {
  const [cats, setCats]         = useState([])
  const [products, setP]        = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [q, setQ]               = useState('')
  const [cat, setCat]           = useState('')
  const [modal, setModal]       = useState(false)
  const [form, setForm]         = useState(EMPTY)
  const [editId, setId]         = useState(null)
  const [uploadProgress, setUploadProgress] = useState({})

  // Load categories once
  useEffect(() => {
    Store.getCategories().then(setCats)
  }, [])

  // Real-time product listener
  useEffect(() => {
    const unsub = Store.onProductsSnapshot(prods => {
      setP(prods)
      Store.cacheProducts(prods)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const CATS = cats.map(c => c.slug)
  const SUBCATS_MAP = cats.reduce((acc, c) => { acc[c.slug] = c.subcats; return acc }, {})
  const currentSubcats = SUBCATS_MAP[form.category] || []

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function openAdd()  { setForm({ ...EMPTY, images: ['', ''] }); setId(null); setModal(true) }
  function openEdit(p) {
    const imgs = p.images ? [...p.images] : [p.image || '', p.image2 || '']
    setForm({ ...p, images: imgs })
    setId(p.id)
    setModal(true)
  }

  async function handleImageUpload(e, index) {
    const file = e.target.files[0]
    if (!file) return
    const valid = ['image/jpeg', 'image/png', 'image/webp']
    if (!valid.includes(file.type)) { alert('Only .jpg, .png, .webp allowed.'); return }

    setUploadProgress(prev => ({ ...prev, [index]: 'uploading' }))
    try {
      const url = await uploadToCloudinary(file)
      updateImage(index, url)
      setUploadProgress(prev => ({ ...prev, [index]: 'done' }))
    } catch (err) {
      alert('Image upload failed. Please check your Cloudinary preset is set to "unsigned".')
      setUploadProgress(prev => ({ ...prev, [index]: 'error' }))
    }
  }

  function addImageField() {
    if (form.images.length >= 6) return
    setForm(f => ({ ...f, images: [...f.images, ''] }))
  }

  function updateImage(index, val) {
    setForm(f => {
      const imgs = [...f.images]; imgs[index] = val
      return { ...f, images: imgs }
    })
  }

  function removeImage(index) {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }))
  }

  function handleCategoryChange(e) {
    setForm(f => ({ ...f, category: e.target.value, subcategory: '' }))
  }

  async function save() {
    if (!form.name || !form.price) { alert('Name and price required'); return }
    setSaving(true)
    try {
      const data = {
        ...form,
        price: +form.price,
        originalPrice: +form.originalPrice || 0,
        images: form.images.filter(i => i.trim() !== '')
      }
      data.image  = data.images[0] || ''
      data.image2 = data.images[1] || ''

      if (editId) await Store.updateProduct(editId, data)
      else await Store.addProduct(data)
      setModal(false)
    } catch (err) {
      alert('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function del() {
    if (!confirm('Delete this product?')) return
    setSaving(true)
    try {
      await Store.deleteProduct(editId)
      setModal(false)
    } catch (err) {
      alert('Delete failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function quickDelete(pid) {
    if (!confirm('Delete?')) return
    await Store.deleteProduct(pid)
  }

  const filtered = products.filter(p => {
    if (cat && p.category !== cat) return false
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  const inp = 'bg-white border border-gray-300 text-swa-dark px-3 py-2 text-[12px] w-full outline-none focus:border-swa-dark rounded-none'

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-display uppercase tracking-widest text-swa-dark font-bold">
          Products ({filtered.length})
          {loading && <span className="ml-3 text-[10px] text-gray animate-pulse">Loading from cloud...</span>}
        </h2>
        <button onClick={openAdd} className="bg-swa-dark text-white px-4 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors">+ Add Product</button>
      </div>
      <div className="flex gap-3 mb-5">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="SEARCH PRODUCTS..." className={`${inp} flex-1 max-w-xs`}/>
        <select value={cat} onChange={e => setCat(e.target.value)} className={`${inp} w-44`}>
          <option value="">ALL CATEGORIES</option>
          {CATS.map(c => <option key={c} value={c} className="uppercase">{c}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead><tr className="text-left text-[10px] uppercase tracking-widest text-gray font-bold border-b border-gray-200 bg-swa-gray/30">
            <th className="px-4 py-3">Image</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Actions</th>
          </tr></thead>
          <tbody>
            {loading && <tr><td colSpan="6" className="text-center py-16 text-gray text-[11px] uppercase tracking-widest font-bold">Loading products from Firestore...</td></tr>}
            {!loading && filtered.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-swa-gray/30 transition-colors cursor-pointer" onClick={() => openEdit(p)}>
                <td className="px-4 py-3">
                  <img src={Store.img(p.image)} alt={p.name} className="w-10 h-14 object-cover bg-swa-gray"/>
                </td>
                <td className="px-4 py-3 text-[12px] text-swa-dark font-bold">
                  {p.name}
                  {p.badge && <span className="ml-2 text-[9px] bg-swa-gray text-swa-dark uppercase tracking-widest px-1.5 py-0.5">{p.badge}</span>}
                </td>
                <td className="px-4 py-3"><span className="text-[9px] uppercase tracking-widest font-bold bg-swa-gray text-swa-dark px-2 py-1">{p.category}</span></td>
                <td className="px-4 py-3 text-[12px] font-bold text-swa-dark">PKR {p.price.toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`text-[10px] uppercase tracking-widest font-bold ${p.inStock ? 'text-green-600' : 'text-red-500'}`}>{p.inStock ? 'In Stock' : 'Out'}</span></td>
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-[10px] uppercase tracking-widest font-bold bg-white border border-gray-200 px-3 py-1 hover:text-swa-dark text-gray transition-colors">Edit</button>
                    <button onClick={() => quickDelete(p.id)} className="text-[10px] uppercase tracking-widest font-bold bg-red-50 border border-red-200 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white transition-colors">Del</button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && !filtered.length && <tr><td colSpan="6" className="text-center py-10 text-gray text-[11px] uppercase tracking-widest font-bold">No products found.</td></tr>}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-none shadow-xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm uppercase tracking-widest font-bold text-swa-dark">{editId ? 'Edit' : 'Add'} Product</h3>
              <button onClick={() => setModal(false)} className="text-gray text-xl hover:text-swa-dark">✕</button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">Name *</label>
                <input className={inp} value={form.name} onChange={e => setF('name', e.target.value)} placeholder="PRODUCT NAME"/>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">Category</label>
                <select className={inp} value={form.category} onChange={handleCategoryChange}>
                  {CATS.map(c => <option key={c} value={c} className="uppercase">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">Subcategory</label>
                <select className={inp} value={form.subcategory} onChange={e => setF('subcategory', e.target.value)}>
                  <option value="">NONE</option>
                  {currentSubcats.map(c => <option key={c.slug} value={c.slug} className="uppercase">{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">Price (PKR) *</label>
                <input type="number" className={inp} value={form.price} onChange={e => setF('price', e.target.value)}/>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">Original Price</label>
                <input type="number" className={inp} value={form.originalPrice} onChange={e => setF('originalPrice', e.target.value)}/>
              </div>

              {/* Cloudinary Image Upload */}
              <div className="col-span-2 bg-swa-gray/30 p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray">Images ({form.images.length}/6) — Uploaded to Cloudinary</label>
                  {form.images.length < 6 && (
                    <button onClick={addImageField} className="text-[10px] uppercase tracking-widest font-bold text-swa-dark underline hover:text-black">+ Add Image</button>
                  )}
                </div>
                {form.images.map((imgVal, i) => (
                  <div key={i} className="flex gap-4 mb-3 items-center bg-white p-3 border border-gray-200 shadow-sm">
                    <div className="w-16 h-16 bg-swa-gray border border-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {imgVal ? (
                        <img src={Store.img(imgVal)} alt="preview" className="w-full h-full object-cover"/>
                      ) : uploadProgress[i] === 'uploading' ? (
                        <span className="text-[9px] font-bold text-gray animate-pulse">Uploading...</span>
                      ) : (
                        <span className="text-[9px] font-bold text-gray uppercase tracking-widest">No Img</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-2 items-center flex-wrap">
                        <label className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-colors whitespace-nowrap ${uploadProgress[i] === 'uploading' ? 'bg-gray-300 text-gray cursor-wait' : 'bg-swa-dark text-white hover:bg-black'}`}>
                          <input type="file" accept=".jpg,.png,.jpeg,.webp" className="hidden" disabled={uploadProgress[i] === 'uploading'} onChange={e => handleImageUpload(e, i)}/>
                          {uploadProgress[i] === 'uploading' ? 'Uploading...' : uploadProgress[i] === 'done' ? '✓ Uploaded' : 'Upload to Cloud'}
                        </label>
                        <input className={`${inp} flex-1 m-0 min-w-0`} value={imgVal} onChange={e => updateImage(i, e.target.value)} placeholder="Or paste Cloudinary / image URL"/>
                      </div>
                    </div>
                    {form.images.length > 1 && (
                      <button onClick={() => removeImage(i)} className="px-3 bg-red-100 text-red-500 border border-red-200 hover:bg-red-500 hover:text-white transition-colors h-[38px]">✕</button>
                    )}
                  </div>
                ))}
                <p className="text-[10px] text-gray uppercase tracking-widest font-bold mt-2">Images upload directly to Cloudinary — visible to all customers instantly.</p>
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">Description</label>
                <textarea className={`${inp} min-h-[70px]`} value={form.description} onChange={e => setF('description', e.target.value)}/>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">Badge</label>
                <input className={inp} value={form.badge} onChange={e => setF('badge', e.target.value)} placeholder="NEW / SALE..."/>
              </div>
              <div className="flex gap-5 items-center pt-4">
                <label className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-swa-dark cursor-pointer">
                  <input type="checkbox" checked={form.inStock} onChange={e => setF('inStock', e.target.checked)} className="accent-swa-dark"/> In Stock
                </label>
                <label className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-swa-dark cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setF('featured', e.target.checked)} className="accent-swa-dark"/> Featured
                </label>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6 mt-4">
              <button onClick={save} disabled={saving} className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold transition-colors text-white ${saving ? 'bg-gray-400 cursor-wait' : 'bg-swa-dark hover:bg-black'}`}>
                {saving ? 'Saving...' : 'Save Product'}
              </button>
              <button onClick={() => setModal(false)} className="bg-white border border-gray-200 text-gray px-5 py-2 text-[10px] uppercase tracking-widest font-bold hover:text-swa-dark transition-colors">Cancel</button>
              {editId && <button onClick={del} disabled={saving} className="ml-auto bg-red-100 border border-red-200 text-red-500 px-5 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-colors">Delete</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
