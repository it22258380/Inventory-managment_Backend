import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },

  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Groceries',
      'Personal Care',
      'Household',
      'Stationery'
    ],
  },

  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 0,
  },

  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
  },

  description: {
    type: String,
    required: false,
  },

  availability: {
    type: Boolean,
    default: true,
  },

  dateAdded: {
    type: Date,
    default: Date.now,
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
