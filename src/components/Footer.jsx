import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-swa-dark text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-16 pt-16 pb-0 grid grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="col-span-2 lg:col-span-1">
          <p className="font-display text-2xl uppercase tracking-[.15em] mb-4">MashaAllah</p>
          <p className="text-white/70 text-[10px] uppercase tracking-widest leading-loose mb-6">Premium bangles, jewellery, cosmetics &amp; perfumes — crafted for the modern woman.</p>
          <div className="flex gap-5">
            {[
              <svg key="ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
              <svg key="fb" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
              <svg key="tt" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77-.39 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>,
            ].map((icon, i) => (
              <a key={i} href="#" className="text-white/70 hover:text-white hover:-translate-y-0.5 transition-all">{icon}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[.2em] mb-4">Quick Links</h4>
          <ul className="space-y-3">
            {[['All Products','/products'],['Bangles','/category/bangles'],['Jewellery','/category/jewellery'],['Cosmetics','/category/cosmetics'],['Search','/search']].map(([l,h])=>(
              <li key={h}><Link to={h} className="text-white/70 text-[10px] uppercase tracking-widest hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[.2em] mb-4">Customer Service</h4>
          <ul className="space-y-3">
            {['FAQ','Shipping & Returns','Track Order','Contact Us'].map(l=>(
              <li key={l}><a href="#" className="text-white/70 text-[10px] uppercase tracking-widest hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[.2em] mb-4">Admin</h4>
          <ul className="space-y-3">
            {[['Dashboard','/admin'],['Products','/admin/products'],['Orders','/admin/orders']].map(([l,h])=>(
              <li key={h}><Link to={h} className="text-white/70 text-[10px] uppercase tracking-widest hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 py-6 text-center">
        <p className="text-white/50 text-[9px] uppercase tracking-widest">© 2025 MashaAllah Bangles &amp; Cosmetic. All rights reserved.</p>
      </div>
    </footer>
  )
}
