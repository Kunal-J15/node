const path = require("path");
const rootDir = require("../utils/path.js");

exports.addProductForm = (req,res,next)=>{
    res.sendFile(path.join(rootDir,"views","add-products.html"))
}

exports.addProduct = (req,res,next)=>{
    res.send(req.body);
}