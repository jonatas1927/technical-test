var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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

module.exports = app;
