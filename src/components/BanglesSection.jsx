import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const bangles = [
  { id: 'bangle-card-metal', label: 'Metal Bangles', desc: 'Classic & contemporary metal bangles in brass, copper, and silver-toned finishes.', color: '#B8860B' },
  { id: 'bangle-card-kundan', label: 'Kundan Bangles', desc: 'Handcrafted Kundan artistry with intricate stone-work and traditional Pakistani designs.', color: '#FFD700' },
  { id: 'bangle-card-glass', label: 'Glass Bangles', desc: 'Vibrant, colorful glass bangles — perfect for everyday wear or festive celebrations.', color: '#00FFFF' },
  { id: 'bangle-card-wedding', label: 'Wedding Sets', desc: 'Luxurious bridal bangle sets designed to complement the most special day of your life.', color: '#FF69B4' },
]

const jewellery = [
  { id: 'jewel-card-1', label: 'Artificial Jewellery', desc: 'Elegant necklaces, earrings, and statement pieces at affordable prices.', color: '#FF00FF' },
  { id: 'jewel-card-2', label: 'Daily Wear Bangles', desc: 'Lightweight, comfortable bangles designed for everyday elegance.', color: '#B76E79' },
]

export default function BanglesSection() {
  const sectionRef = useRef()
  const headingRef = useRef()
  const cardsGridRef = useRef()
  const jewelleryRef = useRef()

  useGSAP(() => {
    // Heading slides in from right
    gsap.fromTo(headingRef.current,
      { x: 80, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 35%',
          scrub: 0.8,
        }
      }
    )

    // Bangle cards
    gsap.fromTo(Array.from(cardsGridRef.current.children),
      { y: 70, opacity: 0, scale: 0.92 },
      {
        y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'center 40%',
          scrub: 0.8,
        }
      }
    )

    // Jewellery cards
    gsap.fromTo(jewelleryRef.current.children,
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.15, duration: 1,
        scrollTrigger: {
          trigger: jewelleryRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 0.8,
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      id="section-bangles"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 lg:px-28 py-24"
    >
      {/* Right-side radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Content on RIGHT side (3D model anchors left via GSAP) */}
      <div className="ml-auto max-w-xl" ref={headingRef}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-px bg-[#00FFFF]" />
          <span className="text-[#00FFFF] text-xs font-semibold tracking-[0.3em] uppercase">
            Bangles & Jewellery
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-3">
          Every Occasion,
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #FFD700, #00FFFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Every Style
          </span>
        </h2>
        <p className="text-white/50 text-base leading-relaxed mb-10 font-light">
          From intricate Kundan bridal sets to vibrant daily-wear glass bangles — our collection spans every tradition and taste.
        </p>

        {/* Bangle Cards Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-2 gap-3 mb-8">
          {bangles.map(item => (
            <div
              key={item.id}
              id={item.id}
              className="glass product-card-hover rounded-xl p-4 cursor-pointer"
              style={{
                borderColor: `${item.color}25`,
                boxShadow: `0 0 20px ${item.color}10`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full mb-3"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
              <h3 className="font-bold text-white text-sm mb-1">{item.label}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Jewellery Section */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-px bg-[#FF00FF]" />
          <span className="text-[#FF00FF] text-xs font-semibold tracking-[0.3em] uppercase">Also Available</span>
        </div>

        <div ref={jewelleryRef} className="space-y-3">
          {jewellery.map(item => (
            <div
              key={item.id}
              id={item.id}
              className="glass product-card-hover rounded-xl p-4 flex items-center gap-4 cursor-pointer"
              style={{ borderColor: `${item.color}25` }}
            >
              <div
                className="w-1.5 h-10 rounded-full flex-shrink-0"
                style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }}
              />
              <div>
                <h3 className="font-bold text-white text-sm">{item.label}</h3>
                <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
