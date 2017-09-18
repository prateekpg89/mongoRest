var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var steps       =   require("./routes/steps");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');// to send this header as response to preflight 
    //request when browser calls OPTIONS tocheck what type of HTTP method back supports otherwise methods which involve write to
    //HTTP resource will not work due to CORS.
    next();
});

//register different routers responsible for different operations
app.use('/rest/api/steps',steps);

app.listen(3000);
console.log("Listening to PORT 3000");