const express = require('express');
const {createMenuItem, updateMenuItem, deleteMenuItem, getAllMenuItems} = require('../controllers/menuItemController');
const router = express.Router();

// Admin login route
router.post('/createMenuItem', createMenuItem);

// Fetch all menu items
router.get('/getItems', getAllMenuItems);

// Update an existing menu item
router.put('/updateItems', updateMenuItem);

// Delete a menu item
router.delete('/deleteItems', deleteMenuItem);

module.exports = router;
