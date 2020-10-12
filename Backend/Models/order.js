const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductOrderedSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  count: {
    type: Number,
    required: true,
  },
});

const ProductOrdered = mongoose.model("ProductOrdered", ProductOrderedSchema);

const OrderSchema = new mongoose.Schema({
  products: [ProductOrderedSchema],
  address: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
  transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
},{timestamps:true});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { ProductOrdered, Order };
