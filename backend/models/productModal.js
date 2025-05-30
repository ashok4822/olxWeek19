const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    isLiked: {type: Boolean, default: false},
    description: {type: String, required: true},
    date: {type: Date, default: () => new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"})}
})

module.exports = mongoose.model('Product', productSchema);