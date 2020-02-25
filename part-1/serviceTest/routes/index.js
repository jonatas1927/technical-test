var express = require('express');
var router = express.Router();
var _ = require('lodash');

/* GET home page. */
router.get('/:hash', function (req, res, next) {
  verifyIfExists(req, res);
});

module.exports = router;

function verifyIfExists(req, res) {
  let actualTree = req.actualTree;
  const hash = req.params.hash;
  let hashBreaked = hash.split('');
  let string = "";
  hashBreaked.map(val => {
    string = string + "." + val
  })
  var lastOfTree = _.get(actualTree, string, null)
  if (!lastOfTree) {
    _.set(actualTree, string, new Date());
    res.sendStatus(200);
  } else {
    var dataRequest = new Date(lastOfTree);
    var agora = new Date();
    let diferenca = ((agora - dataRequest) / 1000) / 60;
    if (diferenca > 10) {
      _.set(actualTree, string, new Date());
      res.sendStatus(200);
    } else {
      res.sendStatus(403)
    }
  }
  console.log(JSON.stringify(actualTree))
  req.changeActualTree(actualTree)
}
