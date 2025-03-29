const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const homePage = (req, res) => {
    res.render('pages/home', { title: "car wash home page" });
}

const aboutPage = (req, res) => {
    res.render('pages/about', { title: "about page" });
}

const bookingPage = (req, res) => {
    res.render('pages/booking', { title: "book a car wash" });
}

exports.homePage = homePage;
exports.aboutPage = aboutPage;
exports.bookingPage = bookingPage;