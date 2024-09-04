const express = require('express');
const { submitOrder, getOrders, markOrderCompleted } = require('../controllers/orderController');

const router = express.Router();

router.post('/submitOrder', submitOrder);
router.get('/getOrders', getOrders);
router.patch('/completeOrder', markOrderCompleted); 

module.exports = router;
