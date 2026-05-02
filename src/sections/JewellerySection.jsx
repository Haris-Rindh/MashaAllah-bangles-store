import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function JewellerySection() {
  const ref = useRef()

  useGSAP(() => {
    const st = { trigger: ref.current, start: 'top 72%', toggleActions: 'play none none reverse' }
    gsap.fromTo('#je-title',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: st })
    gsap.fromTo('#je-cards > *',
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { ...st, start: 'top 65%' } })
  }, { scope: ref })

  return (
    <section id="section-jewellery" ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-28">

      {/* Soft centre glow — necklace is centered in 3D here */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(201,144,106,0.06) 0%, transparent 65%)', filter: 'blur(20px)' }} />
      </div>

      {/* Centred heading */}
      <div id="je-title" className="text-center mb-14">
        <div className="ornament justify-center mb-6">Artificial Jewellery</div>
        <h2 className="font-display leading-tight" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', color: '#F5EDE8' }}>
          Elegance,{' '}
          <em className="not-italic gradient-text">Redefined</em>
        </h2>
        <p className="text-sm leading-relaxed mt-4 max-w-md mx-auto font-light"
          style={{ color: 'rgba(245,237,232,0.48)' }}>
          Stunning Kundan necklaces, jhumka earrings, maang tikkas and layered chokers
          — all crafted to make you shine.
        </p>
      </div>

      {/* 4-card grid around the featured 3D necklace */}
      <div id="je-cards" className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl">
        {PRODUCTS.jewellery.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
