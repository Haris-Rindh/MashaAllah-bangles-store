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
              { id: 'wa', href: `https://wa.me/923017506498`, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M16 14.5c0 .3-.1.6-.3.9a3.15 3.15 0 0 1-2.1.8c-.8 0-1.8-.4-2.8-1-1.3-.8-2.6-2.1-3.4-3.4-.6-1-1-2-1-2.8a3.15 3.15 0 0 1 .8-2.1c.3-.2.6-.3.9-.3h.2c.2 0 .5.1.7.5.3.6.8 1.8.8 2 0 .2 0 .4-.2.6l-.4.5c-.2.2-.2.4 0 .6.4.7.9 1.2 1.6 1.6.2.2.4.2.6 0l.5-.4c.2-.2.4-.2.6-.2.2 0 1.4.5 2 .8.4.2.5.5.7z"/></svg> },
              { id: 'ig', href: '#', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
              { id: 'fb', href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { id: 'tt', href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77-.39 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg> },
            ].map((social) => (
              <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:-translate-y-0.5 transition-all">{social.icon}</a>
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
