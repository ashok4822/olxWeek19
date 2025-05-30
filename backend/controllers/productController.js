const asyncHandler = require('express-async-handler');
const Jwt = require("jsonwebtoken");
const Product = require('../models/productModal');
const cloudinary = require('../config/cloudinary')
const fs = require('fs'); // File system to remove uploaded files

// @desc    Add a new product
// @route   POST /api/products
// @access  Public

const listProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find().sort({_id:-1});

    // Send the products as the response
    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


const addProduct = async (req, res) => {
    try {
      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }
  
      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        use_filename: true,
      });
  
      // Format and validate the date field
      const formattedDate = new Date(); // Current date in ISO format
      if (isNaN(formattedDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
  
      // Create new product with valid data
      const product = new Product({
        name: req.body.name,
        image: cloudinaryResponse.secure_url, // Cloudinary image URL
        description: req.body.description,
        price: req.body.price,
        date: formattedDate, // Valid Date object
      });
  
      // Save product to database
      const savedProduct = await product.save();
  
      // Delete the uploaded file from local storage
      fs.unlinkSync(req.file.path);
  
      // Send success response
      res.status(201).json({
        message: "Product added successfully",
        product: savedProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error.message);
  
      // Cleanup the file if upload failed
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
  
      res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  };
  
  module.exports = { addProduct, listProducts };