var express = require('express');
var crypto = require('crypto');
var db = require('./services/dataservice.js');
db.connect();

var router = require('express').Router();

router.use(express.urlencoded({
    extended: true
}));

router.use(function (req, res, next) {
    //only check for token if it is PUT, DELETE or POST methods
    if (req.method == "PUT" || req.method == "DELETE" || req.url.includes("/rating") || req.url.includes("/favourites")
    ) {
        var token = req.query.token;
        if (token == undefined) {
            res.status(401).send("No tokens are provided. You are not allowed to perform this action.");
        } else {
            db.checkToken(token, function (err, user) {
                if (err || user == null) {
                    res.status(401).send("[Invalid token] You are not allowed to perform this action.");
                } else {
                    res.locals.user = user;
                    next();
                }
            });
        }
    } else {    //all other routes will pass
        next();
    }
});

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

router.get('/css/*', function (req, res) {
    res.sendFile(__dirname + "/views/" + req.originalUrl);
});

router.get('/js/*', function (req, res) {
    res.sendFile(__dirname + "/views/" + req.originalUrl);
});

router.get('/assets/*', function (req, res) {
    res.sendFile(__dirname + "/views/" + req.originalUrl);
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
    db.login(data.username, data.password, function (err, user) {
        if (err) {
            res.status(500).send("Login Failed");
        } else {
            if (user == null) {
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
    db.register(data.email, data.username, data.password, function (err, user) {
        if (err) {
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
router.put('/profile', function (req, res) {
    var data = req.body;
    var userId = res.locals.user._id;
    db.updateProfile(data.name, data.gender, data.birthDate, data.email, userId, function (err, profile) {
        if (err) {
            console.log(err);
        } else {
            console.log("profile: ", profile);

        }
    });
});

router.post('/rating', function (req, res) {
    var data = req.body;
    var movieid = req.params.id;
    var userId = res.locals.user._id;
    console.log("rating: " + data.rating + ", userID: " + userId);
    db.addRating(userId, data.movieid, data.rating, function (err, rating) {
        if (err) {
            res.status(500).send("Unable to add rating.");

        } else {
            res.status(200).send("Rating saved!");

        }
    });
});

router.post('/favourites', function (req, res) {
    var data = req.body;
    var userId = res.locals.user._id;
    db.addFavourite(userId, data.movieid, function (err, favourites) {
        if (err) {
            res.status(500).send("Unable to add favourite.");

        } else {
            res.status(200).send("Saved into Favourites!");

        }
    });
});

router.get('/favourites/:id', function (req, res) {
    // var id = req.params.id;
    var userId = res.locals.user._id;
    db.getUserFavourites(userId, function (err, favourites) {
        if (err) {
            res.status(500).send("Unable to get favourite.");

        } else {
            res.status(200).send(favourites);

        }
    });
});

router.get('/:id', function (req, res) {
    res.sendFile(__dirname + "/views/movie.html");
});




module.exports = router;
