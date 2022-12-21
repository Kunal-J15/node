const express = require("express");
const path = require("path");
const rootDir = require("../utils/path.js");

const router = express.Router({mergeParams:true});

router.get("/add-product",(req,res,next)=>{
    res.sendFile(path.join(rootDir,"views","add-products.html"))
})

router.post("/add-product",(req,res,next)=>{
    res.send(req.body);
});
module.exports = router;