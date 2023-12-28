const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
title : {type: String, required: true},
supplire : {type: String, required: true},
price: {type:String, requred:true},
imageUrl : {type: String, required: true},
descryption : {type: String, required: true},
product_location : {type: String, required: true},
},{timestamps: true});

module.exports = mongoose.model("Product",ProductSchema)