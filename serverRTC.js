var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var fs = require('fs-extra')
app.get('/', function(req, res, next) { res.send('Hello world!'); });

var server = app.listen(9000);

var options = {
    debug: true
}

var ssl_options = {
    key: fs.readFileSync('key/star_apps_aegpresents_com.key'),
    cert: fs.readFileSync('key/star_apps_aegpresents_com.pem')
};

app.use('/api', ExpressPeerServer(server, options));

// OR

var server = require('https').createServer(ssl_options, app);

app.use('/peerjs', ExpressPeerServer(server, options));

server.listen(3020, '45.32.119.158', function() {
    console.log('listening on https://45.32.119.158:3020')
});