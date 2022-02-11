//setup mongoose to connect to db
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var userModel;
var commentSchema = {};
var commentModel;
var profileDetailSchema = {};
var ratingSchema = {};
var favouriteSchema = {};
var passwordSchema = {};
var userModel, profileDetailModel, ratingModel, favouriteModel,updatepassword;




mongoose.set('debug', true);

var database = {
    connect: function () {
        //connect to db and handle via callback function 
        mongoose.connect('mongodb://127.0.0.1:27017/MyMovieAppDB', function (err) {
            if (err == null) {
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
                profileDetailSchema = schema({
                    name: String,
                    gender: String,
                    birthDate: String,
                    email: String,
                    user: {
                        type: schema.Types.ObjectId,
                        ref: 'users'
                    }
                });
                passwordSchema = schema({
                    password: String,
                    
                });
                ratingSchema = schema({
                    user: {
                        type: schema.Types.ObjectId,
                        ref: 'users'
                    },
                    movieid: String,
                    rating: String

                });
                favouriteSchema = schema({
                    user: {
                        type: schema.Types.ObjectId,
                        ref: 'users'
                    },
                    favourites: [String],

                });
                var connection = mongoose.connection;
                //Assign and create model
                userModel = connection.model('user', userSchema);
                commentModel = connection.model('comment', commentSchema);
                profileDetailModel = connection.model('profiledetail', profileDetailSchema);
                ratingModel = connection.model('rating', ratingSchema);
                favouriteModel = connection.model('favourite', favouriteSchema);
                passwordModel = connection.model('user', passwordSchema);

            } else {
                console.log("Error connecting to Mongo DB");
                console.log(err);
            }
        })
    },
    register: function (e, u, pw, callback) {
        var newUser = new userModel({
            email: e,
            username: u,
            password: pw
        });
        newUser.save(callback);
    },
    login: function (u, pw, callback) {
        userModel.findOne({
            username: u,
            password: pw
        }, callback);
    },
    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function (token, callback) {
        userModel.findOne({ token: token }, callback);
    },
    removeToken: function (id, callback) {
        userModel.findByIdAndUpdate(id, { $unset: { token: 1 } }, callback);
    },
    //User Comments
    addComment: function (c, callback) {
        var newComment = new commentModel({
            comment: c,
        });
        newComment.save(callback);
    },
    getAllComments: function (callback) {
        commentModel.find({}, callback);
    },
    //User Profile
    updateProfile: function (n, g, db, e, uid, callback) {
        profileDetailModel.findOneAndUpdate(
            { user: uid },
            {
                name: n,
                gender: g,
                birthDate: db,
                email: e,
            },
            { upsert: true },
            callback
        );
    },
    updatePassword: function (p, callback) {
        profileDetailModel.findOneAndUpdate(
            { password: p },
           
            { upsert: true },
            callback
        );
    },
    getUserProfile: function (uid, callback) {
        profileDetailModel.findOne({ user: uid }, callback);
    },
    //User Ratings
    addRating: function (uid, mid, r, callback) {
        var newRating = new ratingModel({
            user: uid,
            movieid: mid,
            rating: r
        });
        newRating.save(callback);
    },
    //User favourites
    addFavourite: function (uid, mid, callback) {
        favouriteModel.findOneAndUpdate(
            { user: uid },
            {
                $push: {favourites: mid}
            },
            { upsert: true },
            callback
        );
    },
    getUserFavourites: function(uid, callback) {
        favouriteModel.find({user: uid}, callback);
    }


};

module.exports = database;
