import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PikooSection() {
  const ref = useRef()
  const [form, setForm] = useState({ name: '', phone: '', size: '', notes: '' })
  const [sent, setSent] = useState(false)

  useGSAP(() => {
    const st = { trigger: ref.current, start: 'top 70%', toggleActions: 'play none none reverse' }
    gsap.fromTo('#pk-service', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: st })
    gsap.fromTo('#pk-address', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
      scrollTrigger: { ...st, start: 'top 65%' } })
  }, { scope: ref })

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    const msg = `*Ladies Suit Pikoo Booking*\n\n👤 ${form.name}\n📞 ${form.phone}\n📐 ${form.size || '—'}\n📝 ${form.notes || '—'}\n\n📍 MashaAllah Bangles & Cosmetics\nMain Circular Road, She Shop Wali Gali, Shujabad`
    window.open(`https://wa.me/923017506498?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const field = (id, name, placeholder, label) => (
    <div>
      <label className="block text-[10px] font-medium tracking-[0.2em] uppercase mb-1.5"
        style={{ color: 'rgba(201,144,106,0.65)' }}>{label}</label>
      <input id={id} name={name} value={form[name]} onChange={handle} placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm font-light"
        style={{ background: 'rgba(255,240,228,0.04)', border: '1px solid rgba(201,144,106,0.18)',
          color: '#F5EDE8', outline: 'none' }}
        onFocus={e => e.target.style.borderColor = 'rgba(201,144,106,0.55)'}
        onBlur={e => e.target.style.borderColor = 'rgba(201,144,106,0.18)'}
      />
    </div>
  )

  return (
    <section id="section-pikoo" ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-28 gap-7">

      {/* Soft floor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,144,106,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* ── Pikoo Booking Card ── */}
      <div id="pk-service" className="w-full max-w-2xl rounded-3xl p-8 md:p-10"
        style={{ background: 'rgba(255,240,228,0.03)', border: '1px solid rgba(201,144,106,0.16)',
          backdropFilter: 'blur(20px)', boxShadow: '0 20px 80px rgba(201,144,106,0.08)' }}>

        {/* Card header */}
        <div className="flex items-start gap-5 mb-8">
          <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl"
            style={{ background: 'rgba(201,144,106,0.1)', border: '1px solid rgba(201,144,106,0.25)' }}>
            ✂️
          </div>
          <div>
            <div className="ornament mb-1" style={{ justifyContent: 'flex-start' }}>Exclusive Service</div>
            <h2 className="font-display text-2xl font-semibold" style={{ color: '#F5EDE8' }}>
              Ladies Suit Pikoo
            </h2>
            <p className="text-xs mt-1 font-light" style={{ color: 'rgba(245,237,232,0.45)' }}>
              Professional edge-stitching & finishing for ladies suits
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('pk-name',  'name',  'Your full name',    'Full Name *')}
            {field('pk-phone', 'phone', '03XX-XXXXXXX',      'Phone Number *')}
          </div>
          {field('pk-size',  'size',  'e.g. Medium, Chest 38"', 'Suit Size / Measurements')}
          <div>
            <label className="block text-[10px] font-medium tracking-[0.2em] uppercase mb-1.5"
              style={{ color: 'rgba(201,144,106,0.65)' }}>Additional Notes</label>
            <textarea id="pk-notes" name="notes" rows={3} value={form.notes} onChange={handle}
              placeholder="Any special finishing preferences..."
              className="w-full rounded-xl px-4 py-3 text-sm font-light resize-none"
              style={{ background: 'rgba(255,240,228,0.04)', border: '1px solid rgba(201,144,106,0.18)',
                color: '#F5EDE8', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = 'rgba(201,144,106,0.55)'}
              onBlur={e => e.target.style.borderColor = 'rgba(201,144,106,0.18)'} />
          </div>
          <button id="pk-submit" type="submit" className="btn-primary w-full mt-1"
            style={sent ? { background: 'linear-gradient(135deg,#5CB85C,#3D9A3D)', color: '#fff' } : {}}>
            {sent ? '✓ Booking Sent via WhatsApp!' : '📱 Book via WhatsApp'}
          </button>
        </form>
      </div>

      {/* ── Address / Store Card ── */}
      <div id="pk-address" className="w-full max-w-2xl rounded-3xl p-8 md:p-10 text-center"
        style={{ background: 'rgba(255,240,228,0.025)', border: '1px solid rgba(201,144,106,0.12)',
          backdropFilter: 'blur(20px)', boxShadow: '0 20px 80px rgba(0,0,0,0.3)' }}>

        {/* Logo mark */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6"
          style={{ background: 'linear-gradient(135deg,#C9906A,#EAB8C8)', boxShadow: '0 0 28px rgba(201,144,106,0.3)' }}>
          <span style={{ fontFamily: '"Playfair Display"', fontWeight: 700, color: '#2A1520', fontSize: '1.1rem' }}>M</span>
        </div>

        <h3 className="font-display text-3xl font-semibold gradient-text leading-snug">
          MashaAllah Bangles<br />& Cosmetics
        </h3>

        {/* Decorative rule */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px" style={{ background: 'rgba(201,144,106,0.2)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9906A', boxShadow: '0 0 6px #C9906A' }} />
          <div className="flex-1 h-px" style={{ background: 'rgba(201,144,106,0.2)' }} />
        </div>

        {/* Address */}
        <div className="flex items-start justify-center gap-3 mb-6">
          <span className="text-xl mt-0.5">📍</span>
          <div className="text-left">
            <p className="text-sm font-light" style={{ color: 'rgba(245,237,232,0.5)' }}>Main Circular Road,</p>
            <p className="font-semibold text-base" style={{ color: '#F5EDE8' }}>She Shop Wali Gali,</p>
            <p className="text-sm" style={{ color: 'rgba(245,237,232,0.65)' }}>Shujabad</p>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['Bangles','Cosmetics','Perfumes','Jewellery','Pikoo Service'].map(t => (
            <span key={t} className="px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-wider uppercase"
              style={{ background: 'rgba(201,144,106,0.07)', border: '1px solid rgba(201,144,106,0.22)',
                color: 'rgba(201,144,106,0.8)' }}>
              {t}
            </span>
          ))}
        </div>

        <p className="text-xs leading-relaxed max-w-sm mx-auto font-light"
          style={{ color: 'rgba(245,237,232,0.35)' }}>
          Discover all varieties of bangles including Metal, Kundan, Glass, Wedding Sets & Daily Wear.
          We also offer Cosmetics, Imported Perfumes, Artificial Jewellery, and professional Pikoo service.
        </p>

        <p className="text-[10px] tracking-widest mt-8" style={{ color: 'rgba(245,237,232,0.15)' }}>
          © 2025 MashaAllah Bangles & Cosmetics — All Rights Reserved
        </p>
      </div>
    </section>
  )
}
