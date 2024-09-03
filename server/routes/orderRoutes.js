const express = require('express');
const { submitOrder, getOrders } = require('../controllers/orderController');

const router = express.Router();

router.post('/submitOrder', submitOrder);
router.get('/getOrders', getOrders);  

module.exports = router;
