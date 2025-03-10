// const mongoose = require('mongoose');

// const sizeSchema = new mongoose.Schema({
//   productType: {
//     type: String,
//     required: true,
//     enum: ['Shoes', 'Watch', 'Sunglass', 'Cloth'],
//   },
//   size: {
//     type: String,
//     required: true,
//   },
//   unit: {
//     type: String,
//     enum: ['US', 'EU', 'CM', 'Inches', 'UK', 'Generic'],
//     default: 'Generic',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// sizeSchema.index({ productType: 1, size: 1, unit: 1 }, { unique: true });

// module.exports = mongoose.model('Size', sizeSchema);


const productSchema = new mongoose.Schema({
  name: String,
  sizes: [String],
});

const Product = mongoose.model('Product', productSchema);