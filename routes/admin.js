const express = require("express");
const path = require("path");
const { addProduct, addProductForm } = require("../controllers/add-products.js");


const router = express.Router({mergeParams:true});

router.route("/add-product")
            .get(addProductForm)
            .post(addProduct)

module.exports = router;