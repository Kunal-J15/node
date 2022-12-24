const path = require("path");
const Product = require("../models/product.js");
const rootDir = require("../utils/path.js");

module.exports.shop = (req,res,next)=>{
    Product.fetchAll((products)=>{
        console.log(products);
        res.send(products);
    });
    
    // res.sendFile(path.join(rootDir,"views","shop.html"))
}