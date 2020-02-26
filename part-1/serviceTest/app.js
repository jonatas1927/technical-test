var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const request = require('supertest');

var indexRouter = require('./routes/index');



var app = express();

var actualTree = {}
var changeActualTree = function (newTree) {
    actualTree = newTree;
}

app.use((req, res, next) => {
    req.actualTree = actualTree;
    req.changeActualTree = changeActualTree;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);

app.use((req, res, next) => {
})
request(app)
    .get('/123456')
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect('Content-Length', '2')
    .expect(200)
    .end(function (err, res) {
        console.log('Tested')
        if (err) throw err;
    });


request(app)
    .get('/123456')
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect('Content-Length', '9')
    .expect(403)
    .end(function (err, res) {
        console.log('Tested')
        if (err) throw err;
    });


module.exports = app;
