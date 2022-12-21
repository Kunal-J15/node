const express = require("express");
const router = express.Router({mergeParams:true});

router.use("/",(req,res,next)=>{
    res.send(`<h1> Welcome into shop</h1>`)
})
module.exports = router;