import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function CosmeticsSection() {
  const ref = useRef()

  useGSAP(() => {
    const st = { trigger: ref.current, start: 'top 72%', toggleActions: 'play none none reverse' }
    gsap.fromTo('#co-text', { x: 45, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: st })
    gsap.fromTo('#co-cards > *', { y: 45, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { ...st, start: 'top 65%' } })
  }, { scope: ref })

  return (
    <section id="section-cosmetics" ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-end px-8 md:px-16 lg:px-24 py-28">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[420px] h-[420px]"
          style={{ background: 'radial-gradient(circle, rgba(234,184,200,0.07) 0%, transparent 70%)' }} />
      </div>

      {/* Text on RIGHT — necklace scrubs to LEFT */}
      <div className="max-w-lg w-full" id="co-text">
        <div className="ornament mb-6" style={{ justifyContent: 'flex-start' }}>Premium Beauty</div>
        <h2 className="font-display leading-tight mb-4" style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', color: '#F5EDE8' }}>
          Beauty That<br />
          <em className="not-italic" style={{
            background: 'linear-gradient(135deg,#EAB8C8,#C9906A)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>Speaks Volumes</em>
        </h2>
        <p className="text-sm leading-relaxed mb-10 max-w-sm font-light" style={{ color: 'rgba(245,237,232,0.5)' }}>
          From flawless foundations to bold lipsticks — our curated cosmetics collection
          is crafted for every complexion and occasion.
        </p>
      </div>

      <div id="co-cards" className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {PRODUCTS.cosmetics.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
