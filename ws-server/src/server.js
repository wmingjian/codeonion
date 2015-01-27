var http = require('http');
var io = require('socket.io');
var ws = require('nodejs-websocket'); 

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('ok');
});

server.listen(8110);


var client_list = [];
var i = 0;
var host = null;
var ws_server = ws.createServer(function (conn) {
    console.log("new connection: ", conn);
    var index = client_list.length;
    client_list[index] = conn;
    conn.server_index = index;
    if(host == null) {
        host = conn;
    }
    else {
        host.sendText("S");
    }
    conn.on("text", function (text) {
        console.log("Received:", text);
        conn.sendText("O");
        for(var i = 1; i < client_list.length; i ++) {
            if(client_list[i] != null)
                client_list[i].sendText(text);
        }
    });
    conn.on("close", function (code, reason) {
        console.log("Connection is closed", code, reason);
        for(var i = 0; i < client_list.length; i ++) {
            client_list[conn.server_index] = null;
        }
    });
}).listen(8111);
