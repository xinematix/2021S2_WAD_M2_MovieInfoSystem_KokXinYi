var express = require('express');
var db = require('./services/dataservice.js');
db.connect();

var router = require('express').Router();

router.use(express.urlencoded({
    extended: true
}));

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

router.get('/css/*', function(req, res)  {
    res.sendFile(__dirname+"/views/"+req.originalUrl);
});

router.get('/js/*', function(req, res)  {
    res.sendFile(__dirname+"/views/"+req.originalUrl);
});

router.get('/assets/*', function(req, res)  {
    res.sendFile(__dirname+"/views/"+req.originalUrl);
});  

router.get('/login', function (req, res) {
    res.sendFile(__dirname + "/views/login.html");
});

router.post('/login', function (req, res) {
    var data = req.body;
    db.getUser(data.username, data.password, function(err, user){
        if(err) {
            res.status(500).send("Login Failed");
        } else if(!user) {
            res.status(400).send("User Not Found");
        } else {
            // res.status(200).send(user);
            // res.render(__dirname + "/views/index.html", {username: data.username});
            // res.end("success/user=" + user.username);
            res.redirect('/');
        }
        
        

    });
});

router.get('/register', function (req, res) {
    res.sendFile(__dirname + "/views/register.html");
});

router.post('/register', function (req, res) {
    var data = req.body;
    db.addUser(data.email, data.username, data.password, function(err, user){
        if(err) {
            res.status(500).send("Unable to register an account.");
        } else {
            // console.log(user);
            res.status(200).send(user);
        }
    });
});

module.exports = router;
