import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header   from './components/Header'
import Footer   from './components/Footer'
import Home     from './pages/Home'
import Products from './pages/Products'
import Category from './pages/Category'
import Product  from './pages/Product'
import Search   from './pages/Search'
import Cart     from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import Login    from './pages/Login'
import Signup   from './pages/Signup'
import Account  from './pages/Account'
import AdminLayout   from './admin/AdminLayout'
import Dashboard     from './admin/Dashboard'
import AdminProducts from './admin/AdminProducts'
import AdminCategories from './admin/AdminCategories'
import AdminOrders   from './admin/AdminOrders'
import AdminCustomers from './admin/AdminCustomers'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function PageTitle() {
  const loc = useLocation()
  useEffect(() => {
    const titles = {
      '/': 'Home - MashaAllah Bangles & Cosmetic',
      '/products': 'All Products - MashaAllah',
      '/cart': 'Your Bag - MashaAllah',
      '/checkout': 'Checkout - MashaAllah',
      '/search': 'Search - MashaAllah',
      '/wishlist': 'Wishlist - MashaAllah',
      '/login': 'Login - MashaAllah',
      '/signup': 'Sign Up - MashaAllah',
      '/account': 'My Account - MashaAllah',
      '/admin': 'Admin Dashboard - MashaAllah'
    }
    const base = titles[loc.pathname] || 'MashaAllah Bangles & Cosmetic'
    document.title = base
  }, [loc.pathname])
  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function StoreFront() {
  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path="/"                 element={<Home/>}/>
          <Route path="/products"         element={<Products/>}/>
          <Route path="/category/:cat"    element={<Category/>}/>
          <Route path="/product/:id"      element={<Product/>}/>
          <Route path="/search"           element={<Search/>}/>
          <Route path="/cart"             element={<Cart/>}/>
          <Route path="/checkout"         element={<Checkout/>}/>
          <Route path="/wishlist"         element={<Wishlist/>}/>
          <Route path="/login"            element={<Login/>}/>
          <Route path="/signup"           element={<Signup/>}/>
          <Route path="/account"          element={<Account/>}/>
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PageTitle />
      <ScrollToTop />
      <CartProvider>
        <Routes>
          <Route path="/admin" element={<AdminLayout/>}>
            <Route index           element={<Dashboard/>}/>
            <Route path="products" element={<AdminProducts/>}/>
            <Route path="categories" element={<AdminCategories/>}/>
            <Route path="orders"   element={<AdminOrders/>}/>
            <Route path="customers" element={<AdminCustomers/>}/>
          </Route>
          <Route path="/*" element={<StoreFront/>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
