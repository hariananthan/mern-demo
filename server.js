const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const router = express.Router();
const app = express();

//Schema for collection
let UserInfo = require('./models/userInfo.model');

//Mongo db connnection URI
let dbConfiguration = require('./db.config');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', router);


app.listen(5000,() => {
    console.log("Server listening on port 5000");
});

app.get('/',(req,res) => {
    res.send("Server up and running");
});

const mongoConnection = dbConfiguration.mongoBase + dbConfiguration.dbName;
console.log("Connecting to Mongo on",mongoConnection);

mongoose.connect(mongoConnection,{useNewUrlParser:true,useUnifiedTopology: true},(err)=>{
    if(!err){
        console.log("Successfully Connected to Mongo DB");
    }
    else{
        console.log("Falied to Connect : ",err);
    }
});


router.route('/register').post(function(req, res) {
    console.log("Received request to add new User")
    let userInfo = new UserInfo(req.body);
    userInfo.save()
        .then(userInfo => {
            res.status(200).send('User added successfully');
        })
        .catch(err => {
            res.status(400).send('Adding new user failed');
        });
});

router.route('/read').post(function(req, res) {
    console.log("Received request to read data from DB");

    UserInfo.find({}, function(err, userData) {    
        console.log(userData);
        if(userData!=null){
            res.status(200).send(userData);  
        }
        
    });
});

router.route('/update').post(function(req, res) {
    console.log("Received request to update record",req.body);

    var objForUpdate = {};

    if (req.body.firstName) objForUpdate.firstName = req.body.firstName;
    if (req.body.lastName) objForUpdate.lastName = req.body.lastName;

    
    objForUpdate = { $set: objForUpdate }


    UserInfo.update( {email:req.body.email},objForUpdate, function(err, dbResponse) {
        if (err) return res.status(500).send( {error: err});
        return res.status(200).send('Succesfully Updated.');
    });

});



router.route('/delete').post(function(req, res) {
    console.log("Received request to delete record",req.body);

    UserInfo.deleteOne({ email: req.body.email }, function (err) {
        if (err) return handleError(err);
        return res.status(200).send('Succesfully Deleted.');
      });

});

