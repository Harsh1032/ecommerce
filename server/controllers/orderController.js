const Order = require('../models/orderModel');

const submitOrder = async (req, res) => {
  try {
    const { name, phoneNumber, roomNumber, date, notes, items, totalBill } = req.body;

    const newOrder = new Order({
      name,
      phoneNumber,
      roomNumber,
      date,
      notes,
      items,
      totalBill,
    });

    await newOrder.save();


    // Emit the new order to all connected clients
    req.app.get('io').emit('newOrder', newOrder);

    res.status(201).json({ message: 'Order submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit order', error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sort by latest orders
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

module.exports = {
  submitOrder,
  getOrders
};
