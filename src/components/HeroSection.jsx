import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const containerRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const badgesRef = useRef()
  const scrollHintRef = useRef()

  useGSAP(() => {
    // Staggered entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(titleRef.current,
      { y: 80, opacity: 0, skewY: 4 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.2 }
    )
    .fromTo(subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.7'
    )
    .fromTo(badgesRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      '-=0.2'
    )

    // Hero content fades out as user scrolls past
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -80,
      scrollTrigger: {
        trigger: '#section-hero',
        start: 'top top',
        end: '40% top',
        scrub: 1,
      }
    })

  }, { scope: containerRef })

  const productBadges = ['Bangles', 'Cosmetics', 'Perfumes', 'Jewellery', 'Pikoo Service']

  return (
    <section id="section-hero" className="relative min-h-screen flex flex-col items-start justify-center px-8 md:px-20 lg:px-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.06) 0%, rgba(255,0,255,0.04) 40%, transparent 70%)'
          }} />
      </div>

      <div ref={containerRef} className="relative max-w-2xl">
        {/* Eyebrow label */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-px bg-[#FFD700]" />
          <span className="text-[#FFD700] text-xs font-semibold tracking-[0.3em] uppercase">Cyber-Elegance Collection 2025</span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6"
        >
          <span className="gradient-text block">MashaAllah</span>
          <span className="text-white block">Bangles &</span>
          <span className="text-white/40 block">Cosmetics</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg text-white/60 leading-relaxed mb-8 max-w-md font-light"
        >
          Your complete beauty destination under one roof. Discover premium bangles, cosmetics, imported perfumes & more.
        </p>

        {/* Product Badges */}
        <div ref={badgesRef} className="flex flex-wrap gap-2 mb-10">
          {productBadges.map(badge => (
            <span
              key={badge}
              className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.25)',
                color: 'rgba(255,215,0,0.8)'
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#section-cosmetics"
            id="hero-cta-primary"
            className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase text-black transition-all duration-300 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FF69B4)' }}
          >
            Explore Now
          </a>
          <a
            href="#section-contact"
            id="hero-cta-secondary"
            className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase text-white/70 border border-white/20 hover:border-[#FFD700]/50 hover:text-[#FFD700] transition-all duration-300"
          >
            Visit Store
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
