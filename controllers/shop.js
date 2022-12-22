const path = require("path");
const rootDir = require("../utils/path.js");

module.exports.shop = (req,res,next)=>{
    res.sendFile(path.join(rootDir,"views","shop.html"))
}