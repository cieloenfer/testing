const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  owner: { type: Schema.Types.ObjectId, ref: 'User', default: 'admin' }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
