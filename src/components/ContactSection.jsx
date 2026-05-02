import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef()
  const cardRef = useRef()
  const pikooRef = useRef()

  useGSAP(() => {
    // Main card slides up
    gsap.fromTo(cardRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 35%',
          scrub: 0.8,
        }
      }
    )

    // Pikoo service card slides up with delay
    gsap.fromTo(pikooRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 30%',
          scrub: 0.8,
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      id="section-contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-28"
    >
      {/* Bottom glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Pikoo Service Banner */}
      <div
        ref={pikooRef}
        id="pikoo-service-card"
        className="glass rounded-2xl p-6 mb-8 w-full max-w-2xl flex items-center gap-5"
        style={{
          border: '1px solid rgba(183,110,121,0.3)',
          boxShadow: '0 8px 40px rgba(183,110,121,0.12)'
        }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: 'rgba(183,110,121,0.12)', border: '1px solid rgba(183,110,121,0.3)' }}
        >
          ✂️
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-px" style={{ background: '#B76E79' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#B76E79' }}>
              Exclusive Service
            </span>
          </div>
          <h3 className="text-white font-bold text-lg">Ladies Suit Pikoo Service</h3>
          <p className="text-white/50 text-sm mt-1 leading-relaxed">
            Professional edge-stitching and finishing for ladies suits. Precision craftsmanship for your wardrobe essentials.
          </p>
        </div>
      </div>

      {/* Main Address / Contact Card */}
      <div
        ref={cardRef}
        id="contact-address-card"
        className="glass rounded-3xl p-8 md:p-12 w-full max-w-2xl text-center"
        style={{
          border: '1px solid rgba(255,215,0,0.15)',
          boxShadow: '0 20px 80px rgba(255,215,0,0.08), 0 0 0 1px rgba(255,215,0,0.05)',
        }}
      >
        {/* Store name */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: 'linear-gradient(135deg, #FFD700, #FF69B4)', boxShadow: '0 0 30px rgba(255,215,0,0.3)' }}
        >
          <span className="text-black font-black text-xl">M</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black gradient-text mb-2">
          MashaAllah Bangles
        </h2>
        <h2 className="text-3xl md:text-4xl font-black text-white/30 mb-8">
          & Cosmetics
        </h2>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/10" />
          <div className="w-2 h-2 rounded-full" style={{ background: '#FFD700', boxShadow: '0 0 8px #FFD700' }} />
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Address */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-px bg-[#FFD700]" />
            <span className="text-[#FFD700] text-xs tracking-widest uppercase font-semibold">Our Location</span>
            <div className="w-5 h-px bg-[#FFD700]" />
          </div>
          <p className="text-white/80 text-lg font-light leading-relaxed">
            Main Circular Road,<br />
            <span className="text-white font-semibold">She Shop Wali Gali,</span><br />
            Shujabad
          </p>
        </div>

        {/* About us tag cloud */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Bangles', 'Cosmetics', 'Perfumes', 'Jewellery', 'Pikoo Service'].map(tag => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider"
              style={{
                background: 'rgba(255,215,0,0.06)',
                border: '1px solid rgba(255,215,0,0.2)',
                color: 'rgba(255,215,0,0.7)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* About us text */}
        <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto">
          Discover all varieties of bangles including Metal, Kundan, Glass, Wedding Sets & Daily Wear. We also offer Cosmetics, Imported Perfumes, Artificial Jewellery, and professional Ladies Suit Pikoo service.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-white/20 text-xs tracking-widest">
          © 2025 MashaAllah Bangles & Cosmetics — All rights reserved
        </p>
      </div>
    </section>
  )
}
