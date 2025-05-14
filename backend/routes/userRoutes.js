const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.get('/', userControllers.homePage);

router.get('/home', userControllers.homePage);

router.get('/booking', userControllers.bookingPage);

router.get('/about', userControllers.aboutPage);

router.get('/login', userControllers.loginPage);

router.get('/signup', userControllers.signupPage);

router.get('/services', userControllers.servicePage);

router.get('/contact', userControllers.contactPage);

router.get('/profile', userControllers.profilePage);

module.exports = router;