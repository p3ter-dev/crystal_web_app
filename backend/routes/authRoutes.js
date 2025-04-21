const express = require('express');
const authControllers = require('../controllers/authController');
const { check } = require('express-validator');
const router = express.Router();

router.post('/signup', [
    check('username')
        .notEmpty()
        .withMessage('username is required'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('please enter a valid email address'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long').trim(),
    check('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('passwords do not match')
], authControllers.signUpController);

module.exports = router;