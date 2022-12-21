const route = require("./routes");
const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/add-product",(req,res,next)=>{
    res.send(`<form action="/add-product" method="post">
    <label for="p">Name</label>
    <input id="p" type="text" name="product">
    <label for="s">Size</label>
    <input id="s" type="text" name="size">
    <button>Submit</button>
</form>`)
})

app.post("/add-product",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/add-product");
});
app.listen(3000);

// const http = require("http");
// const { createRequire } = require("module");
// const server = http.createServer(route);
// server.listen(3000);