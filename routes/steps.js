var express     =   require("express");
var successResp =   require("../response/success");
var errorResp   =   require("../response/error");
var router      =   express.Router();
var mongoCon     =   require("../utils/db-connection");
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
            res.json(errorResp("Something went wrong!!", 401));
        }else if(!data){
            res.json(errorResp("No records found", 404));
        }else{
            res.json(successResp(data));
        }
    });
});

router.put("/:stepid",function(req,res){
    mongoOp.findOneAndUpdate({"steps.stepId": req.params.stepid},{"steps.$.stepStatus":req.body.flag},(err, data)=>{
        if(err){
            res.json(errorResp("Something went wrong!!", 401));
        }else if(!data){
            res.json(errorResp("No records found for [id:"+req.params.stepid+"]", 404));
        }else{
            res.json(successResp(data));
        }
    });
});

module.exports = router;