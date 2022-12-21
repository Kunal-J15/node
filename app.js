const route = require("./routes");
const express = require("express");
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const app = express();

app.use(express.urlencoded({extended:true}));

app.use("/admin",adminRoute);
app.use("/shop",shopRoute);
app.get("/",(req,res)=>{
    res.redirect("/admin/add-product")
})
app.use("*",(req,res,next)=>{
    res.status(404).send('<h1>404 Page Not Found</h1> <a href="/admin/add-product">home</a>' )
});
app.listen(3000);

// const http = require("http");
// const { createRequire } = require("module");
// const server = http.createServer(route);
// server.listen(3000);