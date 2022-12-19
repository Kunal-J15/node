const http = require("http");

const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write("<head><title>My First Page</title></head>");
if(req.url==="/") res.write('<body><h1>Welcome Home</h1></body>');
else if(req.url==="/about")     res.write('<body><h1>Welcome About Us page</h1></body>');
else if(req.url==="/node")    res.write('<body><h1>welcome to nodeJS project</h1></body>');
else     res.write('<body><h1>Invalid request</h1></body>');
    res.write('</html>');
    res.end();
});
server.listen(3000);