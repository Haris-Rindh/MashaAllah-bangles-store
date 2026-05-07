/**
 * Unified product store.
 * Merges the static catalogue (data/products.js) with admin-added
 * products that are persisted in localStorage.
 *
 * Used by BOTH the storefront (ShopCatalog, ProductDetail) and the
 * admin panel (ProductList, AddProductForm) so everything stays in sync.
 */
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products'

const KEY = 'masha_admin_products'

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}
function save(products) {
  localStorage.setItem(KEY, JSON.stringify(products))
}

/* ── Public API ─────────────────────────────────────────────────────────── */

/** All products: static catalog + admin-added */
export function getAllProducts() {
  return [...STATIC_PRODUCTS, ...load()]
}

/** Find a single product by id or _id */
export function getProductById(id) {
  return getAllProducts().find(p => p.id === id || p._id === id) || null
}

/** Products added via the admin panel only */
export function getAdminProducts() {
  return load()
}

/** Persist a new admin product. Returns the saved object. */
export function addProduct(product) {
  const existing  = load()
  const newId     = `admin_${Date.now()}`
  const newProduct = {
    ...product,
    id:        newId,   // used by React Router /product/:id
    _id:       newId,   // used by admin panel
    createdAt: new Date().toISOString(),
  }
  save([...existing, newProduct])
  return newProduct
}

/** Remove an admin-added product by id */
export function deleteProduct(id) {
  save(load().filter(p => p._id !== id && p.id !== id))
}

/** Patch an admin-added product */
export function updateProduct(id, updates) {
  save(load().map(p => (p._id === id || p.id === id) ? { ...p, ...updates } : p))
}
