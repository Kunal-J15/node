const express = require("express");
const router = express.Router({mergeParams:true});
const path = require("path");
const rootDir = require("../utils/path.js");
router.use("/",(req,res,next)=>{
    res.sendFile(path.join(rootDir,"views","shop.html"))
})
module.exports = router;