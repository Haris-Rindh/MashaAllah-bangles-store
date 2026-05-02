import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingBag, Menu, X, Plus } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F5EDE0] font-sans">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-[#3A3029]/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#FDFBF7] border-r border-[#E5D7CA] 
        transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-[#E5D7CA]/50">
            <h2 className="text-xl font-semibold text-[#5C4D43] tracking-wide font-serif">MashaAllah</h2>
            <button className="lg:hidden text-[#8B7355]" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavLink 
              to="/admin/products"
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${isActive 
                  ? 'bg-[#C9906A] text-white shadow-md shadow-[#C9906A]/20' 
                  : 'text-[#8B7355] hover:bg-[#F5EDE0] hover:text-[#5C4D43]'}
              `}
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Products</span>
            </NavLink>
            <NavLink 
              to="/admin/add-product"
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${isActive 
                  ? 'bg-[#C9906A] text-white shadow-md shadow-[#C9906A]/20' 
                  : 'text-[#8B7355] hover:bg-[#F5EDE0] hover:text-[#5C4D43]'}
              `}
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Product</span>
            </NavLink>
            <NavLink 
              to="/admin/orders"
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${isActive 
                  ? 'bg-[#C9906A] text-white shadow-md shadow-[#C9906A]/20' 
                  : 'text-[#8B7355] hover:bg-[#F5EDE0] hover:text-[#5C4D43]'}
              `}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Orders</span>
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="lg:hidden bg-[#FDFBF7] border-b border-[#E5D7CA] p-4 flex items-center shadow-sm relative z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-[#8B7355] hover:bg-[#F5EDE0] rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-3 font-semibold text-[#5C4D43] font-serif">Admin Panel</span>
        </header>
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
