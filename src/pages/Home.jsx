import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Store from '../store'

const SLIDES = [
  { type:'video', src:'hero-section.mp4', pre:'New Collection 2025', title:'Timeless\nElegance', sub:'Handcrafted luxury bangles & jewellery for every occasion', cta:'Explore Collection', href:'/products' },
  { type:'image', src:'images (1).jpeg',  pre:'Bridal Collection',  title:'Bridal\nGrandeur',  sub:'Exquisite bridal sets for your most special day',         cta:'Shop Bridal',       href:'/category/bangles?sub=bridal-heavy' },
  { type:'image', src:'images (2).jpeg',  pre:'Luxury Cosmetics',   title:'Glow\nRedefined',   sub:'Premium makeup & skincare for the modern woman',           cta:'Shop Cosmetics',    href:'/category/cosmetics' },
]
const CATS = [
  { cat:'jewellery', label:'Jewellery',        img:'images (3).jpeg' },
  { cat:'bangles',   label:'Bangles',           img:'images (4).jpeg' },
  { cat:'cosmetics', label:'Cosmetics',         img:'images (5).jpeg' },
  { cat:'perfumes',  label:'Perfumes',          img:'images (6).jpeg' },
  { cat:'baby',      label:'Baby Care',         img:'images (7).jpeg' },
  { cat:'clothing',  label:'Clothing',          img:'images (8).jpeg' },
]

export default function Home() {
  const [slide, setSlide]    = useState(0)
  const [email, setEmail]    = useState('')
  const [joined, setJoined]  = useState(false)
  const featured = Store.getProducts().filter(p => p.featured).slice(0, 8)

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s+1)%SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-screen overflow-hidden">
        {SLIDES.map((s, i) => (
          <div key={i} className={`hero-slide ${i===slide?'active':''}`}>
            {s.type==='video'
              ? <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"><source src={`/${s.src}`} type="video/mp4"/></video>
              : <img src={`/${s.src}`} alt={s.pre} className="absolute inset-0 w-full h-full object-cover"/>
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10"/>
            <div className="absolute inset-0 flex flex-col justify-end lg:justify-center px-6 lg:px-16 pb-20 lg:pb-0 pt-32 z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={i === slide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white text-center lg:text-left max-w-lg mx-auto lg:mx-0"
              >
                <p className="text-[10px] uppercase tracking-[.3em] mb-4 opacity-100 font-bold">{s.pre}</p>
                <h1 className="font-display uppercase text-[clamp(44px,8vw,80px)] leading-[1.05] mb-6 [text-shadow:0_2px_16px_rgba(0,0,0,0.3)]">{s.title}</h1>
                <p className="text-xs md:text-sm tracking-widest uppercase opacity-90 mb-8">{s.sub}</p>
                <Link to={s.href} className="inline-block bg-white text-swa-dark px-10 py-4 text-[10px] tracking-[.2em] uppercase font-bold hover:bg-swa-gray transition-colors">{s.cta}</Link>
              </motion.div>
            </div>
          </div>
        ))}
        {/* Prev/Next Arrows */}
        <button onClick={() => setSlide(s => (s-1+SLIDES.length)%SLIDES.length)}
          className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-white/40 text-white/80 text-2xl hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 z-10 backdrop-blur-sm"
          aria-label="Previous slide">‹</button>
        <button onClick={() => setSlide(s => (s+1)%SLIDES.length)}
          className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-white/40 text-white/80 text-2xl hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 z-10 backdrop-blur-sm"
          aria-label="Next slide">›</button>
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8 flex gap-3 z-10">
          {SLIDES.map((_,i) => <button key={i} onClick={() => setSlide(i)} aria-label={`Go to slide ${i+1}`} aria-current={i===slide?'true':undefined} className={`transition-all duration-300 border-none ${i===slide ? 'w-8 h-[2px] bg-white' : 'w-2 h-[2px] bg-white/40 hover:bg-white/70'}`}/>)}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="px-4 md:px-8 lg:px-16 py-16 lg:py-24 bg-swa-blue text-swa-dark">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="font-display uppercase text-center text-[clamp(28px,5vw,40px)] tracking-[.1em] mb-3">Shop by Category</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[10px] uppercase tracking-[.2em] text-swa-dark/60 font-bold mb-12">Explore our collections</motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {CATS.map((c, i) => (
            <motion.div key={c.cat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
              <Link to={`/category/${c.cat}`} className="group text-center block">
                <div className="aspect-[3/4] overflow-hidden bg-white mb-3 relative">
                  <img src={`/${c.img}`} alt={c.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"/>
                </div>
                <p className="text-[10px] uppercase tracking-[.2em] font-bold text-swa-dark group-hover:opacity-50 transition-opacity duration-300">{c.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="overflow-hidden min-h-[400px] lg:min-h-[600px] group">
          <img src="/images (9).jpeg" alt="Bridal Edit" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"/>
        </motion.div>
        <div className="bg-swa-yellow flex flex-col justify-center px-8 md:px-16 py-16 lg:py-20 text-swa-dark">
          <motion.div {...fadeUp}>
            <p className="text-[10px] uppercase tracking-[.2em] mb-6 font-bold">Exclusive Picks</p>
            <h2 className="font-display uppercase text-[clamp(36px,5vw,56px)] leading-[1.05] mb-6">The Bridal<br/>Edit</h2>
            <p className="text-xs md:text-sm tracking-wide leading-relaxed opacity-80 mb-10 max-w-md">A curated selection of our most coveted bridal jewellery, bangles & cosmetics — thoughtfully assembled for the modern bride.</p>
            <Link to="/category/bangles?sub=bridal-heavy" className="inline-block bg-swa-dark text-white px-10 py-4 text-[10px] tracking-[.2em] uppercase hover:bg-black/80 transition-colors self-start font-bold">Discover Now</Link>
          </motion.div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="px-4 md:px-8 lg:px-16 py-16 lg:py-24 bg-white text-swa-dark">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="font-display uppercase text-center text-[clamp(28px,5vw,40px)] tracking-[.1em] mb-3">New Arrivals</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[10px] uppercase tracking-[.2em] text-gray/60 font-bold mb-12">Freshly added to our store</motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {featured.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <ProductCard product={p}/>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-14">
          <Link to="/products" className="inline-block border border-swa-dark text-swa-dark px-12 py-4.5 text-[10px] tracking-[.2em] uppercase hover:bg-swa-dark hover:text-white transition-all duration-300 font-bold">View All Products</Link>
        </motion.div>
      </section>

      {/* EDITORIAL */}
      <section className="relative h-[500px] lg:h-[680px] overflow-hidden flex items-center justify-center text-center">
        <motion.img
          initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          src="/images (5).jpeg" alt="Lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"/>
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-white px-6 max-w-xl mx-auto"
        >
          <p className="text-[10px] uppercase tracking-[.3em] mb-5 font-bold opacity-90">As Seen In</p>
          <h2 className="font-display uppercase text-[clamp(40px,6vw,64px)] leading-[1.0] mb-6">Effortless<br/>Glamour</h2>
          <p className="text-xs md:text-sm tracking-wide opacity-80 max-w-sm mx-auto mb-10 leading-relaxed">From daily wear to bridal luxury — discover styles that speak to every woman.</p>
          <Link to="/products" className="inline-block border border-white text-white px-10 py-4 text-[10px] tracking-[.2em] uppercase hover:bg-white hover:text-swa-dark transition-all duration-300 font-bold">Explore Lookbook</Link>
        </motion.div>
      </section>

      {/* JOIN CLUB */}
      <section className="bg-swa-green px-4 md:px-8 lg:px-16 py-20 lg:py-28 text-center text-swa-dark">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
          <h2 className="font-display uppercase text-[clamp(28px,4vw,44px)] tracking-[.1em] mb-4">Join The Club</h2>
          <p className="text-xs md:text-sm tracking-wide leading-relaxed mb-10 max-w-sm mx-auto opacity-75">Be the first to know about new collections, exclusive deals &amp; seasonal offers.</p>
          {joined ? (
            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-bold tracking-[.2em] uppercase text-[11px]">✓ Thank you for subscribing!</motion.p>
          ) : (
            <form className="flex max-w-sm mx-auto mb-6 border-b-2 border-swa-dark/40 pb-3 focus-within:border-swa-dark transition-colors" onSubmit={e => { e.preventDefault(); if(email) setJoined(true) }}>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="YOUR EMAIL ADDRESS" required
                className="flex-1 bg-transparent text-[11px] font-bold text-swa-dark placeholder:text-swa-dark/40 outline-none min-w-0 tracking-widest uppercase"/>
              <button type="submit" className="text-swa-dark pl-4 text-xl hover:opacity-50 transition-opacity flex-shrink-0" aria-label="Subscribe">→</button>
            </form>
          )}
          <p className="text-[9px] tracking-[.15em] uppercase opacity-50">By subscribing you agree to our <a href="#" className="underline hover:opacity-80 transition-opacity">Privacy Policy</a>.</p>
        </motion.div>
      </section>
    </>
  )
}
