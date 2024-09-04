const Drink = require("../models/drinksModel");
const multer = require("multer");
const path = require("path");

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 'uploads' is the directory where images will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Create unique filenames
  },
});

const upload = multer({ storage: storage }).single("image"); // Handling a single file upload

const createDrink= async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: err });
    }

    try {
      const { name, price } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Generate image URL

      const drinkDoc = await Drink.create({
        image: imagePath, // Save the image URL to the database
        name,
        price,
      });

      
      // Emit the new snack to all connected clients
      req.app.get('io').emit('drinkDoc', drinkDoc);

      res.status(201).json(drinkDoc);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

const updateDrink= async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: err });
    }

    try {
      const { id } = req.body; // Get the menu item ID from the request body
      const { name, price } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      // Find the menu item by ID and update it
      const drink= await Drink.findById(id);

      if (!drink) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      // Update the menu item fields
      if (name) drink.name = name;
      if (price) drink.price = price;
      if (imagePath) drink.image = imagePath;

      // Save the updated menu item
      const updatedDrink= await drink.save();

      
      // Emit updated snack event
      req.app.get('io').emit('updatedDrink', updatedDrink);

      res.status(200).json(updatedDrink);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

const deleteDrink= async (req, res) => {
  try {
    const { id } = req.body; // Get the menu item ID from the request body

    const drink= await Drink.findByIdAndDelete(id);

    if (!drink) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    
    // Emit deleted snack event
    req.app.get('io').emit('deleteDrink', { id });

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getAllDrinks = async (req, res) => {
  try {
    const drinks = await Drink.find(); // Fetch all menu items from the database
    res.status(200).json(drinks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  createDrink,
  updateDrink,
  deleteDrink,
  getAllDrinks,
};
