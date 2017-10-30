var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express X' });
});


router.get('/info', function(req, res, next) {
  var info = process.env.MYSQLCONNSTR_localdb;
  res.render('index', { title: 'Info', info: info});
});


module.exports = router;
