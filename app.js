
const express = require("express");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const app = express();

const path = require("path");
const rootDir = require("./utils/path.js");

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use("/admin",adminRoute);
app.use("/shop",shopRoute);
app.get("/",(req,res)=>{
    res.redirect("/admin/add-product")
})

app.get("/contactUs",(req,res)=>{
    res.sendFile(path.join(rootDir,"views","contactus.html"));
})

app.post("/success",(req,res)=>{
    res.send("successfully submited");
})

app.use("*",(req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,"views","page404.html"))
});
app.listen(3000);

// const http = require("http");
// const { createRequire } = require("module");
// const server = http.createServer(route);
// server.listen(3000);