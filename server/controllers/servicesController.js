const Service = require("../models/servicesModel");
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

const createService= async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: err });
    }

    try {
      const { name, price } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Generate image URL

      const serviceDoc = await Service.create({
        image: imagePath, // Save the image URL to the database
        name,
        price,
      });

      res.status(201).json(serviceDoc);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

const updateService= async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: err });
    }

    try {
      const { id } = req.body; // Get the menu item ID from the request body
      const { name, price } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      // Find the menu item by ID and update it
      const service= await Service.findById(id);

      if (!service) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      // Update the menu item fields
      if (name) service.name = name;
      if (price) service.price = price;
      if (imagePath) service.image = imagePath;

      // Save the updated menu item
      const updatedService= await service.save();

      res.status(200).json(updatedService);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

const deleteService= async (req, res) => {
  try {
    const { id } = req.body; // Get the menu item ID from the request body

    const service= await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getAllServices = async (req, res) => {
  try {
    const services = await Service.find(); // Fetch all menu items from the database
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  createService,
  updateService,
  deleteService,
  getAllServices,
};
