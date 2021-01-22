const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /register
router.get('/register', function (req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function (req, res, next) {
  if (
    req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword
  ) {
    // confirm  that user typed the same password twice
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords do not match');
      err.status = 400;
      return next(err);
    }
    // create object with form input
    const userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password,
    };

    // use schema's `create` method to insert document into Mongo
    User.create(userData, (err, user) => {
      if (err) {
        return next(err);
      } else {
         req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('All fields are required');
    err.status = 400;
    return next(err);
  }
});

// GET /login
router.get('/login', function (req, res, next) {
  return res.render('login', { title: 'Log In' });
});

// POST /login
router.post('/login', function (req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (err, user) => {
      if (err || !user) {
        const err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('All fields are required');
    err.status = 401; // Unauthorized
    next(err);
  }
});

// GET /
router.get('/', function (req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function (req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function (req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
