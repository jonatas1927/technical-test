var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
const keyCripto = '3f00b5dc-4b97-4705-95a8-985d6097c1e0'
app.use((req, res, next) => {
    req.key = keyCripto;
    req.linkValida = "http://localhost:5555/"
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
