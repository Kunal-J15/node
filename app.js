const http = require("http");
const fs = require("fs");
const server = http.createServer((req,res)=>{
   
if(req.url==="/"){
    const data = fs.readFileSync("./msg.txt").toString().split("\n");
    data.pop();
    let insert = data.map((e)=>'<h3>'+e.split("=")[1]+'</h3>').reduce((str,e)=>str=e+str,"");
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write("<head><title>My First Page</title></head>");
    res.write(`<body>${insert}<form action="/message" method="post"><input type="text" name="mes"><button>Submit</button></form></body>`);
    return res.end()
}
if(req.url==="/message" && req.method == "POST"){
    const data=[];
    req.on("data",(c)=>data.push(c))
    req.on("end",(c)=>{
        myMsg = Buffer.concat(data).toString();
        console.log(myMsg);
        fs.appendFile("msg.txt",myMsg+"\n",function (err) {
            if(err) throw err;
            console.log("saved");
        });
    })
    res.statusCode= 302;
    res.setHeader('Location',"/");
    return res.end();
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write("<head><title>My First Page</title></head>");
    res.write('<body><h1>Invalid request</h1></body>');
    res.write('</html>');
    res.end();
});
server.listen(3000);