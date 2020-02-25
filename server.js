var express = require('express');
var http = require('http');
var history = require('connect-history-api-fallback');
//var path = require('path');
var serveStatic = require('serve-static');
var enforce = require('express-sslify');

var app = express();

app.use(history(),enforce.HTTPS({trustProtoHeader: true}),serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});

// app.listen(port);
// console.log('server started '+ port);