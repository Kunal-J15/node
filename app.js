const http = require("http");

const server = http.createServer((req,res)=>{
    console.log("incomming request.....")
});
server.listen(3000);