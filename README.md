# MashaAllah Bangles and Cosmetics

A full-stack e-commerce web application for MashaAllah Bangles and Cosmetics, a retail store located at Main Circular Road, She Shop Wali Gali, Shujabad, Pakistan. The store sells Bangles, Cosmetics, Perfumes, Jewellery, and offers a ladies-suit stitching and finishing service called Pikoo.

Ordering is handled entirely through WhatsApp. There is no payment gateway. The frontend is a React single-page application and the backend is a separate Node.js and Express server with MongoDB and Cloudinary for image storage.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Routes](#available-routes)
- [Admin Panel](#admin-panel)
- [Product Data](#product-data)
- [State Management](#state-management)
- [Design System](#design-system)
- [Backend API](#backend-api)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Known Limitations](#known-limitations)

---

## Project Structure

```
MashaAllah bangles/
|
|-- src/                          Frontend React application
|   |-- App.jsx                   Root router, layout wrappers
|   |-- main.jsx                  ReactDOM entry point
|   |-- config.js                 Centralized app constants (WhatsApp number, PIN)
|   |-- index.css                 Global design tokens and custom classes
|   |
|   |-- assets/                   Static images and icons
|   |-- context/
|   |   `-- CartContext.jsx       Global cart state using useReducer
|   |-- data/
|   |   `-- products.js           Static product catalogue (18 products) and CATEGORIES array
|   |-- store/
|   |   `-- productStore.js       Unified product store merging static and admin-added products
|   |-- components/
|   |   |-- Navbar.jsx
|   |   |-- CartDrawer.jsx
|   |   |-- ProductCard.jsx
|   |   |-- Toast.jsx
|   |   `-- ErrorBoundary.jsx
|   |-- sections/                 Scroll-driven homepage sections
|   |   |-- PikooSection.jsx
|   |   `-- (other section files)
|   `-- pages/
|       |-- LandingPage.jsx       Homepage with GSAP animations and Lenis smooth scroll
|       |-- ShopCatalog.jsx       Filterable product grid
|       |-- ProductDetail.jsx     Individual product page
|       |-- NotFound.jsx          404 page
|       `-- admin/
|           |-- AdminLayout.jsx   Sidebar shell with PIN authentication gate
|           |-- ProductList.jsx   Product inventory table
|           |-- AddProductForm.jsx  Add product form with base64 image persistence
|           |-- OrderList.jsx     WhatsApp order tracker
|           `-- adminStore.js     Legacy store (superseded by productStore.js)
|
|-- server/                       Backend Node.js and Express server
|   |-- index.js                  Entry point, MongoDB connection, product seeding
|   |-- .env                      Environment variables (not committed to git)
|   |-- models/
|   |   |-- Product.js            Mongoose schema with auto discount calculation
|   |   `-- Order.js
|   `-- routes/
|       |-- productRoutes.js      GET, POST, DELETE /api/products with Cloudinary upload
|       `-- orderRoutes.js
|
|-- public/                       Static public assets
|-- vercel.json                   Vercel SPA rewrite rule
|-- vite.config.js
|-- tailwind.config.js
`-- package.json
```

---

## Tech Stack

### Frontend

| Package | Version | Purpose |
|---|---|---|
| React | 19.2.5 | UI framework |
| Vite | 8.0.10 | Build tool and dev server |
| React Router DOM | 7.14.2 | Client-side routing |
| GSAP + @gsap/react | 3.15.0 | Scroll-triggered entrance animations |
| Lenis | 1.3.23 | Smooth scroll on the landing page |
| Three.js | 0.184.0 | 3D rendering capability (imported) |
| @react-three/fiber | 9.6.1 | React renderer for Three.js |
| @react-three/drei | 10.7.7 | Three.js helpers and abstractions |
| Lucide React | 1.14.0 | Icon set used in the admin panel |
| Tailwind CSS | 3.4.19 | Utility classes used in the admin panel |

The storefront uses vanilla CSS with a custom design system defined in `index.css`. The admin panel uses Tailwind CSS utility classes.

### Backend

| Package | Version | Purpose |
|---|---|---|
| Express | 4.21.2 | HTTP server and routing |
| Mongoose | 8.10.1 | MongoDB object modelling |
| Cloudinary | 2.5.1 | Cloud image hosting and transformation |
| Multer | 1.4.5-lts.1 | Multipart form data parsing |
| multer-storage-cloudinary | 4.0.0 | Cloudinary upload stream for Multer |
| dotenv | 16.4.7 | Environment variable loading |
| cors | 2.8.5 | Cross-origin resource sharing headers |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- A MongoDB Atlas connection string (for the backend)
- A Cloudinary account (for image uploads via the backend)

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Start the frontend development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

The storefront runs entirely from static data and localStorage. The backend server is not required for the storefront to function.

### 3. Start the backend server (optional)

The backend is a separate Node.js process in the `server/` directory. It is only required if you want to use the Cloudinary-backed image upload API.

```bash
cd server
node index.js
```

The API server starts on port 5000 by default.

---

## Environment Variables

Create a `.env` file inside the `server/` directory with the following variables. A template file is already present at `server/.env`.

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

The frontend has no environment variables. All frontend configuration is in `src/config.js`.

---

## Available Routes

### Storefront

| Path | Component | Description |
|---|---|---|
| `/` | LandingPage | Hero section, category cards, marquee strip, featured products, and Pikoo service |
| `/shop` | ShopCatalog | Full product catalogue with filter pills and search |
| `/shop?cat=bangles` | ShopCatalog | Pre-filtered by category |
| `/product/:id` | ProductDetail | Single product page with gallery, specifications, and related products |
| `*` | NotFound | 404 page for any unmatched route |

### Admin Panel

| Path | Component | Description |
|---|---|---|
| `/admin` | AdminLayout > ProductList | Protected by PIN gate, shows product inventory |
| `/admin/products` | ProductList | Same as above |
| `/admin/add-product` | AddProductForm | Add a new product |
| `/admin/orders` | OrderList | WhatsApp order tracker |

---

## Admin Panel

### Accessing the Admin Panel

Navigate to `/admin` in the browser. A PIN gate will appear before the dashboard is shown. The default PIN is defined in `src/config.js`.

```js
export const ADMIN_PIN = 'masha2025'
```

Change this value in `src/config.js` before deploying to production. The PIN is stored in `sessionStorage` after a successful login, so it must be re-entered after the browser tab is closed.

To log out, click the Logout button at the bottom of the admin sidebar.

### Adding Products

Products added through the admin panel are saved to `localStorage` under the key `masha_admin_products`. Images are converted to base64 data URLs before saving, so they persist across page refreshes.

Fields available when adding a product:

- Name (required)
- Category: Bangles, Cosmetics, Perfumes, Jewellery, or Pikoo Service
- Tag or label (New, Bestseller, Sale, Trending, Luxury, Festive, Daily, Bridal)
- Regular price in Pakistani Rupees (required)
- Sale price in Pakistani Rupees (optional, triggers discount percentage display)
- Description (required)
- Product images, up to 5 files, stored as base64

Keep image file sizes below 2 MB each for best performance, as large base64 strings can approach the browser's localStorage limit of approximately 5 to 10 MB.

### Deleting Products

Only admin-added products (those with an ID starting with `admin_`) can be deleted from the panel. Static catalogue products cannot be deleted from the UI and must be edited directly in `src/data/products.js`.

---

## Product Data

### Static Catalogue

The main product catalogue is defined in `src/data/products.js`. It contains 18 products across five categories: Bangles, Cosmetics, Perfumes, Jewellery, and Pikoo Service. Each product object has the following shape:

```js
{
  id: 'b1',                         // Unique string ID used in the URL
  name: 'Metal Bangle Set',
  category: 'bangles',              // Lowercase: bangles | cosmetics | perfumes | jewellery | pikoo
  tag: 'Bestseller',
  desc: 'Short description for product cards',
  longDesc: 'Longer description shown on the detail page',
  price: 850,                       // Display price, used for cart calculation
  regularPrice: 850,                // Original price before any discount
  discountPrice: undefined,         // If set, shown as the sale price
  discountPercent: 0,               // Auto-calculated from regularPrice and discountPrice
  color: '#C9906A',                 // Accent color for the card dot
  images: ['url1', 'url2'],         // Array of image URLs, first is the cover
  specs: {                          // Key-value pairs shown in the specifications table
    Material: 'Gold-plated brass',
    Size: 'Standard',
  },
}
```

### Unified Product Store

`src/store/productStore.js` exports functions used by both the storefront and the admin panel to keep data consistent:

| Function | Description |
|---|---|
| `getAllProducts()` | Returns all static catalogue products plus all admin-added products from localStorage |
| `getProductById(id)` | Finds a product by `id` or `_id`, checking both sources |
| `getAdminProducts()` | Returns only the admin-added products from localStorage |
| `addProduct(product)` | Saves a new product to localStorage and returns the saved object |
| `deleteProduct(id)` | Removes an admin-added product from localStorage by ID |
| `updateProduct(id, updates)` | Patches an admin-added product in localStorage |

---

## State Management

### Cart

The shopping cart is managed globally through `CartContext` using the React `useReducer` hook. The provider wraps the entire storefront.

Supported actions: `ADD`, `REMOVE`, `INC`, `DEC`, `CLEAR`, `CLEAR_TOAST`.

The cart state is in-memory only and is cleared when the page is closed or refreshed. Cart totals use `discountPrice` when available, falling back to `price`.

The WhatsApp checkout button in the cart drawer opens a pre-filled WhatsApp message with the item list and total.

### Admin Products

Admin-added products are persisted in `localStorage` under the key `masha_admin_products` as a JSON array. They are read on every call to `getAllProducts()`, so they appear immediately in the shop catalogue after being added without any page reload.

---

## Design System

The storefront uses a hand-crafted CSS design system defined in `src/index.css` with a Soft Cream Elegance palette.

### Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Page background | #FDFBF7 | Main background |
| Rose terracotta | #C9906A | Primary brand colour, buttons, accents |
| Deep gold | #B8762A | Gradient pair used with terracotta |
| Blush pink | #EAB8C8 | Hero collage accents |
| Charcoal | #1C1412 | Primary text |
| Warm brown | #6B5548 | Secondary body text |
| Cream border | #E4D5C8 | All borders and dividers |

### Typography

- Display headings: Playfair Display (serif), loaded from Google Fonts
- Body text: DM Sans (sans-serif), loaded from Google Fonts
- Hero headline size: `clamp(3.2rem, 5.5vw, 5.2rem)` for fluid scaling

### Reusable CSS Classes

| Class | Purpose |
|---|---|
| `.btn-primary` | Filled terracotta gradient pill button with hover lift |
| `.btn-ghost` | Transparent border pill button |
| `.gradient-text` | Terracotta gradient text fill using `background-clip: text` |
| `.ornament` | Small decorative label with side rules |
| `.filter-pill` | Category filter button with active state |
| `.glass-light` | Glassmorphic panel with backdrop blur |
| `.product-card` | Card with hover lift and shadow transition |
| `.thumb` | Image thumbnail with active terracotta border |

---

## Backend API

The Express server exposes a REST API at `http://localhost:5000`. The frontend storefront does not currently call this API. The admin panel's Add Product form saves to localStorage, not to this API.

The API exists for future integration when a persistent, server-backed product database is needed.

### Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/products` | Return all products, sorted by creation date descending |
| POST | `/api/products` | Create a product with Cloudinary image upload (multipart/form-data) |
| DELETE | `/api/products/:id` | Delete a product by MongoDB ObjectId |
| GET | `/api/orders` | Return all orders |
| POST | `/api/orders` | Create an order |

### Product Schema (MongoDB)

```
name            String, required
description     String, required
category        String, enum: Bangles / Cosmetics / Perfumes / Jewellery / Pikoo Service
regularPrice    Number, required, minimum 0
discountPrice   Number, optional
discountPercent Number, auto-calculated in a pre-save hook
images          [String], array of Cloudinary URLs
timestamps      createdAt and updatedAt added automatically
```

### Image Upload

Images are uploaded to Cloudinary under the folder `mashaallah_store/products/` and are automatically resized to a maximum of 1000 x 1000 pixels on upload. Up to 5 images per product are accepted and each file must be under 5 MB.

### Database Seeding

On first startup with an empty database, the server seeds six example products using placeholder image URLs so the API is immediately usable for testing.

---

## Deployment

### Frontend (Vercel)

The frontend is ready for deployment to Vercel. The `vercel.json` file configures a catch-all rewrite so that React Router handles all routes client-side:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

To deploy:

```bash
npm run build
```

Then push to a connected GitHub repository or use the Vercel CLI. No environment variables are required on the Vercel project for the frontend.

### Backend

The backend is a standalone Node.js server and is not configured for Vercel. Deploy it separately to a platform that supports persistent Node.js processes such as Railway, Render, or a VPS.

Set the four required environment variables (`MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) in the hosting platform's environment settings.

Start the server with:

```bash
node server/index.js
```

---

## Configuration

All application-level constants are defined in `src/config.js`. Edit this file to update any of the following without searching through multiple components.

| Constant | Default value | Description |
|---|---|---|
| `WHATSAPP_NUMBER` | 923017506498 | WhatsApp number in international format without the plus sign |
| `STORE_NAME` | MashaAllah Bangles and Cosmetics | Used in WhatsApp messages and admin PIN gate heading |
| `STORE_ADDRESS` | Main Circular Road, She Shop Wali Gali, Shujabad | Used in WhatsApp order messages and the Pikoo booking form |
| `ADMIN_PIN` | masha2025 | PIN required to access the admin panel |

---

## Known Limitations

**Admin products are stored in localStorage only.**
Products added through `/admin/add-product` are saved in the browser's localStorage. They are visible in the shop catalogue and product detail pages but are not synced to the backend database. Clearing the browser's localStorage will remove them permanently.

**Base64 images have a storage limit.**
Product images saved through the admin form are converted to base64 strings and stored in localStorage. The total size of all admin-added products and their images must remain below approximately 5 MB to avoid storage quota errors in the browser.

**The backend API is not connected to the frontend.**
The Express server and its Cloudinary upload pipeline exist but the React application does not call any API endpoints. All product data in the storefront comes from `src/data/products.js` and `localStorage`.

**No admin authentication beyond the PIN gate.**
The admin PIN is stored in plain text in `src/config.js` and checked client-side. This is sufficient for a private local-use admin panel but should not be considered secure against a determined attacker who can inspect the JavaScript bundle.

**Cart is not persisted.**
The shopping cart state is held in React memory and is cleared when the browser tab is closed or refreshed. Items must be re-added after a page reload.

**Smooth scroll only applies to the landing page.**
Lenis smooth scroll is initialised inside `LandingPage.jsx`. Other routes such as `/shop` and `/product/:id` use the browser's default scroll behaviour.
