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
              { id: 'wa', href: `https://wa.me/923017506498`, icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
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
