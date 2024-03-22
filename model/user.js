const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null, required: true },
    last_name: { type: String, default: null, required: true },
    dob: { type: String, required: true },
    phone_number: { type: String, default: null },
    image: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("users", userSchema)