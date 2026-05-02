import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Bangles', 'Cosmetics', 'Perfumes', 'Jewellery', 'Pikoo Service'],
  },
  regularPrice: {
    type: Number,
    required: [true, 'Regular price is required'],
    min: [0, 'Price must be positive'],
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price must be positive'],
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  images: [{
    type: String, // Cloudinary URLs
    required: true,
  }],
}, { timestamps: true });

// Pre-save hook to calculate discount percentage
productSchema.pre('save', function (next) {
  if (this.discountPrice && this.discountPrice < this.regularPrice) {
    this.discountPercent = Math.round(((this.regularPrice - this.discountPrice) / this.regularPrice) * 100);
  } else {
    this.discountPercent = 0;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
