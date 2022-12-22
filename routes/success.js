const express = require("express");
const { success } = require("../controllers/success.js");
const router = express.Router({mergeParams:true});

router.get("/",success)

module.exports = router;