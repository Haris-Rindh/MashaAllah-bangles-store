import { Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import Navbar        from './components/Navbar'
import CartDrawer   from './components/CartDrawer'
import Toast        from './components/Toast'
import LandingPage  from './pages/LandingPage'
import ShopCatalog  from './pages/ShopCatalog'
import ProductDetail from './pages/ProductDetail'
import NotFound     from './pages/NotFound'

// Admin Components
import AdminLayout     from './pages/admin/AdminLayout'
import ProductList     from './pages/admin/ProductList'
import AddProductForm  from './pages/admin/AddProductForm'
import OrderList       from './pages/admin/OrderList'

// Wrapper for Storefront so Navbar/Cart only show here
function StoreFront() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Toast />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F5EDE0' }} />}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Routes>
          {/* Storefront Routes */}
          <Route element={<StoreFront />}>
            <Route path="/"            element={<LandingPage />} />
            <Route path="/shop"        element={<ShopCatalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*"            element={<NotFound />} />
          </Route>

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index           element={<ProductList />} />
            <Route path="products"    element={<ProductList />} />
            <Route path="add-product" element={<AddProductForm />} />
            <Route path="orders"      element={<OrderList />} />
          </Route>
        </Routes>
      </CartProvider>
    </ErrorBoundary>
  )
}

