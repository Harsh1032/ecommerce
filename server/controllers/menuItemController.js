const MenuItem = require("../models/menuItemModel");
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

const createMenuItem = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: err });
    }

    try {
      const { name, price } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Generate image URL

      const menuItemDoc = await MenuItem.create({
        image: imagePath, // Save the image URL to the database
        name,
        price,
      });


      // Emit the new snack to all connected clients
      req.app.get('io').emit('menuItemDoc', menuItemDoc);

      res.status(201).json(menuItemDoc);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

const updateMenuItem = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: err });
    }

    try {
      const { id } = req.body; // Get the menu item ID from the request body
      const { name, price } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      // Find the menu item by ID and update it
      const menuItem = await MenuItem.findById(id);

      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      // Update the menu item fields
      if (name) menuItem.name = name;
      if (price) menuItem.price = price;
      if (imagePath) menuItem.image = imagePath;

      // Save the updated menu item
      const updatedMenuItem = await menuItem.save();

      
      // Emit updated snack event
      req.app.get('io').emit('updatedMenuItem', updatedMenuItem);


      res.status(200).json(updatedMenuItem);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.body; // Get the menu item ID from the request body

    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Emit deleted snack event
    req.app.get('io').emit('deleteMenuItem', { id });

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); // Fetch all menu items from the database
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
};
