var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var steps       =   require("./models/steps");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//register different routers responsible for different operations
app.use('/rest/api/steps',steps);

app.listen(3000);
console.log("Listening to PORT 3000");