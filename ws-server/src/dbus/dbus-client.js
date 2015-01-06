var dbus = require('dbus-native');
var conn = dbus.createConnection();
conn.message({
    path:'/test/method/Object',
    destination: 'test.signal.dest',
    'interface': 'test.signal.Type',
    member: 'Test',
    type: dbus.messageType.signal
});
conn.on('message', function(msg) { console.log(msg); });
