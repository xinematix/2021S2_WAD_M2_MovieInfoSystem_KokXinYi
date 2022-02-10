//setup mongoose to connect to db
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var userModel; 
var commentSchema = {};
var commentModel; 

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
                    token: String
                });
                commentSchema = schema({
                  
                    comment: String,
                   
                });
                var connection = mongoose.connection;
                //Assign and create model
                userModel = connection.model('user', userSchema);
                commentModel = connection.model('comment', commentSchema);
            } else {
                console.log("Error connecting to Mongo DB");
                console.log(err);
            }
        })
    },
    register: function(e, u, pw, callback) {
        var newUser = new userModel({
            email: e,
            username: u,
            password: pw
        });
        newUser.save(callback);
    },
    login: function(u, pw, callback) {
        userModel.findOne({
            username: u,
            password: pw
        }, callback);
    },
    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        userModel.findOne({token:token},callback);
    },
    removeToken: function(id,callback) {
        userModel.findByIdAndUpdate(id, {$unset: {token: 1}},callback);
    },
    addComment: function(c, callback) {
        var newComment = new commentModel({
            comment: c,
        });
        newComment.save(callback);
    },
    getAllComments: function(callback) {
        commentModel.find({},callback);
    },
  

};

module.exports = database;
