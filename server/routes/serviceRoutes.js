const express = require('express');
const {createService, updateService, deleteService, getAllServices} = require('../controllers/servicesController');
const router = express.Router();

// Admin login route
router.post('/createService', createService);

// Fetch all menu items
router.get('/getServices', getAllServices);

// Update an existing menu item
router.put('/updateServices', updateService);

// Delete a menu item
router.delete('/deleteServices', deleteService);

module.exports = router;
