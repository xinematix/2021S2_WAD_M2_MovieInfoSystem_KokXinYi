var express = require('express');
var crypto = require('crypto');
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

router.get('/profile', function (req, res) {
    res.sendFile(__dirname + "/views/profile.html");
});

router.get('/favourites', function (req, res) {
    res.sendFile(__dirname + "/views/favourites.html");
});

router.get('/forums', function (req, res) {
    res.sendFile(__dirname + "/views/favourites.html");
});


router.post('/login', function (req, res) {
    var data = req.body;
    db.login(data.username, data.password, function(err, user){
        if(err) {
            res.status(500).send("Login Failed");
        } else {
            if(user == null) {
                res.status(401).send("User Not Found");
            } else {
                var strToHash = user.username + Date.now();
                var token = crypto.createHash('md5').update(strToHash).digest('hex');
                db.updateToken(user._id, token, function (err, user) {
                    res.status(200).json({ 'message': 'Login successful.', 'token': token, 'username': user.username });
                });
            }
        } 
        
        

    });
});

router.get("/logout", function (req, res) {
    var token = req.query.token;
    if (token == undefined) {
        res.status(401).send("No tokens are provided");
    } else {
        db.checkToken(token, function (err, user) {
            if (err || user == null) {
                res.status(401).send("Invalid token provided");
            } else {
                //can find a matching token
                db.removeToken(user._id, function (err, user) {
                    res.status(200).send("Logout successfully");
                });
            }
        })
    }

})

router.get('/register', function (req, res) {
    res.sendFile(__dirname + "/views/register.html");
});

router.post('/register', function (req, res) {
    var data = req.body;
    db.register(data.email, data.username, data.password, function(err, user){
        if(err) {
            res.status(500).send("Unable to register an account.");
        } else {
            // console.log(user);
            res.status(200).send("Registration completed!");
        }
    });
});

router.post('/comments', function (req, res) {
    var data = req.body;
    db.addComment(data.comment,
        function (err, comment) {
            res.redirect('back');
        })

});

router.get('/comments', function (req, res) {
    db.getAllComments(function (err, comments) {
        res.send(comments);
    })

});

router.get('/:id', function (req, res) {
    res.sendFile(__dirname + "/views/movie.html");
});




module.exports = router;
