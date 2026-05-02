import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const ref = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('#h-label',  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo('#h-title',  { y: 55, opacity: 0, skewY: 2 }, { y: 0, opacity: 1, skewY: 0, duration: 1.1 }, '-=0.5')
      .fromTo('#h-sub',    { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.7')
      .fromTo('#h-ctas > *', { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 }, '-=0.5')

    // Cards stagger on scroll
    gsap.fromTo('#h-cards > *',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '#h-cards', start: 'top 82%', toggleActions: 'play none none reverse' } })
  }, { scope: ref })

  return (
    <section id="section-hero" ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-32 pb-20">

      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(circle, rgba(201,144,106,0.07) 0%, transparent 65%)', filter: 'blur(30px)' }} />
      </div>

      <div className="max-w-xl">
        {/* Eyebrow */}
        <div id="h-label" className="ornament mb-7">Est. Shujabad · Beauty & Beyond</div>

        {/* Title */}
        <h1 id="h-title" className="font-display leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', color: '#F5EDE8' }}>
          Discover<br />
          <em className="not-italic gradient-text">Your Glow</em>
        </h1>

        {/* Subtext */}
        <p id="h-sub" className="text-base leading-relaxed mb-9 max-w-md font-light"
          style={{ color: 'rgba(245,237,232,0.55)' }}>
          Premium bangles, imported perfumes, and artisan jewellery —
          your complete beauty destination under one roof in Shujabad.
        </p>

        {/* CTAs */}
        <div id="h-ctas" className="flex items-center gap-4 flex-wrap">
          <a href="#section-bangles" className="btn-primary">Shop Collection</a>
          <a href="#section-pikoo"   className="btn-ghost">Visit Our Store</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,144,106,0.5)' }}>Scroll</span>
        <div className="w-px h-10 animate-pulse" style={{ background: 'linear-gradient(to bottom, rgba(201,144,106,0.5), transparent)' }} />
      </div>

      {/* Product cards — below hero copy */}
      <div id="h-cards" className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
        {PRODUCTS.bangles.slice(0, 3).map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
