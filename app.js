const route = require("./routes");
const express = require("express");
const app = express();

app.use((req,res,next)=>{
    console.log("first middleware");
    next();
});

app.use((req,res,next)=>{
    console.log("second middleware");
    res.send({abc:1})
});

app.listen(3000);

// const http = require("http");
// const { createRequire } = require("module");
// const server = http.createServer(route);
// server.listen(3000);