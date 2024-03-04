import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  storeId: String,
  productId: String,
  count: Number,
});


const ordersSchema = new mongoose.Schema({
  status: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  products: [productsSchema],
});

export default mongoose.model('orderscollections', ordersSchema);