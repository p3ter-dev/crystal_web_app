const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
const { check } = require('express-validator');

router.get('/home', userControllers.homePage);

router.get('/bookings', userControllers.bookingPage);

router.get('/about', userControllers.aboutPage);

module.exports = router;