
const express = require("express");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const contactusRoute = require("./routes/contactUs");
const successRoute = require("./routes/success");
const {error404} = require("./controllers/error");
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

app.use("/contactUs",contactusRoute);

app.use("/success",successRoute);

app.use("*",error404);
app.listen(3000);