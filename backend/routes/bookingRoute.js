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
    check('password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long').trim(),
    check('carModel')
        .notEmpty()
        .withMessage('car model is required'),
    check('date')
        .notEmpty()
        .withMessage('date is required'),
    check('service')
        .notEmpty()
        .withMessage('service is required')
], bookingController.bookingController);
