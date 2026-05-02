import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { icon: '💍', title: 'Bangles', sub: 'Metal, Kundan, Glass & Wedding sets', href: '/shop?cat=bangles', color: '#C9906A' },
  { icon: '💄', title: 'Cosmetics', sub: 'Foundations, lipsticks & palettes', href: '/shop?cat=cosmetics', color: '#EAB8C8' },
  { icon: '🌸', title: 'Perfumes', sub: 'Imported Arabic & French fragrances', href: '/shop?cat=perfumes', color: '#D4756A' },
  { icon: '✨', title: 'Jewellery', sub: 'Kundan, jhumka & bridal pieces', href: '/shop?cat=jewellery', color: '#B8A0C8' },
]

const FEATURED_IDS = ['b2', 'p1', 'j1', 'c4']

const STATS = [
  { value: '500+', label: 'Bangle Styles' },
  { value: '100+', label: 'Fragrances' },
  { value: '1000+', label: 'Happy Customers' },
]

export default function LandingPage() {
  const heroRef = useRef()

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    const updateLenis = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    // Stagger-in hero elements
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('#lp-label',    { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.2)
      .fromTo('#lp-title',    { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.35)
      .fromTo('#lp-sub',      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.6)
      .fromTo('#lp-ctas > *', { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.65 }, 0.85)
      .fromTo('#lp-stats > *',{ y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.65 }, 1.0)
      .fromTo('.hero-card',   { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.9, ease: 'power2.out' }, 0.4)
      .fromTo('.hero-chip',   { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, 1.1)

    // Scroll animations
    gsap.fromTo('#feat-cards > *', { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '#section-features', start: 'top 80%' } })

    gsap.fromTo('#featured-cards > *', { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '#section-featured', start: 'top 80%' } })

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const featuredProducts = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean)

  return (
    <div style={{ background: '#FDFBF7' }}>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden"
        style={{ minHeight: '100vh', background: 'linear-gradient(155deg, #FDF8F3 0%, #F5EDE0 40%, #FAF0F5 100%)' }}>

        {/* Background ornamental circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{
            top: '-20%', right: '-15%',
            width: '65vw', height: '65vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234,184,200,0.35) 0%, transparent 70%)',
            animation: 'float-slow 22s ease-in-out infinite',
          }} />
          <div className="absolute" style={{
            bottom: '-25%', left: '-10%',
            width: '55vw', height: '55vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,144,106,0.2) 0%, transparent 70%)',
            animation: 'float-slow 18s ease-in-out infinite reverse',
          }} />
          {/* Thin decorative ring top-right */}
          <div className="absolute" style={{
            top: '8%', right: '8%',
            width: '260px', height: '260px',
            borderRadius: '50%',
            border: '1px solid rgba(201,144,106,0.18)',
          }} />
          <div className="absolute" style={{
            top: '12%', right: '12%',
            width: '180px', height: '180px',
            borderRadius: '50%',
            border: '1px solid rgba(201,144,106,0.12)',
          }} />
        </div>

        {/* Main hero grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">

          {/* ── LEFT: Text Content ── */}
          <div className="flex flex-col">

            {/* Label */}
            <div id="lp-label" className="ornament mb-8" style={{ justifyContent: 'flex-start' }}>
              Est. Shujabad · Your Beauty Destination
            </div>

            {/* Title */}
            <h1 id="lp-title" className="font-display font-semibold leading-[1.05] tracking-tight mb-7"
              style={{ fontSize: 'clamp(3.2rem, 5.5vw, 5.2rem)', color: '#1C1412' }}>
              Where Every Woman<br />
              <span className="relative inline-block">
                <em className="not-italic gradient-text">Finds Her Glow</em>
                {/* Underline accent */}
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 320 8" preserveAspectRatio="none">
                  <path d="M0,6 C80,0 240,0 320,6" stroke="url(#uGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="uGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C9906A" />
                      <stop offset="100%" stopColor="#EAB8C8" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p id="lp-sub" className="text-[1.05rem] leading-relaxed mb-10 font-light max-w-md"
              style={{ color: '#6B5548' }}>
              Discover an exclusive collection of bangles, perfumes, cosmetics & artisan jewellery — your complete luxury beauty destination.
            </p>

            {/* CTAs */}
            <div id="lp-ctas" className="flex items-center gap-4 flex-wrap mb-14">
              <Link to="/shop" className="btn-primary" style={{ padding: '1rem 2.4rem', fontSize: '0.78rem' }}>
                Shop Collection
              </Link>
              <a href="#section-about" className="btn-ghost" style={{ padding: '1rem 2.4rem', fontSize: '0.78rem' }}>
                Our Story
              </a>
            </div>

            {/* Stats row */}
            <div id="lp-stats" className="flex gap-8 pt-8" style={{ borderTop: '1px solid #E4D5C8' }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold" style={{ color: '#C9906A' }}>{s.value}</p>
                  <p className="text-xs font-light mt-0.5" style={{ color: '#6B5548' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Visual Collage ── */}
          <div className="relative h-[560px] lg:h-[680px] hidden lg:block">

            {/* Card 1 – Main tall card */}
            <div className="hero-card absolute rounded-3xl overflow-hidden shadow-2xl"
              style={{
                top: '0', right: '0',
                width: '62%', height: '78%',
                background: 'linear-gradient(145deg, #F5D5B0, #F0B8C8)',
                border: '3px solid rgba(255,255,255,0.8)',
                boxShadow: '0 32px 64px rgba(201,144,106,0.2)',
              }}>
              {/* Decorative content inside card */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
                {/* Ring illustration */}
                <div className="relative mb-6">
                  <div className="w-36 h-36 rounded-full" style={{ background: 'linear-gradient(135deg, #D4AA70, #F2DFC0)', boxShadow: '0 8px 32px rgba(212,170,112,0.5)' }} />
                  <div className="absolute inset-3 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6), transparent)', border: '2px solid rgba(255,255,255,0.7)' }} />
                  <div className="absolute" style={{ top: '-8px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '20px', background: 'linear-gradient(to bottom, #D4AA70, transparent)' }} />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full" style={{ background: 'linear-gradient(135deg, #EAB8C8, #EAB8C8)', border: '2px solid #fff' }} />
                </div>
                <p className="font-display text-xl font-semibold" style={{ color: '#6B3D2E' }}>Kundan Bridal</p>
                <p className="text-sm font-light mt-1" style={{ color: 'rgba(107,61,46,0.7)' }}>Premium Collection</p>
                {/* Price tag */}
                <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
                  <span className="text-sm font-semibold" style={{ color: '#C9906A' }}>From Rs. 850</span>
                </div>
              </div>
            </div>

            {/* Card 2 – Cosmetics card bottom-left */}
            <div className="hero-card absolute rounded-2xl overflow-hidden shadow-xl"
              style={{
                bottom: '0', left: '0',
                width: '52%', height: '46%',
                background: 'linear-gradient(145deg, #FBE9F1, #F5D0E0)',
                border: '3px solid rgba(255,255,255,0.8)',
                boxShadow: '0 24px 48px rgba(234,184,200,0.25)',
              }}>
              <div className="w-full h-full flex items-center p-6 gap-5">
                <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl" style={{ background: 'rgba(255,255,255,0.5)' }}>
                  💄
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#C9906A' }}>Beauty</p>
                  <p className="font-display text-lg font-semibold" style={{ color: '#3C1A2E' }}>Cosmetics</p>
                  <p className="text-xs font-light mt-1" style={{ color: 'rgba(60,26,46,0.65)' }}>Foundations & Lipsticks</p>
                </div>
              </div>
            </div>

            {/* Card 3 – Perfume card top-left (overlapping) */}
            <div className="hero-card absolute rounded-2xl overflow-hidden shadow-xl"
              style={{
                top: '30%', left: '2%',
                width: '44%', height: '38%',
                background: 'linear-gradient(145deg, #FDEBD8, #F9D5B5)',
                border: '3px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 40px rgba(201,144,106,0.2)',
              }}>
              <div className="w-full h-full flex items-center p-5 gap-4">
                <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.5)' }}>
                  🌸
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#C9906A' }}>Imported</p>
                  <p className="font-display text-base font-semibold" style={{ color: '#3C2010' }}>Perfumes</p>
                  <p className="text-xs font-light mt-0.5" style={{ color: 'rgba(60,32,16,0.65)' }}>Arabic & French</p>
                </div>
              </div>
            </div>

            {/* Floating chip badge */}
            <div className="hero-chip absolute rounded-full flex items-center gap-2.5 px-4 py-2.5"
              style={{
                top: '-2%', left: '16%',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(201,144,106,0.25)',
                boxShadow: '0 8px 24px rgba(201,144,106,0.15)',
              }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: 'linear-gradient(135deg, #C9906A, #EAB8C8)' }}>✦</div>
              <span className="text-xs font-semibold" style={{ color: '#1C1412' }}>New Arrivals In Stock</span>
            </div>

            {/* Floating chip badge 2 */}
            <div className="hero-chip absolute rounded-full flex items-center gap-2 px-3.5 py-2"
              style={{
                bottom: '10%', right: '-4%',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(201,144,106,0.2)',
                boxShadow: '0 8px 24px rgba(201,144,106,0.12)',
              }}>
              <span className="text-xs">📍</span>
              <span className="text-xs font-semibold" style={{ color: '#1C1412' }}>Shujabad</span>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,144,106,0.5)' }}>Scroll</span>
          <div className="w-px h-10 animate-pulse" style={{ background: 'linear-gradient(to bottom, #C9906A, transparent)' }} />
        </div>
      </section>

      {/* ════════════════════════════════════
          CATEGORY FEATURES
      ════════════════════════════════════ */}
      <section id="section-features" className="py-28 px-6 md:px-16 lg:px-24"
        style={{ background: '#FDFBF7', borderTop: '1px solid #E4D5C8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="ornament justify-center mb-5">Our Collections</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-charcoal">
              Beauty, <em className="not-italic gradient-text">Redefined</em>
            </h2>
            <p className="text-sm mt-4 max-w-md mx-auto font-light" style={{ color: '#6B5548' }}>
              Everything you need, from bangles to perfumes — all under one roof.
            </p>
          </div>

          <div id="feat-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => (
              <Link key={f.title} to={f.href}
                className="group rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                style={{ background: '#fff', border: '1px solid #E4D5C8', boxShadow: '0 1px 3px rgba(28,20,18,0.05)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 16px 48px ${f.color}25, 0 0 0 1px ${f.color}40`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(28,20,18,0.05)'}>
                {/* Colored top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${f.color}, ${f.color}88)` }} />
                <div className="text-4xl mb-5 mt-2">{f.icon}</div>
                <h3 className="font-display font-semibold text-lg text-charcoal mb-2">{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#6B5548' }}>{f.sub}</p>
                <div className="mt-5 text-xs font-medium tracking-wider uppercase" style={{ color: f.color }}>
                  Browse →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          MARQUEE STRIP
      ════════════════════════════════════ */}
      <div className="py-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #C9906A, #B8762A)' }}>
        <div style={{ display: 'flex', gap: '3rem', animation: 'marquee 25s linear infinite', whiteSpace: 'nowrap' }}>
          {Array(3).fill(['💍 Metal Bangles', '💄 Cosmetics', '🌸 Imported Perfumes', '✨ Kundan Jewellery', '🪡 Pikoo Service', '💎 Wedding Sets', '🧴 Foundations & Lipsticks', '🪄 Glass Bangles']).flat().map((t, i) => (
            <span key={i} className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          FEATURED PRODUCTS
      ════════════════════════════════════ */}
      <section id="section-featured" className="py-28 px-6 md:px-16 lg:px-24"
        style={{ background: '#F9F4EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="ornament mb-4" style={{ justifyContent: 'flex-start' }}>Curated For You</div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal">
                Featured <em className="not-italic gradient-text">Picks</em>
              </h2>
            </div>
            <Link to="/shop" className="btn-ghost" style={{ whiteSpace: 'nowrap', padding: '0.6rem 1.5rem' }}>
              View All Products
            </Link>
          </div>
          <div id="featured-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT / ADDRESS
      ════════════════════════════════════ */}
      <section id="section-about" className="py-28 px-6 md:px-16 lg:px-24"
        style={{ background: '#FDFBF7', borderTop: '1px solid #E4D5C8' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="ornament mb-5" style={{ justifyContent: 'flex-start' }}>Exclusive Service</div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-4">
                Ladies Suit<br /><em className="not-italic gradient-text">Pikoo Service</em>
              </h2>
              <p className="text-sm leading-relaxed mb-8 font-light" style={{ color: '#6B5548' }}>
                Professional edge-stitching and finishing for ladies suits. Drop in or book via WhatsApp for a seamless experience tailored just for you.
              </p>
              <a href="https://wa.me/923017506498?text=I'd like to book a Pikoo service at MashaAllah Bangles"
                target="_blank" rel="noreferrer" className="btn-primary inline-block">
                Book via WhatsApp 📱
              </a>
            </div>

            <div className="rounded-3xl p-8 md:p-10"
              style={{ background: '#fff', border: '1px solid #E4D5C8', boxShadow: '0 4px 32px rgba(201,144,106,0.08)' }}>
              <div className="flex items-center justify-center w-14 h-14 rounded-full mb-6"
                style={{ background: 'linear-gradient(135deg,#C9906A,#EAB8C8)', boxShadow: '0 4px 20px rgba(201,144,106,0.3)' }}>
                <span style={{ fontFamily: '"Playfair Display"', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>M</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-charcoal mb-1">MashaAllah Bangles</h3>
              <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: '#C9906A' }}>& Cosmetics</h3>
              <div className="flex items-start gap-3 mb-6">
                <span className="text-xl mt-0.5">📍</span>
                <div>
                  <p className="text-sm font-light" style={{ color: '#6B5548' }}>Main Circular Road,</p>
                  <p className="font-semibold text-base text-charcoal">She Shop Wali Gali,</p>
                  <p className="text-sm" style={{ color: '#6B5548' }}>Shujabad</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Bangles','Cosmetics','Perfumes','Jewellery','Pikoo'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase"
                    style={{ background: '#F5EDE0', border: '1px solid #E4D5C8', color: '#6B5548' }}>
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-xs leading-relaxed mt-5 font-light" style={{ color: '#C4AEAB' }}>
                © 2025 MashaAllah Bangles & Cosmetics — All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
