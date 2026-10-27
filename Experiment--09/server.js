
const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("welcome", (message) => {
    console.log(message);
});

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    res.write("<h1>Node.js Custom Server</h1>");
    res.write("<p>HTTP server is running successfully.</p>");
    res.write("<p>Operating System: " + os.platform() + "</p>");
    res.write("<p>Free Memory: " + os.freemem() + " bytes</p>");
    res.write("<p>File Name: " + path.basename(__filename) + "</p>");
    res.end();
});

eventEmitter.emit("welcome", "Welcome to Node.js!");

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
