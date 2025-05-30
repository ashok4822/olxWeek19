const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./db/connection');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require("body-parser");

require('dotenv').config()

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// Db connection function
connectDB()

app.get('/', (req, res) => {
    res.send('Hello world')
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`))