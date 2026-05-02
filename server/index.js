import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mashaallah')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Seed initial products if DB is empty
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Seeding initial products from data/products.js equivalents...');
      const seedProducts = [
        { name: 'Metal Bangle Set', category: 'Bangles', description: 'Classic brass set of 6 bangles.', regularPrice: 850, images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&auto=format'] },
        { name: 'Kundan Bridal Set', category: 'Bangles', description: 'Handcrafted Kundan artistry.', regularPrice: 2200, images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&auto=format'] },
        { name: 'Glass Bangles (12pc)', category: 'Bangles', description: 'Vibrant multi-color glass bangles.', regularPrice: 350, images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&auto=format'] },
        { name: 'HD Matte Foundation', category: 'Cosmetics', description: 'Full coverage 24-hour wear foundation.', regularPrice: 1800, images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&auto=format'] },
        { name: 'Oud Al Layl', category: 'Perfumes', description: 'Rich Arabic Oud.', regularPrice: 4500, discountPrice: 4000, images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&auto=format'] },
        { name: 'Kundan Necklace', category: 'Jewellery', description: 'Traditional Kundan necklace.', regularPrice: 3200, images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&auto=format'] },
      ];
      await Product.insertMany(seedProducts);
      console.log('Seeded products successfully!');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
