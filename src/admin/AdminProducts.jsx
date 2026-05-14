import { useState } from 'react'
import Store from '../store'

const SUBCATS = ['jewellery','bangles','cosmetics','perfumes','baby','clothing']
const CATS = ['jewellery','bangles','cosmetics','perfumes','baby','clothing']
const EMPTY = { name:'',category:'bangles',subcategory:'',price:'',originalPrice:'',image:'',image2:'',description:'',badge:'',inStock:true,featured:false }

export default function AdminProducts() {
  const [products, setP]  = useState(Store.getProducts())
  const [q, setQ]         = useState('')
  const [cat, setCat]     = useState('')
  const [modal, setModal] = useState(false)
  const [form, setForm]   = useState(EMPTY)
  const [editId, setId]   = useState(null)

  const refresh = () => setP(Store.getProducts())
  const setF = (k,v) => setForm(f=>({...f,[k]:v}))

  function openAdd()    { setForm(EMPTY); setId(null); setModal(true) }
  function openEdit(p)  { setForm({...p}); setId(p.id); setModal(true) }
  function save() {
    if (!form.name||!form.price) { alert('Name and price required'); return }
    const data = { ...form, price:+form.price, originalPrice:+form.originalPrice||0 }
    if (editId) Store.updateProduct(editId, data); else Store.addProduct(data)
    refresh(); setModal(false)
  }
  function del() { if (!confirm('Delete?')) return; Store.deleteProduct(editId); refresh(); setModal(false) }

  const filtered = products.filter(p => {
    if (cat && p.category!==cat) return false
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  const inp = 'bg-[#0f0a0d] border border-[#3a2535] text-[#d4c0ca] px-3 py-2 text-sm w-full outline-none focus:border-[#C47A92] rounded-sm'

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 pb-4 border-b border-[#3a2535]">
        <h2 className="text-lg font-semibold text-[#d4c0ca]">Products ({filtered.length})</h2>
        <button onClick={openAdd} className="bg-[#C47A92] text-white px-4 py-2 text-sm hover:bg-[#7A3B52] transition-colors">+ Add Product</button>
      </div>
      <div className="flex gap-3 mb-5">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." className={`${inp} flex-1 max-w-xs`}/>
        <select value={cat} onChange={e=>setCat(e.target.value)} className={`${inp} w-44`}>
          <option value="">All Categories</option>
          {CATS.map(c=><option key={c} value={c} className="capitalize">{c}</option>)}
        </select>
      </div>

      <div className="bg-[#231a20] border border-[#3a2535] rounded overflow-x-auto">
        <table className="w-full">
          <thead><tr className="text-left text-[11px] uppercase tracking-[.1em] text-[#8a6878] border-b border-[#3a2535]">
            <th className="px-4 py-3">Image</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Actions</th>
          </tr></thead>
          <tbody>{filtered.map(p=>(
            <tr key={p.id} className="border-b border-[#3a2535]/50 hover:bg-white/5 cursor-pointer" onClick={()=>openEdit(p)}>
              <td className="px-4 py-3"><img src={`/${p.image}`} alt={p.name} className="w-10 h-14 object-cover bg-[#3a2535]"/></td>
              <td className="px-4 py-3 text-[13px] text-[#d4c0ca] font-medium">{p.name}{p.badge&&<span className="ml-2 text-[10px] bg-[#C47A92]/20 text-[#C47A92] px-1.5 py-0.5 rounded">{p.badge}</span>}</td>
              <td className="px-4 py-3"><span className="text-[11px] bg-[#C47A92]/20 text-[#C47A92] px-2 py-0.5 rounded capitalize">{p.category}</span></td>
              <td className="px-4 py-3 text-[13px]">PKR {p.price.toLocaleString()}</td>
              <td className="px-4 py-3"><span className={`text-[12px] ${p.inStock?'text-green-400':'text-red-400'}`}>{p.inStock?'In Stock':'Out'}</span></td>
              <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                <div className="flex gap-2">
                  <button onClick={()=>openEdit(p)} className="text-[12px] bg-white/5 border border-[#3a2535] px-3 py-1 hover:text-[#d4c0ca] text-[#8a6878] transition-colors">Edit</button>
                  <button onClick={()=>{setId(p.id);if(confirm('Delete?')){Store.deleteProduct(p.id);refresh()}}} className="text-[12px] bg-red-400/10 border border-red-400/30 text-red-400 px-3 py-1 hover:bg-red-400 hover:text-white transition-colors">Del</button>
                </div>
              </td>
            </tr>
          ))}{!filtered.length&&<tr><td colSpan="6" className="text-center py-10 text-[#8a6878] text-sm">No products found.</td></tr>}</tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#231a20] border border-[#3a2535] w-full max-w-xl max-h-[90vh] overflow-y-auto rounded">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#3a2535]">
              <h3 className="text-base font-semibold text-[#d4c0ca]">{editId?'Edit':'Add'} Product</h3>
              <button onClick={()=>setModal(false)} className="text-[#8a6878] text-xl hover:text-[#d4c0ca]">✕</button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-2"><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Name *</label><input className={inp} value={form.name} onChange={e=>setF('name',e.target.value)} placeholder="Product name"/></div>
              <div><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Category</label><select className={inp} value={form.category} onChange={e=>setF('category',e.target.value)}>{CATS.map(c=><option key={c} value={c} className="capitalize">{c}</option>)}</select></div>
              <div><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">CSubcategory</label><select className={inp} value={form.category} onChange={e=>setF('category',e.target.value)}>{SUBCATS.map(c=><option key={c} value={c} className="capitalize">{c}</option>)}</select></div>
              <div><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Price (PKR) *</label><input type="number" className={inp} value={form.price} onChange={e=>setF('price',e.target.value)}/></div>
              <div><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Original Price</label><input type="number" className={inp} value={form.originalPrice} onChange={e=>setF('originalPrice',e.target.value)}/></div>
              <div className="col-span-2"><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Main Image</label><input className={inp} value={form.image} onChange={e=>setF('image',e.target.value)} placeholder="images (1).jpeg"/></div>
              <div className="col-span-2"><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Hover Image</label><input className={inp} value={form.image2} onChange={e=>setF('image2',e.target.value)} placeholder="images (2).jpeg"/></div>
              <div className="col-span-2"><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Description</label><textarea className={`${inp} min-h-[70px]`} value={form.description} onChange={e=>setF('description',e.target.value)}/></div>
              <div><label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Badge</label><input className={inp} value={form.badge} onChange={e=>setF('badge',e.target.value)} placeholder="New / Sale..."/></div>
              <div className="flex gap-5 items-center pt-4">
                <label className="flex items-center gap-2 text-sm text-[#d4c0ca] cursor-pointer"><input type="checkbox" checked={form.inStock} onChange={e=>setF('inStock',e.target.checked)} className="accent-[#C47A92]"/> In Stock</label>
                <label className="flex items-center gap-2 text-sm text-[#d4c0ca] cursor-pointer"><input type="checkbox" checked={form.featured} onChange={e=>setF('featured',e.target.checked)} className="accent-[#C47A92]"/> Featured</label>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={save} className="bg-[#C47A92] text-white px-5 py-2 text-sm hover:bg-[#7A3B52] transition-colors">Save</button>
              <button onClick={()=>setModal(false)} className="bg-white/5 border border-[#3a2535] text-[#8a6878] px-5 py-2 text-sm hover:text-[#d4c0ca] transition-colors">Cancel</button>
              {editId && <button onClick={del} className="ml-auto bg-red-400/10 border border-red-400/30 text-red-400 px-5 py-2 text-sm hover:bg-red-400 hover:text-white transition-colors">Delete</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
