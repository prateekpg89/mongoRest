var express     =   require("express");
var successResp =   require("../response/success");
var errorResp   =   require("../response/error");
var router      =   express.Router();
var mongoCon     =   require("./db-connection");
// create schema
var userSchema  = {
    "steps" : [{
        stepId: Number,
        stepJenkinsId: String,
        stepName: String,
        stepDurationInMillis: Number,
        stepStatus: String,
        stepState: String,
        stepNextId: [String]
    }]
};
// create model if not exists.
var mongoOp = mongoCon.model('StepUI',userSchema, 'StepUI');

router.get("/",function(req,res){
    mongoOp.find({},{'steps':1, '_id':0},(err, data)=>{
        if(err){
            res.json(errorResp("Issues with connection to database", 401));
        }else{
            console.log(data);
            res.json(successResp(data));
        }
    });
});

module.exports = router;