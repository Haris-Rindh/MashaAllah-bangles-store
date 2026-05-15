import { useState } from 'react'
import Store from '../store'

export default function AdminCategories() {
  const [cats, setCats] = useState(Store.getCategories())
  const [modal, setModal] = useState(false)
  const [editId, setEditId] = useState(null)
  
  const EMPTY = { id: '', slug: '', label: '', subcats: [] }
  const [form, setForm] = useState(EMPTY)

  function refresh() {
    setCats(Store.getCategories())
  }

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

  function save() {
    if (!form.label || !form.slug) return alert("Label and slug are required")
    const updated = editId 
      ? cats.map(c => c.id === editId ? form : c)
      : [...cats, form]
    Store.saveCategories(updated)
    refresh()
    setModal(false)
  }

  function del(id) {
    if (!confirm("Delete this category?")) return
    Store.saveCategories(cats.filter(c => c.id !== id))
    refresh()
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

  const inp = 'bg-[#0f0a0d] border border-[#3a2535] text-[#d4c0ca] px-3 py-2 text-sm w-full outline-none focus:border-[#C47A92] rounded-sm'

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 pb-4 border-b border-[#3a2535]">
        <h2 className="text-lg font-semibold text-[#d4c0ca]">Category Management</h2>
        <button onClick={openAdd} className="bg-[#C47A92] text-white px-4 py-2 text-sm hover:bg-[#7A3B52] transition-colors">+ Add Category</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cats.map(c => (
          <div key={c.id} className="bg-[#231a20] border border-[#3a2535] rounded p-5 flex flex-col">
            <div className="flex justify-between items-start mb-4 border-b border-[#3a2535] pb-3">
              <div>
                <h3 className="text-[#C47A92] font-bold text-lg">{c.label}</h3>
                <span className="text-[#8a6878] text-xs">/{c.slug}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="text-[#8a6878] hover:text-white transition-colors text-xs border border-[#3a2535] px-2 py-1">Edit</button>
                <button onClick={() => del(c.id)} className="text-red-400 hover:text-white hover:bg-red-500 transition-colors text-xs border border-red-900 px-2 py-1">Del</button>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-[10px] uppercase tracking-widest text-[#8a6878] mb-2">Subcategories ({c.subcats.length})</h4>
              <div className="flex flex-wrap gap-2">
                {c.subcats.map(s => (
                  <span key={s.slug} className="text-xs bg-[#3a2535]/50 text-[#d4c0ca] px-2 py-1 rounded border border-[#3a2535]">{s.label}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#231a20] border border-[#3a2535] w-full max-w-xl max-h-[90vh] overflow-y-auto rounded">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#3a2535]">
              <h3 className="text-base font-semibold text-[#d4c0ca]">{editId ? 'Edit' : 'Add'} Category</h3>
              <button onClick={() => setModal(false)} className="text-[#8a6878] text-xl hover:text-[#d4c0ca]">✕</button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">Display Label *</label>
                  <input className={inp} value={form.label} onChange={e => setForm({...form, label: e.target.value})} placeholder="e.g. Electronics"/>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878] mb-1">URL Slug *</label>
                  <input className={inp} value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="e.g. electronics"/>
                </div>
              </div>

              <div className="bg-black/20 p-4 border border-[#3a2535] rounded mb-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[10px] uppercase tracking-[.1em] text-[#8a6878]">Subcategories ({form.subcats.length})</label>
                  <button onClick={addSub} className="text-[10px] uppercase tracking-widest text-[#C47A92] hover:text-[#d4c0ca]">+ Add Subcategory</button>
                </div>
                
                {form.subcats.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2 items-center">
                    <input className={`${inp} flex-1`} value={s.label} onChange={e => updateSub(i, 'label', e.target.value)} placeholder="Label (e.g. Smartphones)"/>
                    <input className={`${inp} flex-1`} value={s.slug} onChange={e => updateSub(i, 'slug', e.target.value)} placeholder="Slug (e.g. smartphones)"/>
                    <button onClick={() => removeSub(i)} className="px-3 bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400 hover:text-white transition-colors h-[38px]">✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={save} className="bg-[#C47A92] text-white px-5 py-2 text-sm hover:bg-[#7A3B52] transition-colors">Save Category</button>
              <button onClick={() => setModal(false)} className="bg-white/5 border border-[#3a2535] text-[#8a6878] px-5 py-2 text-sm hover:text-[#d4c0ca] transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
