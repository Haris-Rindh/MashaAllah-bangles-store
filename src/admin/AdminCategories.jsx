import { useState, useEffect } from 'react'
import Store from '../store'

export default function AdminCategories() {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editId, setEditId] = useState(null)
  
  const EMPTY = { id: '', slug: '', label: '', subcats: [] }
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    Store.getCategories().then(c => { setCats(c); setLoading(false) })
  }, [])

  function openAdd() {
    setForm({...EMPTY, id: 'cat' + Date.now()})
    setEditId(null)
    setModal(true)
  }

  function openEdit(c) {
    setForm(JSON.parse(JSON.stringify(c)))
    setEditId(c.id)
    setModal(true)
  }

  async function save() {
    if (!form.label || !form.slug) return alert("Label and slug are required")
    const updated = editId 
      ? cats.map(c => c.id === editId ? form : c)
      : [...cats, form]
    await Store.saveCategories(updated)
    Store.getCategories().then(c => { setCats(c) })
    setModal(false)
  }

  async function del(id) {
    if (!confirm("Delete this category?")) return
    const updated = cats.filter(c => c.id !== id)
    await Store.saveCategories(updated)
    Store.getCategories().then(c => { setCats(c) })
  }

  function addSub() {
    setForm(f => ({...f, subcats: [...f.subcats, { slug: '', label: '' }]}))
  }

  function updateSub(index, field, val) {
    setForm(f => {
      const newSubs = [...f.subcats]
      newSubs[index][field] = val
      return { ...f, subcats: newSubs }
    })
  }

  function removeSub(index) {
    setForm(f => ({...f, subcats: f.subcats.filter((_, i) => i !== index)}))
  }

  const inp = 'bg-white border border-gray-300 text-swa-dark px-3 py-2 text-sm w-full outline-none focus:border-swa-dark rounded-none'

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-display uppercase tracking-widest text-swa-dark font-bold">Category Management</h2>
        <button onClick={openAdd} className="bg-swa-dark text-white px-4 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors">+ Add Category</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cats.map(c => (
          <div key={c.id} className="bg-white border border-gray-200 shadow-sm p-5 flex flex-col">
            <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-swa-dark font-bold text-lg uppercase tracking-widest">{c.label}</h3>
                <span className="text-gray text-[10px] tracking-widest uppercase">/{c.slug}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="text-gray hover:text-swa-dark transition-colors text-[10px] uppercase tracking-widest font-bold border border-gray-200 px-2 py-1">Edit</button>
                <button onClick={() => del(c.id)} className="text-red-500 hover:text-white hover:bg-red-500 transition-colors text-[10px] uppercase tracking-widest font-bold border border-red-500 px-2 py-1">Del</button>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-[10px] uppercase tracking-widest text-gray font-bold mb-2">Subcategories ({c.subcats.length})</h4>
              <div className="flex flex-wrap gap-2">
                {c.subcats.map(s => (
                  <span key={s.slug} className="text-[10px] font-bold uppercase tracking-widest bg-swa-gray text-swa-dark px-2 py-1 border border-gray-200">{s.label}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-none shadow-xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm uppercase tracking-widest font-bold text-swa-dark">{editId ? 'Edit' : 'Add'} Category</h3>
              <button onClick={() => setModal(false)} className="text-gray text-xl hover:text-swa-dark">✕</button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">Display Label *</label>
                  <input className={inp} value={form.label} onChange={e => setForm({...form, label: e.target.value})} placeholder="e.g. Electronics"/>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray mb-1">URL Slug *</label>
                  <input className={inp} value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="e.g. electronics"/>
                </div>
              </div>

              <div className="bg-swa-gray/30 p-4 border border-gray-200 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray">Subcategories ({form.subcats.length})</label>
                  <button onClick={addSub} className="text-[10px] uppercase tracking-widest font-bold text-swa-dark underline hover:text-black">+ Add Subcategory</button>
                </div>
                
                {form.subcats.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2 items-center">
                    <input className={`${inp} flex-1`} value={s.label} onChange={e => updateSub(i, 'label', e.target.value)} placeholder="Label (e.g. Smartphones)"/>
                    <input className={`${inp} flex-1`} value={s.slug} onChange={e => updateSub(i, 'slug', e.target.value)} placeholder="Slug (e.g. smartphones)"/>
                    <button onClick={() => removeSub(i)} className="px-3 bg-red-100 text-red-500 border border-red-200 hover:bg-red-500 hover:text-white transition-colors h-[38px]">✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={save} className="bg-swa-dark text-white px-5 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors">Save Category</button>
              <button onClick={() => setModal(false)} className="bg-white border border-gray-200 text-gray px-5 py-2 text-[10px] uppercase tracking-widest font-bold hover:text-swa-dark transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
