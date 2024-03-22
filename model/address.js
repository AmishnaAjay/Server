const mongoose = require('mongoose');

const addressScheme = new mongoose.Schema({
    addressees_name: { type: String, default: null, required: true },
    house_number: { type: Number, default: null, required: true },
    street_name: { type: String, default: null,  required: true },
    locality_name: { type: String, default: null },
    town: { type: String },
    postcode: { type: String, required: true },
    user_id: { type: String, required: true}
}, { timestamps: true })

module.exports = mongoose.model("address", addressScheme )