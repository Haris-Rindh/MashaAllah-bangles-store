import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function BanglesSection() {
  const ref = useRef()

  useGSAP(() => {
    const st = { trigger: ref.current, start: 'top 72%', toggleActions: 'play none none reverse' }
    gsap.fromTo('#ba-text', { x: -45, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: st })
    gsap.fromTo('#ba-cards > *', { y: 45, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { ...st, start: 'top 68%' } })
  }, { scope: ref })

  return (
    <section id="section-bangles" ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-28">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-96 h-96"
          style={{ background: 'radial-gradient(circle, rgba(201,144,106,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Text on LEFT — necklace scrubs to RIGHT */}
      <div className="max-w-lg" id="ba-text">
        <div className="ornament mb-6">Handcrafted Bangles</div>
        <h2 className="font-display leading-tight mb-4" style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', color: '#F5EDE8' }}>
          A Bangle for<br />
          <em className="not-italic gradient-text">Every Story</em>
        </h2>
        <p className="text-sm leading-relaxed mb-10 max-w-sm font-light" style={{ color: 'rgba(245,237,232,0.5)' }}>
          From intricately set Kundan to vibrant everyday glass — our bangle collection
          celebrates every woman's unique elegance.
        </p>
      </div>

      <div id="ba-cards" className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
        {PRODUCTS.bangles.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
