var Product = require('./models/product');

var User = require('./models/user');

var jwt = require('jsonwebtoken');

const serverJWTSecret = '7pTxN5k752fjHFEJ58LfrY;';

const validateToken = function(req, res, next) {
    const token = req.body.token;        
    if(token) {
        jwt.verify(token, serverJWTSecret, (err, decoded) => {
            if(err) {
                res.sendStatus(403);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

module.exports = function (app) {
    app.get('/products', function (req, res) {
        Product.find(function (err, products) {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    });

    app.put('/product/id', function (req, res) {
        Product.findById(req.body.id, function (err, products) {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
        console.log('put product/id');
    });

    app.put('/product/new', validateToken, function (req, res) {
        Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            createdBy: req.body.createdBy
        }, function (err) {
            if (err) {
                res.send(err);
            }
        });
        console.log('put /product/new');
    });

    app.post('/login', function (req, res) {
        User.findOne({ login: req.body.login, password: req.body.password },
            function (err, users) {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign(users.login, serverJWTSecret);                
                res.status(200).send({
                    user: users.login,
                    token: token
                });
            })
        console.log('post /login');
    });
}