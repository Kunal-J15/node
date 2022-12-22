const path = require("path");
const rootDir = require("../utils/path.js");

exports.contactusForm = (req,res)=>{
    res.sendFile(path.join(rootDir,"views","contactus.html"));
};

exports.contactus = (req,res)=>{
    res.redirect("/success");
};