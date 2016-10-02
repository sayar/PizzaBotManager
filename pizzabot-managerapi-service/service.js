var express = require('express');
var app = express();

app.get('/api/humans', function (req, res) {
    //TODO: GET HUMANS FROM DATABASE... 
   return res.json(humans);
});

app.get('/api/clear', function(req, res) {
    //TODO: CLEAR HUMANS FROM DATABASE... 
    humans = {};
    res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
