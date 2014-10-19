var express = require('express');
var morgan = require('morgan');

var port = process.env.PORT || 3000;
var app = express();

app.use(morgan('dev')); 
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/test', express.static(__dirname + '/test'));
//app.use(app.router);

app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});