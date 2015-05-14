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
    //console.log("new connection: ", conn);
    var index = client_list.length;
    client_list[index] = conn;
    conn.server_index = index;
    if(host === null) {
        host = conn;
    }
    else {
        host.sendText("S");
    }
    conn.on("text", function (text) {
        console.log("Received:", text);
        conn.sendText("O");
        for(var i = 1, len = client_list.length; i < len; i ++) {
            var client = client_list[i];
            if(client != null){
                client.sendText(text);
            }
        }
    });
    conn.on("close", function (code, reason) {
        console.log("Connection is closed", code, reason);
        for(var i = 0, len = client_list.length; i < len; i ++) {
            client_list[conn.server_index] = null;
        }
    });
    conn.on("error", function (err) {
        console.error(err);
    });
}).listen(8111);
