const Order = require('../models/orderModel');
const axios = require('axios');

// Function to send a Telegram message
const sendTelegramMessage = async (chatId, message) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN; // Your bot token stored in environment variables
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  console.log(chatId);
  try {
    await axios.post(url, {
      chat_id: chatId, // The admin or group chat ID
      text: message,
    });
    console.log('Order notification sent to Telegram');
  } catch (error) {
    console.error('Error sending message to Telegram', error);
  }
};


// Example usage: Sending order notification to Telegram
const notifyOrder = async (order) => {
  const chatId = process.env.TELEGRAM_CHAT_ID; // Store your chat ID in the environment variable
  console.log(chatId);
  const message = `New Order Received!\n\nOrder ID: ${order._id}\nCustomer: ${order.name}\nItems: ${order.items.join(', ')}\nTotal Bill: $${order.totalBill}\nRoom: ${order.roomNumber}`;
  
  await sendTelegramMessage(chatId, message);
};

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

    // Send Telegram notification
    await notifyOrder(newOrder);

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

// Mark order as completed
const markOrderCompleted = async (req, res) => {
  try {
    const { id } = req.body; // Get ObjectId from request body

    const order = await Order.findByIdAndUpdate(
      id,
      { isCompleted: true },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Emit an event for completed order
    req.app.get('io').emit('orderCompleted', order);
    
    res.status(200).json({ message: 'Order marked as completed', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error });
  }
};


module.exports = {
  submitOrder,
  getOrders,
  markOrderCompleted
};
