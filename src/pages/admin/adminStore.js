/**
 * Admin Product Store
 * Uses localStorage to persist products added via the Admin panel,
 * merged on top of the static products.js catalog.
 */
import { PRODUCTS as STATIC_PRODUCTS } from '../../data/products'

const KEY = 'masha_admin_products'

function loadAdminProducts() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

function saveAdminProducts(products) {
  localStorage.setItem(KEY, JSON.stringify(products))
}

export function getAllProducts() {
  const adminOnes = loadAdminProducts()
  return [...STATIC_PRODUCTS, ...adminOnes]
}

export function getAdminProducts() {
  return loadAdminProducts()
}

export function addProduct(product) {
  const existing = loadAdminProducts()
  const newProduct = {
    ...product,
    _id: `admin_${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  saveAdminProducts([...existing, newProduct])
  return newProduct
}

export function deleteProduct(id) {
  const existing = loadAdminProducts()
  saveAdminProducts(existing.filter(p => p._id !== id))
}

export function updateProduct(id, updates) {
  const existing = loadAdminProducts()
  saveAdminProducts(existing.map(p => p._id === id ? { ...p, ...updates } : p))
}
