/**
 * Created by rlaca on 11/10/2017.
 */
/**
 * Created by rlaca on 03/07/2017.
 */
//==============================
//======== CONFIG ==============
//==============================
const util = require('util');
var path = require('path');

// Express
var express = require('express');
var app = express();
app.use(express.static('public'));

// globale variables
var java_client;

// IO
var io = require('socket.io').listen(app.listen(3700));

// Bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // this is used for parsing the JSON object from POST

// set up handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

io.sockets.on('connection', function (socket)
{
    console.log('Connection from web page');
});


//==============================
//======== ROUTING SERVER ======
//==============================

app.get('/', function (req, res)
{
    res.render('game', { content: '' });
})

app.post('/start', function (req, res) {
    var exec = require('child_process').exec, child;
    child = exec('java -jar ActuPlan.jar -h 0 -nbThreads 1 exemples/jail.apl exemples/jail-01.apl -jsmode',
        function (error, stdout, stderr){
            console.log('stdout: ' + stdout);
            if(error !== null){
                console.log('exec error: ' + error);
            }
        });
    res.end();
})

app.get('/ping.html', function (req, res)
{
    send_message_to_java(req.query.id);

    res.render('game', { content: '' });
})



// custom 404 page
// app.use it called when nothing before matches the uri
app.use(function(req, res, next) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

// -------------------------
// Communication with Humans
// -------------------------
var net = require('net');

var HOST = '127.0.0.1'; // parameterize the IP of the Listen
var PORT = 6969; // TCP LISTEN port

// Create an instance of the Server and waits for a conexão
net.createServer(function(sock) {

    // Receives a connection - a socket object is associated to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Link client
    java_client = net.connect({port: 1234}, function() {
        console.log('connected to server!');
    });

    java_client.on('data', function(data) {
        console.log('Received: ' + data);
    });

    java_client.on('close', function() {
        console.log('Connection closed');
    });

    java_client.on("error", function(exception) {
        console.log("Client closed");
    });

    sock.on("error", function(exception) {
        console.log("Client closed");
        console.log(exception.stack);
    });

    // Receive message from Humans
    sock.on('data', function(data) {
        console.log('| Receive from Java: ' + data);
        var string = String.fromCharCode.apply(null, data);
        if (string.startsWith('connected'))
        {
            send_message_to_java('start');
        }
        else if (string.startsWith('listaction@'))
        {
            io.sockets.emit('js_client', {data: string});
        }
    });

    // Add a 'close' - "event handler" in this socket instance
    sock.on('close', function(data) {
        // closed connection
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });


}).listen(PORT, HOST);

function send_message_to_java(msg)
{
    if (java_client != null)
    {
        console.log('Send to java: ' + msg);
        java_client.write(msg+ '\n');
    }
}


console.log('Server listening on ' + HOST +':'+ PORT);
