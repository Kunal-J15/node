const express = require("express");
const router = express.Router({mergeParams:true});

router.get("/add-product",(req,res,next)=>{
    res.send(`<form action="/admin/add-product" method="post">
    <label for="p">Name</label>
    <input id="p" type="text" name="product">
    <label for="s">Size</label>
    <input id="s" type="text" name="size">
    <button>Submit</button>
</form>`)
})

router.post("/add-product",(req,res,next)=>{
    console.log(req.body);
    res.send(req.body);
});
module.exports = router;