const path = require("path");
const rootDir = require("../utils/path.js");

module.exports.error404 = (req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,"views","page404.html"))
}