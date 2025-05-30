const asyncHandler = require('express-async-handler');
const User = require('../models/userModal');
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Product = require('../models/productModal')

// Register user view

const registerUser = asyncHandler(async(req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET || "1921u0030";
    try {
        const { username, email, password, confirmpassword } = req.body;
    
        // Checking if user already exist:
        const existUser = await User.findOne({ email });
        if (existUser) {
          return res
            .status(400)
            .json({ message: "User already exist with this email" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        if (password == confirmpassword) {
          const user = new User({ username, email, password: hashedPassword });
          await user.save();
          // Generate JWT token
          const token = Jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
    
          res.status(201).json({ message: "User registered successfully", token });
        } else {
          return res.status(400).json({ message: "Password should match" });
        }
      }catch (err) {
         res.status(500).json({ error: err.message });
      }
})
// Login user view

const loginUser = asyncHandler(async(req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET || "1921u0030";
    try {
        const { email, password } = req.body;
    
        // Check if user exists with the provided email
        const existUser = await User.findOne({ email });
        if (!existUser) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
    
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, existUser.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
    
        // Generate JWT token
        const token = Jwt.sign(
          { id: existUser._id, email: existUser.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
    
        res.status(200).json({ message: "Login successful", token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

const productList = asyncHandler(async (req, res) => {
  try {
      let products = await Product.find({});
      if (products.length == 0) {
        return res.status(404).json({ message: "No product found." });
      }
      res.status(200).json(products);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong while fetching products" });
    }
})

module.exports = {registerUser, loginUser, productList};