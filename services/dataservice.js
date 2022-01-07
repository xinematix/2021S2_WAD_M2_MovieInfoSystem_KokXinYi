//setup mongoose to connect to db
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var userModel; 

mongoose.set('debug',true);

var database = {
    connect: function() {
        //connect to db and handle via callback function 
        mongoose.connect('mongodb://127.0.0.1:27017/MyMovieAppDB', function(err){
            if(err==null) {
                console.log("Connected to Mongo DB");
                //initialize values
                userSchema = schema({
                    email: String,
                    username: String,
                    password: String,
                
                });
                var connection = mongoose.connection;
                //Assign and create model
                userModel = connection.model('user', userSchema);
            } else {
                console.log("Error connecting to Mongo DB");
                console.log(err);
            }
        })
    },
    addUser: function(e, u, pw, callback) {
        var newUser = new userModel({
            email: e,
            username: u,
            password: pw
        });
        newUser.save(callback);
    },
    getUser: function(u, pw, callback) {
        userModel.findOne({
            username: u,
            password: pw
        }, callback);
    },

};

module.exports = database;
