const express = require("express");

const { contactusForm, contactus } = require("../controllers/contactUs.js");
const rootDir = require("../utils/path.js");

const router = express.Router({mergeParams:true});

router.route("/")
    .get(contactusForm)
    .post(contactus);

module.exports = router;