const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
const { check } = require('express-validator');

router.get('/home', userControllers.homePage);

router.get('/booking', userControllers.bookingPage);

router.get('/about', userControllers.aboutPage);

router.get('/login', userControllers.loginPage);

router.get('/signup', userControllers.signupPage);

module.exports = router;
