var express = require('express');
var router = express.Router();
const http = require('http');
var CryptoJS = require("crypto-js");



router.get('/:params', function (req, res, next) {
  var hash = geraHash(req.params)
  validaHash(hash, res, req);
});

router.post('/', function (req, res, next) {
  var hash = geraHash(req.body)
  validaHash(hash, res, req);
});


module.exports = router;

function validaHash(hash, res, req) {
  http.get(req.linkValida + hash, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.sendStatus(resp.statusCode);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

function geraHash(val) {
  return CryptoJS.HmacSHA1(JSON.stringify(val), "Key");
}

