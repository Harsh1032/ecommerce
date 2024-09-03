const express = require('express');
const {createSnack, updateSnack, deleteSnack, getAllSnacks} = require('../controllers/snackController');
const router = express.Router();

// Admin login route
router.post('/createSnack', createSnack);

// Fetch all menu items
router.get('/getSnacks', getAllSnacks);

// Update an existing menu item
router.put('/updateSnacks', updateSnack);

// Delete a menu item
router.delete('/deleteSnacks', deleteSnack);

module.exports = router;
