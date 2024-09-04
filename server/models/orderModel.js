const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  roomNumber: { type: String, required: true },
  date: { type: Date },
  notes: { type: String },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalBill: { type: Number, required: true },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
