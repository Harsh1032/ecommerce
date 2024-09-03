const express = require('express');
const { createDrink, updateDrink, deleteDrink, getAllDrinks} = require('../controllers/drinksController');
const router = express.Router();

// Admin login route
router.post('/createDrink', createDrink);

// Fetch all menu items
router.get('/getDrinks', getAllDrinks);

// Update an existing menu item
router.put('/updateDrinks', updateDrink);

// Delete a menu item
router.delete('/deleteDrinks', deleteDrink);

module.exports = router;
