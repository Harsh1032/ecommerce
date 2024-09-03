const Snack = require("../models/snackModel");
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

const createSnack = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: err });
    }

    try {
      const { name, price } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Generate image URL

      const snackDoc = await Snack.create({
        image: imagePath, // Save the image URL to the database
        name,
        price,
      });

      res.status(201).json(snackDoc);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

const updateSnack = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: err });
    }

    try {
      const { id } = req.body; // Get the menu item ID from the request body
      const { name, price } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      // Find the menu item by ID and update it
      const snack = await Snack.findById(id);

      if (!snack) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      // Update the menu item fields
      if (name) snack.name = name;
      if (price) snack.price = price;
      if (imagePath) snack.image = imagePath;

      // Save the updated menu item
      const updatedSnack = await snack.save();

      res.status(200).json(updatedSnack);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

const deleteSnack = async (req, res) => {
  try {
    const { id } = req.body; // Get the menu item ID from the request body

    const snack = await Snack.findByIdAndDelete(id);

    if (!snack) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getAllSnacks = async (req, res) => {
  try {
    const snacks = await Snack.find(); // Fetch all menu items from the database
    res.status(200).json(snacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  createSnack,
  updateSnack,
  deleteSnack,
  getAllSnacks,
};
