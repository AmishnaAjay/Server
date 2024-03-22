const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    material: { type: String, required: true},
    image: { type: String },
    categories: { type: Array, required: true },
    size:  { type: Array },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String },
    rating: { type: String },
    quantity: { type: Number },
    availability: { type: String }
 
}, { timestamps: true })

module.exports = mongoose.model("product", productSchema)