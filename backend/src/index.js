const http = require("http");

const server = http.createServer((req, res) => {
  console.log("REQUEST RECEIVED");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("RAW NODE SERVER WORKS");
});

server.listen(5001, () => {
  console.log("RAW SERVER LISTENING ON 5000");
});
