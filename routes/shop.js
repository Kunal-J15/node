const express = require("express");
const { shop } = require("../controllers/shop");
const router = express.Router({mergeParams:true});

router.use("/",shop);
module.exports = router;