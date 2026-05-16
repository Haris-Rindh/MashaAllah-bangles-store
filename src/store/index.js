// ─── MashaAllah Bangles — Hybrid Store ────────────────────────────────────────
// Products, Orders, Categories → Firestore (live, shared across all browsers)
// Cart, Wishlist, Auth         → localStorage (per-device, instant)
// Images                       → Cloudinary (permanent cloud URLs)
// ──────────────────────────────────────────────────────────────────────────────

import { db } from '../firebase'
import {
  collection, doc, getDocs, getDoc,
  addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp,
  onSnapshot
} from 'firebase/firestore'

export const WHATSAPP = '923017506498'

// ── Cloudinary ────────────────────────────────────────────────────────────────
export const CLOUDINARY_CLOUD = 'dggmp5guh'
export const CLOUDINARY_PRESET = 'mashaallah_unsigned' // unsigned upload preset name

/**
 * Upload a File object to Cloudinary and return the secure URL.
 * Uses the unsigned upload preset so no API secret is exposed on frontend.
 */
export async function uploadToCloudinary(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_PRESET)
  formData.append('folder', 'mashaallah-products')

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
    { method: 'POST', body: formData }
  )
  if (!res.ok) throw new Error('Cloudinary upload failed')
  const data = await res.json()
  return data.secure_url
}

// ── Firestore: Categories ─────────────────────────────────────────────────────
const DEFAULT_CATS = [
  { id: 'cat1', slug: 'jewellery', label: 'Jewellery', subcats: [{slug:'bridal-heavy',label:'Bridal Heavy Set'},{slug:'light-bridal',label:'Light Bridal Set'},{slug:'gold-necklace',label:'Gold Necklace'},{slug:'silver',label:'Silver Jewellery'},{slug:'pearl-necklace',label:'Pearl Necklace'},{slug:'stone-studded',label:'Stone Studded'},{slug:'choker',label:'Choker Necklace'},{slug:'long-chain',label:'Long Chain'},{slug:'stud',label:'Stud Earrings'},{slug:'jhumka',label:'Jhumka Earrings'},{slug:'fancy-rings',label:'Fancy Rings'},{slug:'anklets',label:'Anklets (Payal)'},{slug:'nose-ring',label:'Nose Ring (Nath)'},{slug:'kids',label:'Kids Jewellery'}] },
  { id: 'cat2', slug: 'bangles',   label: 'Bangles',   subcats: [{slug:'bridal-heavy',label:'Bridal Heavy'},{slug:'fancy',label:'Fancy Set'},{slug:'wedding',label:'Wedding Bangles'},{slug:'luxury',label:'Luxury'},{slug:'designer',label:'Designer'},{slug:'glass',label:'Glass (Chooriyan)'},{slug:'metal-gold',label:'Metal Gold'},{slug:'silver',label:'Silver'},{slug:'lac',label:'Lac Bangles'},{slug:'stone',label:'Stone'},{slug:'silk',label:'Silk Thread'},{slug:'daily',label:'Daily Wear'},{slug:'adjustable',label:'Adjustable'},{slug:'kids',label:'Kids'}] },
  { id: 'cat3', slug: 'cosmetics', label: 'Cosmetics', subcats: [{slug:'bridal-kit',label:'Bridal Kit'},{slug:'pro-kit',label:'Pro Kit'},{slug:'foundation',label:'Foundation'},{slug:'compact',label:'Compact Powder'},{slug:'concealer',label:'Concealer'},{slug:'matte-lip',label:'Matte Lipsticks'},{slug:'gloss',label:'Gloss'},{slug:'eyeliner',label:'Eyeliner'},{slug:'mascara',label:'Mascara'},{slug:'blush',label:'Blush'},{slug:'face-wash',label:'Face Wash'},{slug:'creams',label:'Face Creams'},{slug:'lotion',label:'Whitening Lotion'},{slug:'sunscreen',label:'Sunscreen'},{slug:'serum',label:'Beauty Serum'}] },
  { id: 'cat4', slug: 'perfumes',  label: 'Perfumes',  subcats: [{slug:'arabic',label:'Arabic Luxury'},{slug:'oud',label:'Oud Perfume'},{slug:'bridal-box',label:'Bridal Box'},{slug:'gift-set',label:'Gift Set'},{slug:'floral',label:'Floral'},{slug:'rose',label:'Rose'},{slug:'vanilla',label:'Vanilla'},{slug:'body-mist',label:'Body Mist'},{slug:'attar',label:'Roll-On Attar'},{slug:'pocket',label:'Pocket Mini'},{slug:'unisex',label:'Unisex'},{slug:'daily',label:'Daily Spray'}] },
  { id: 'cat5', slug: 'baby',      label: 'Baby Care', subcats: [{slug:'lotion',label:'Baby Lotion'},{slug:'shampoo',label:'Baby Shampoo'},{slug:'oil',label:'Baby Oil'},{slug:'powder',label:'Baby Powder'},{slug:'soap',label:'Baby Soap'},{slug:'gift-kit',label:'Gift Kit'},{slug:'bath-kit',label:'Bath Kit'},{slug:'newborn',label:'Newborn Box'},{slug:'wipes',label:'Baby Wipes'},{slug:'diaper',label:'Diaper Pack'}] },
  { id: 'cat6', slug: 'clothing',  label: 'Clothing',  subcats: [{slug:'bunyan',label:'Ladies Bunyan'},{slug:'bras',label:'Bras Collection'},{slug:'sports-bra',label:'Sports Bra'},{slug:'innerwear-set',label:'Innerwear Set'},{slug:'undergarments',label:'Undergarments'}] }
]

// Async: fetch categories from Firestore, seed defaults if empty
export async function getCategories() {
  try {
    const snap = await getDocs(collection(db, 'categories'))
    if (snap.empty) {
      // Seed defaults on first run
      for (const cat of DEFAULT_CATS) {
        await setDoc(doc(db, 'categories', cat.id), cat)
      }
      return DEFAULT_CATS
    }
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.error('getCategories error:', e)
    return DEFAULT_CATS
  }
}

export async function saveCategories(cats) {
  try {
    // Delete all existing and re-write (simple approach for small data)
    const snap = await getDocs(collection(db, 'categories'))
    for (const d of snap.docs) await deleteDoc(d.ref)
    for (const cat of cats) {
      await setDoc(doc(db, 'categories', cat.id || ('cat' + Date.now())), cat)
    }
  } catch (e) {
    console.error('saveCategories error:', e)
  }
}

// ── Firestore: Products ───────────────────────────────────────────────────────
const SEED_PRODUCTS = [
  { id:'p1', name:'Bridal Heavy Bangles Set',  category:'bangles',   subcategory:'bridal-heavy',  price:2500, originalPrice:3000, image:'images (1).jpeg', image2:'images (4).jpeg', description:'Exquisite bridal heavy bangles with intricate gold-toned design.', inStock:true, featured:true,  badge:'Bestseller' },
  { id:'p2', name:'Gold Plated Necklace Set',  category:'jewellery', subcategory:'gold-necklace', price:1800, originalPrice:2200, image:'images (2).jpeg', image2:'images (5).jpeg', description:'Stunning gold plated necklace set with matching earrings.',           inStock:true, featured:true,  badge:'New' },
  { id:'p3', name:'Bridal Makeup Kit',         category:'cosmetics', subcategory:'bridal-kit',    price:3200, originalPrice:4000, image:'images (3).jpeg', image2:'images (6).jpeg', description:'Complete professional bridal makeup kit.',                           inStock:true, featured:true,  badge:'Sale' },
  { id:'p4', name:'Arabic Luxury Perfume',     category:'perfumes',  subcategory:'arabic',        price:1500, originalPrice:1800, image:'images (7).jpeg', image2:'images (10).jpeg',description:'Rich long-lasting Arabic luxury perfume with oud notes.',           inStock:true, featured:false },
  { id:'p5', name:'Glass Bangles (Chooriyan)', category:'bangles',   subcategory:'glass',         price:650,  originalPrice:800,  image:'images (8).jpeg', image2:'images (1).jpeg', description:'Traditional vibrant glass bangles in assorted colors.',             inStock:true, featured:false },
  { id:'p6', name:'Stone Studded Bangles',     category:'bangles',   subcategory:'stone',         price:1200, originalPrice:1500, image:'images (9).jpeg', image2:'images (3).jpeg', description:'Elegant stone studded bangles with sparkling gems.',                inStock:true, featured:true },
  { id:'p7', name:'Pearl Necklace Set',        category:'jewellery', subcategory:'pearl-necklace',price:2100, originalPrice:2500, image:'images (10).jpeg',image2:'images (2).jpeg', description:'Classic pearl necklace set — timeless elegance.',                   inStock:true, featured:false },
  { id:'p8', name:'Silk Thread Bangles',       category:'bangles',   subcategory:'silk',          price:850,  originalPrice:1000, image:'images (6).jpeg', image2:'images (8).jpeg', description:'Handcrafted silk thread bangles with embroidery.',                  inStock:true, featured:false },
  { id:'p9', name:'Lac Bangles',               category:'bangles',   subcategory:'lac',           price:750,  originalPrice:900,  image:'images (4).jpeg', image2:'images (9).jpeg', description:'Beautiful traditional lac bangles with mirror work.',               inStock:true, featured:false },
  { id:'p10',name:'Matte Lipstick Set',        category:'cosmetics', subcategory:'matte-lip',     price:950,  originalPrice:1200, image:'images (5).jpeg', image2:'images (3).jpeg', description:'Long-wearing matte lipstick set in 6 gorgeous shades.',            inStock:true, featured:false },
]

// Async: fetch all products from Firestore
export async function getProducts() {
  try {
    const snap = await getDocs(collection(db, 'products'))
    if (snap.empty) {
      // Seed defaults on first run
      for (const p of SEED_PRODUCTS) {
        await setDoc(doc(db, 'products', p.id), { ...p, createdAt: Date.now() })
      }
      return SEED_PRODUCTS
    }
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.error('getProducts error:', e)
    return []
  }
}

// Real-time listener: calls callback(products[]) whenever Firestore changes
export function onProductsSnapshot(callback) {
  return onSnapshot(collection(db, 'products'), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

export async function getProductById(id) {
  try {
    const snap = await getDoc(doc(db, 'products', id))
    if (snap.exists()) return { id: snap.id, ...snap.data() }
    return null
  } catch (e) {
    console.error('getProductById error:', e)
    return null
  }
}

export async function addProduct(p) {
  try {
    const id = 'p' + Date.now()
    const data = { ...p, id, createdAt: Date.now() }
    await setDoc(doc(db, 'products', id), data)
    return data
  } catch (e) {
    console.error('addProduct error:', e)
    throw e
  }
}

export async function updateProduct(id, updates) {
  try {
    await updateDoc(doc(db, 'products', id), { ...updates, updatedAt: Date.now() })
  } catch (e) {
    console.error('updateProduct error:', e)
    throw e
  }
}

export async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, 'products', id))
  } catch (e) {
    console.error('deleteProduct error:', e)
    throw e
  }
}

export async function getByCategory(cat) {
  try {
    const q = query(collection(db, 'products'), where('category', '==', cat.toLowerCase()))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.error('getByCategory error:', e)
    return []
  }
}

export async function searchProducts(qStr) {
  // Firestore doesn't support full-text search natively — fetch all and filter client-side
  const all = await getProducts()
  const t = qStr.toLowerCase()
  return all.filter(p =>
    p.name.toLowerCase().includes(t) ||
    (p.category || '').includes(t) ||
    (p.description || '').toLowerCase().includes(t)
  )
}

// ── Firestore: Orders ─────────────────────────────────────────────────────────
export async function getOrders() {
  try {
    const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')))
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.error('getOrders error:', e)
    return []
  }
}

export function onOrdersSnapshot(callback) {
  return onSnapshot(
    query(collection(db, 'orders'), orderBy('createdAt', 'desc')),
    snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  )
}

export async function saveOrder(order) {
  try {
    const id = 'ORD-' + Date.now()
    const u = getCurrentUser()
    const data = {
      ...order,
      id,
      status: 'pending',
      createdAt: Date.now(),
      ...(u ? { userId: u.id } : {})
    }
    await setDoc(doc(db, 'orders', id), data)
    return data
  } catch (e) {
    console.error('saveOrder error:', e)
    throw e
  }
}

export async function updateStatus(id, status) {
  try {
    await updateDoc(doc(db, 'orders', id), { status })
  } catch (e) {
    console.error('updateStatus error:', e)
    throw e
  }
}

export async function getUserOrders() {
  const u = getCurrentUser()
  if (!u) return []
  try {
    const q = query(collection(db, 'orders'), where('userId', '==', u.id))
    const snap = await getDocs(q)
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => b.createdAt - a.createdAt)
  } catch (e) {
    console.error('getUserOrders error:', e)
    return []
  }
}

// ── Firestore: Users ──────────────────────────────────────────────────────────
export async function getUsers() {
  try {
    const snap = await getDocs(collection(db, 'users'))
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.error('getUsers error:', e)
    return []
  }
}

export async function registerUser(name, email, password) {
  const users = await getUsers()
  if (users.find(u => u.email === email)) throw new Error('Email already registered')
  const id = 'U' + Date.now()
  const newUser = { id, name, email, password, createdAt: Date.now() }
  await setDoc(doc(db, 'users', id), newUser)
  return newUser
}

export async function loginUser(email, password) {
  const users = await getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid email or password')
  localStorage.setItem('mab_currentUser', JSON.stringify(user))
  // Migrate guest cart
  const guestCart = JSON.parse(localStorage.getItem('mab_cart') || '[]')
  if (guestCart.length > 0) {
    localStorage.setItem('mab_cart_' + user.id, JSON.stringify(guestCart))
    localStorage.removeItem('mab_cart')
  }
  return user
}

export function logoutUser() { localStorage.removeItem('mab_currentUser') }
export function getCurrentUser() { return JSON.parse(localStorage.getItem('mab_currentUser') || 'null') }

// ── localStorage: Cart ────────────────────────────────────────────────────────
function getCartKey() { const u = getCurrentUser(); return u ? 'mab_cart_' + u.id : 'mab_cart' }
export function getCart()    { return JSON.parse(localStorage.getItem(getCartKey()) || '[]') }
function saveCart(c)         { localStorage.setItem(getCartKey(), JSON.stringify(c)) }

export function addToCart(id, qty = 1) {
  const cart = getCart()
  const i = cart.findIndex(x => x.id === id)
  if (i > -1) cart[i].qty += qty
  else {
    // Try to get product from localStorage cache first
    const cached = JSON.parse(localStorage.getItem('mab_products_cache') || '[]')
    const p = cached.find(x => x.id === id)
    if (p) cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty, category: p.category })
  }
  saveCart(cart)
}

export function removeFromCart(id) { saveCart(getCart().filter(i => i.id !== id)) }
export function updateQty(id, qty) { if (qty < 1) return removeFromCart(id); saveCart(getCart().map(i => i.id === id ? { ...i, qty } : i)) }
export function cartTotal()  { return getCart().reduce((s, i) => s + i.price * i.qty, 0) }
export function cartCount()  { return getCart().reduce((s, i) => s + i.qty, 0) }
export function clearCart()  { saveCart([]) }

// ── localStorage: Wishlist ────────────────────────────────────────────────────
function getWishlistKey() { const u = getCurrentUser(); return u ? 'mab_wishlist_' + u.id : 'mab_wishlist' }
export function getWishlist()    { return JSON.parse(localStorage.getItem(getWishlistKey()) || '[]') }
export function toggleWishlist(id) {
  const w = getWishlist()
  const i = w.indexOf(id)
  if (i > -1) w.splice(i, 1); else w.push(id)
  localStorage.setItem(getWishlistKey(), JSON.stringify(w))
  return i === -1
}
export function isWishlisted(id) { return getWishlist().includes(id) }

// ── WhatsApp Order Builder ────────────────────────────────────────────────────
export function buildWAOrder(customer, cart) {
  const baseUrl = window.location.origin
  const items = cart.map(i => {
    const prodLink = `\n  Link: ${baseUrl}/product/${i.id}`
    return `• ${i.name} x${i.qty} = PKR ${(i.price * i.qty).toLocaleString()}${prodLink}`
  }).join('\n\n')
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const msg = `🌸 *New Order — MashaAllah Bangles & Cosmetic*\n\n*Customer:* ${customer.name}\n*Phone:* ${customer.phone}\n*Address:* ${customer.address}, ${customer.city}\n\n*Items:*\n${items}\n\n*Total: PKR ${total.toLocaleString()}*\n\n_Order placed via website_`
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
}

// ── Utilities ─────────────────────────────────────────────────────────────────
export const fmt      = n => 'PKR ' + Number(n).toLocaleString()
export const discount = (orig, sale) => orig > sale ? Math.round((1 - sale / orig) * 100) + '% off' : ''

// Smart image resolver: Cloudinary URLs are full https:// URLs, local assets start with /
export const img = name => {
  if (!name) return ''
  if (name.startsWith('http://') || name.startsWith('https://') || name.startsWith('data:')) return name
  return '/' + name
}

// ── Products cache helper (keeps addToCart working without async) ──────────────
export function cacheProducts(products) {
  try {
    localStorage.setItem('mab_products_cache', JSON.stringify(
      products.map(p => ({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category }))
    ))
  } catch (e) { /* Storage full — ignore */ }
}

// ── Default export (for legacy code compatibility) ────────────────────────────
export default {
  getCategories, saveCategories,
  getProducts, onProductsSnapshot, getProductById, addProduct, updateProduct, deleteProduct, getByCategory, searchProducts, cacheProducts,
  getOrders, onOrdersSnapshot, saveOrder, updateStatus, getUserOrders,
  getUsers, registerUser, loginUser, logoutUser, getCurrentUser,
  getCart, addToCart, removeFromCart, updateQty, cartTotal, cartCount, clearCart,
  getWishlist, toggleWishlist, isWishlisted,
  buildWAOrder, fmt, discount, img,
  uploadToCloudinary, CLOUDINARY_CLOUD, CLOUDINARY_PRESET
}
