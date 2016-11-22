var db = require('./db');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser())

app.get('/', function(req, res) {
    res.sendfile('./public/html/index.html')
});

app.get('/add', function(req, res) {
    res.sendfile('./public/html/add.html')
});

app.get('/list', function(req, res, next) {
    db.all('SELECT * FROM cars', function(err, row) {
        if (err !== null) {
            next(err);
        } else {
            console.log(row);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(row));
        }
    });
});

app.post('/add', function(req, res, next) {
    var name = req.body.name;
    var year = req.body.year;
    var driven = req.body.driven;
    sqlRequest = "INSERT INTO 'cars' (name, year, driven) " +
        "VALUES('" + name + "', '" + year + "', '" + driven + "')"
    db.run(sqlRequest, function(err) {
        if (err !== null) {
            next(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/remove/:id', function(req, res, next) {
    db.run("DELETE FROM `cars` WHERE id='" + req.params.id + "'",
        function(err) {
            if (err !== null) {
                next(err);
            } else {
                res.redirect('/');
            }
        });
});

app.listen(9000, function() {
    console.log('App listening on port 9000!');
});
