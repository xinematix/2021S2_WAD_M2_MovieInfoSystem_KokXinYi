var express = require('express');
// var db = require('./services/dataservice.js');
// db.connect();

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

   


module.exports = router;
