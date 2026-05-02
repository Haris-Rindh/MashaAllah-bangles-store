import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cosmetics = [
  {
    id: 'cosmetics-card-1',
    name: 'Cosmetics',
    desc: 'Premium beauty products — foundations, lipsticks, mascaras, and complete makeup kits from top brands.',
    icon: '💄',
    color: '#FF69B4',
    shadow: 'rgba(255,105,180,0.3)',
  },
  {
    id: 'cosmetics-card-2',
    name: 'Imported Perfumes',
    desc: 'Exquisite international fragrances. Long-lasting, luxurious scents imported from around the world.',
    icon: '🌸',
    color: '#FFD700',
    shadow: 'rgba(255,215,0,0.3)',
  },
]

export default function CosmeticsSection() {
  const sectionRef = useRef()
  const textRef = useRef()
  const cardsRef = useRef()

  useGSAP(() => {
    // Fade text in from left as section enters
    gsap.fromTo(textRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 0.8,
        }
      }
    )

    // Staggered cards fade-in
    gsap.fromTo(cardsRef.current.children,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.2, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 20%',
          scrub: 0.8,
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      id="section-cosmetics"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 lg:px-28 py-24"
    >
      {/* Radial glow on left */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 w-96 h-96"
          style={{
            background: 'radial-gradient(circle, rgba(255,105,180,0.08) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Content — on LEFT side (3D model anchors to right via GSAP) */}
      <div className="max-w-lg" ref={textRef}>
        {/* Section label */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-px" style={{ background: '#FF69B4' }} />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#FF69B4' }}>
            Beauty & Fragrance
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-5">
          Your Complete
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #FF69B4, #FF00FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Beauty Destination
          </span>
        </h2>

        <p className="text-white/55 text-lg leading-relaxed mb-12 font-light">
          Under one roof — premium cosmetics, skincare, and world-class imported fragrances to make every moment unforgettable.
        </p>

        {/* Product cards */}
        <div ref={cardsRef} className="space-y-4">
          {cosmetics.map(item => (
            <div
              key={item.id}
              id={item.id}
              className="glass product-card-hover rounded-2xl p-5 flex items-start gap-4 cursor-pointer"
              style={{
                borderColor: `${item.color}30`,
                boxShadow: `0 4px 24px ${item.shadow}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">{item.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
