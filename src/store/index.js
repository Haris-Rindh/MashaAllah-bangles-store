// localStorage-based store — no backend required
const KEYS = { products:'mab_products', cart:'mab_cart', orders:'mab_orders', wishlist:'mab_wishlist', categories:'mab_categories' }
export const WHATSAPP = '923017506498'

const DEFAULT_CATS = [
  { id: 'cat1', slug: 'jewellery', label: 'Jewellery', subcats: [{slug:'bridal-heavy',label:'Bridal Heavy Set'},{slug:'light-bridal',label:'Light Bridal Set'},{slug:'gold-necklace',label:'Gold Necklace'},{slug:'silver',label:'Silver Jewellery'},{slug:'pearl-necklace',label:'Pearl Necklace'},{slug:'stone-studded',label:'Stone Studded'},{slug:'choker',label:'Choker Necklace'},{slug:'long-chain',label:'Long Chain'},{slug:'stud',label:'Stud Earrings'},{slug:'jhumka',label:'Jhumka Earrings'},{slug:'fancy-rings',label:'Fancy Rings'},{slug:'anklets',label:'Anklets (Payal)'},{slug:'nose-ring',label:'Nose Ring (Nath)'},{slug:'kids',label:'Kids Jewellery'}] },
  { id: 'cat2', slug: 'bangles', label: 'Bangles', subcats: [{slug:'bridal-heavy',label:'Bridal Heavy'},{slug:'fancy',label:'Fancy Set'},{slug:'wedding',label:'Wedding Bangles'},{slug:'luxury',label:'Luxury'},{slug:'designer',label:'Designer'},{slug:'glass',label:'Glass (Chooriyan)'},{slug:'metal-gold',label:'Metal Gold'},{slug:'silver',label:'Silver'},{slug:'lac',label:'Lac Bangles'},{slug:'stone',label:'Stone'},{slug:'silk',label:'Silk Thread'},{slug:'daily',label:'Daily Wear'},{slug:'adjustable',label:'Adjustable'},{slug:'kids',label:'Kids'}] },
  { id: 'cat3', slug: 'cosmetics', label: 'Cosmetics', subcats: [{slug:'bridal-kit',label:'Bridal Kit'},{slug:'pro-kit',label:'Pro Kit'},{slug:'foundation',label:'Foundation'},{slug:'compact',label:'Compact Powder'},{slug:'concealer',label:'Concealer'},{slug:'matte-lip',label:'Matte Lipsticks'},{slug:'gloss',label:'Gloss'},{slug:'eyeliner',label:'Eyeliner'},{slug:'mascara',label:'Mascara'},{slug:'blush',label:'Blush'},{slug:'face-wash',label:'Face Wash'},{slug:'creams',label:'Face Creams'},{slug:'lotion',label:'Whitening Lotion'},{slug:'sunscreen',label:'Sunscreen'},{slug:'serum',label:'Beauty Serum'}] },
  { id: 'cat4', slug: 'perfumes', label: 'Perfumes', subcats: [{slug:'arabic',label:'Arabic Luxury'},{slug:'oud',label:'Oud Perfume'},{slug:'bridal-box',label:'Bridal Box'},{slug:'gift-set',label:'Gift Set'},{slug:'floral',label:'Floral'},{slug:'rose',label:'Rose'},{slug:'vanilla',label:'Vanilla'},{slug:'body-mist',label:'Body Mist'},{slug:'attar',label:'Roll-On Attar'},{slug:'pocket',label:'Pocket Mini'},{slug:'unisex',label:'Unisex'},{slug:'daily',label:'Daily Spray'}] },
  { id: 'cat5', slug: 'baby', label: 'Baby Care', subcats: [{slug:'lotion',label:'Baby Lotion'},{slug:'shampoo',label:'Baby Shampoo'},{slug:'oil',label:'Baby Oil'},{slug:'powder',label:'Baby Powder'},{slug:'soap',label:'Baby Soap'},{slug:'gift-kit',label:'Gift Kit'},{slug:'bath-kit',label:'Bath Kit'},{slug:'newborn',label:'Newborn Box'},{slug:'wipes',label:'Baby Wipes'},{slug:'diaper',label:'Diaper Pack'}] },
  { id: 'cat6', slug: 'clothing', label: 'Clothing', subcats: [{slug:'bunyan',label:'Ladies Bunyan'},{slug:'bras',label:'Bras Collection'},{slug:'sports-bra',label:'Sports Bra'},{slug:'innerwear-set',label:'Innerwear Set'},{slug:'undergarments',label:'Undergarments'}] }
]

const SEED = [
  { id:'p1', name:'Bridal Heavy Bangles Set',  category:'bangles',    subcategory:'bridal-heavy',  price:2500, originalPrice:3000, image:'images (1).jpeg', image2:'images (4).jpeg', description:'Exquisite bridal heavy bangles with intricate gold-toned design.', inStock:true, featured:true,  badge:'Bestseller' },
  { id:'p2', name:'Gold Plated Necklace Set',  category:'jewellery',  subcategory:'gold-necklace', price:1800, originalPrice:2200, image:'images (2).jpeg', image2:'images (5).jpeg', description:'Stunning gold plated necklace set with matching earrings.',           inStock:true, featured:true,  badge:'New'        },
  { id:'p3', name:'Bridal Makeup Kit',         category:'cosmetics',  subcategory:'bridal-kit',    price:3200, originalPrice:4000, image:'images (3).jpeg', image2:'images (6).jpeg', description:'Complete professional bridal makeup kit.',                           inStock:true, featured:true,  badge:'Sale'       },
  { id:'p4', name:'Arabic Luxury Perfume',     category:'perfumes',   subcategory:'arabic',        price:1500, originalPrice:1800, image:'images (7).jpeg', image2:'images (10).jpeg',description:'Rich long-lasting Arabic luxury perfume with oud notes.',           inStock:true, featured:false              },
  { id:'p5', name:'Glass Bangles (Chooriyan)', category:'bangles',    subcategory:'glass',         price:650,  originalPrice:800,  image:'images (8).jpeg', image2:'images (1).jpeg', description:'Traditional vibrant glass bangles in assorted colors.',             inStock:true, featured:false              },
  { id:'p6', name:'Stone Studded Bangles',     category:'bangles',    subcategory:'stone',         price:1200, originalPrice:1500, image:'images (9).jpeg', image2:'images (3).jpeg', description:'Elegant stone studded bangles with sparkling gems.',                inStock:true, featured:true               },
  { id:'p7', name:'Pearl Necklace Set',        category:'jewellery',  subcategory:'pearl-necklace',price:2100, originalPrice:2500, image:'images (10).jpeg',image2:'images (2).jpeg', description:'Classic pearl necklace set — timeless elegance.',                   inStock:true, featured:false              },
  { id:'p8', name:'Silk Thread Bangles',       category:'bangles',    subcategory:'silk',          price:850,  originalPrice:1000, image:'images (6).jpeg', image2:'images (8).jpeg', description:'Handcrafted silk thread bangles with embroidery.',                  inStock:true, featured:false              },
  { id:'p9', name:'Lac Bangles',               category:'bangles',    subcategory:'lac',           price:750,  originalPrice:900,  image:'images (4).jpeg', image2:'images (9).jpeg', description:'Beautiful traditional lac bangles with mirror work.',               inStock:true, featured:false              },
  { id:'p10',name:'Matte Lipstick Set',        category:'cosmetics',  subcategory:'matte-lip',     price:950,  originalPrice:1200, image:'images (5).jpeg', image2:'images (3).jpeg', description:'Long-wearing matte lipstick set in 6 gorgeous shades.',            inStock:true, featured:false              },
]

function getCategories() { const s = localStorage.getItem(KEYS.categories); if(!s){localStorage.setItem(KEYS.categories,JSON.stringify(DEFAULT_CATS));return DEFAULT_CATS;} return JSON.parse(s); }
function saveCategories(c) { localStorage.setItem(KEYS.categories, JSON.stringify(c)); }

function getProducts()  { const s = localStorage.getItem(KEYS.products); if(!s){localStorage.setItem(KEYS.products,JSON.stringify(SEED));return SEED;} return JSON.parse(s); }
function saveProducts(l){ localStorage.setItem(KEYS.products, JSON.stringify(l)); }
function addProduct(p)  { const l=getProducts(); p.id='p'+Date.now(); p.createdAt=Date.now(); l.push(p); saveProducts(l); return p; }
function updateProduct(id,u){ saveProducts(getProducts().map(p=>p.id===id?{...p,...u}:p)); }
function deleteProduct(id)  { saveProducts(getProducts().filter(p=>p.id!==id)); }
function getProductById(id) { return getProducts().find(p=>p.id===id); }
function getByCategory(cat) { return getProducts().filter(p=>p.category===cat.toLowerCase()); }
function searchProducts(q)  { const t=q.toLowerCase(); return getProducts().filter(p=>p.name.toLowerCase().includes(t)||p.category.includes(t)||(p.description||'').toLowerCase().includes(t)); }

function getCart()    { return JSON.parse(localStorage.getItem(KEYS.cart)||'[]'); }
function saveCart(c)  { localStorage.setItem(KEYS.cart, JSON.stringify(c)); }
function addToCart(id,qty=1){ const cart=getCart(); const i=cart.findIndex(x=>x.id===id); if(i>-1)cart[i].qty+=qty; else{const p=getProductById(id);if(p)cart.push({id:p.id,name:p.name,price:p.price,image:p.image,qty,category:p.category});} saveCart(cart); }
function removeFromCart(id){ saveCart(getCart().filter(i=>i.id!==id)); }
function updateQty(id,qty){ if(qty<1)return removeFromCart(id); saveCart(getCart().map(i=>i.id===id?{...i,qty}:i)); }
function cartTotal()  { return getCart().reduce((s,i)=>s+i.price*i.qty,0); }
function cartCount()  { return getCart().reduce((s,i)=>s+i.qty,0); }
function clearCart()  { saveCart([]); }

function getOrders()       { return JSON.parse(localStorage.getItem(KEYS.orders)||'[]'); }
function saveOrder(order)  { const orders=getOrders(); order.id='ORD-'+Date.now(); order.createdAt=Date.now(); order.status='pending'; orders.unshift(order); localStorage.setItem(KEYS.orders,JSON.stringify(orders)); return order; }
function updateStatus(id,status){ localStorage.setItem(KEYS.orders,JSON.stringify(getOrders().map(o=>o.id===id?{...o,status}:o))); }

function getWishlist()    { return JSON.parse(localStorage.getItem(KEYS.wishlist)||'[]'); }
function toggleWishlist(id){ const w=getWishlist(); const i=w.indexOf(id); if(i>-1)w.splice(i,1);else w.push(id); localStorage.setItem(KEYS.wishlist,JSON.stringify(w)); return i===-1; }
function isWishlisted(id) { return getWishlist().includes(id); }

function buildWAOrder(customer,cart){ const baseUrl = 'https://mashallahbanglesstore.vercel.app'; const items=cart.map(i=>{ const imgUrl = (i.image && i.image.startsWith('data:')) ? '' : `\n  Image: ${baseUrl}/${i.image}`; return `• ${i.name} x${i.qty} = PKR ${(i.price*i.qty).toLocaleString()}${imgUrl}` }).join('\n\n'); const total=cart.reduce((s,i)=>s+i.price*i.qty,0); const msg=`🌸 *New Order — MashaAllah Bangles & Cosmetic*\n\n*Customer:* ${customer.name}\n*Phone:* ${customer.phone}\n*Address:* ${customer.address}, ${customer.city}\n\n*Items:*\n${items}\n\n*Total: PKR ${total.toLocaleString()}*\n\n_Order placed via website_`; return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`; }

export const fmt      = n => 'PKR ' + Number(n).toLocaleString()
export const discount = (orig,sale) => orig>sale ? Math.round((1-sale/orig)*100)+'% off' : ''
export const img      = name => `/${name}`   // images served from public (assests folder)

export default { getCategories,saveCategories,getProducts,addProduct,updateProduct,deleteProduct,getProductById,getByCategory,searchProducts,getCart,addToCart,removeFromCart,updateQty,cartTotal,cartCount,clearCart,getOrders,saveOrder,updateStatus,getWishlist,toggleWishlist,isWishlisted,buildWAOrder,fmt,discount,img }
