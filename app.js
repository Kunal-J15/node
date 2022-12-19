const route = require("./routes");
const http = require("http");
const server = http.createServer(route);
server.listen(3000);