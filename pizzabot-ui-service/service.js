var express = require('express');
var path = require('path');
var app = express();

app.use('/chat', express.static(path.join(__dirname, '')));
app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(process.env.PORT || 8080);
