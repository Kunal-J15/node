const path = require("path");
const Product = require("../models/product.js");
const rootDir = require("../utils/path.js");

exports.addProductForm = (req,res,next)=>{
    res.sendFile(path.join(rootDir,"views","add-products.html"))
}

exports.addProduct = (req,res,next)=>{
    const product  = new Product(req.body.product);
    product.save();
    res.redirect("/admin/add-product");
}