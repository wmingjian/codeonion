var http = require('http');
var io = require('socket.io');
var ws = require('nodejs-websocket'); 

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('ok');
});

server.listen(8110);


var connect = null;
var i = 0;
var ws_server = ws.createServer(function (conn) {
    console.log("new connection: ", conn);
    connect = conn;

    conn.on("text", function (text) {
        console.log("Received:", text);
        conn.sendText("[" + text.toUpperCase() + "] send back");
    });
    conn.on("close", function (code, reason) {
        console.log("Connection is closed", code, reason);
    });
}).listen(8111);

setInterval(function() {
    if(connect) {
        connect.sendText("============== " + (i++));
    }    
}, 1000);
