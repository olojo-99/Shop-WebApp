var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Benshop' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page' })
});

router.get('/productindividual', function(req, res, next) {
  res.render('productindividual')
});

router.get('/basket', function(req, res, next) {
  res.render('basket', { title: 'Shopping Basket' })
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Checkout Basket' })
});

router.get('/order', function(req, res, next) {
  res.render('order', { title: 'Order' })
});

module.exports = router;
