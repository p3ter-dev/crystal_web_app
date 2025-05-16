const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { check } = require('express-validator');

router.post('/bookings', [
    check('name')
        .notEmpty()
        .withMessage('name is required'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('please enter a valid email address'),
    check('carModel')
        .notEmpty()
        .withMessage('car model is required'),
    check('date')
        .notEmpty()
        .withMessage('date is required'),
    check('serviceType')
        .notEmpty()
        .withMessage('service is required')
], bookingController.bookingController);

module.exports = router;