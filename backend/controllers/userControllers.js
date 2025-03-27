const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const homePage = (req, res, next) => {
    res.render('index.ejs', { title: "car wash service" });
}

const aboutPage = (req, res, next) => {
    res.render('pages/about', { title: "about page" });
}

const bookingPage = (req, res, next) => {
    res.render('pages/booking', { title: "book a car wash" });
}

exports.homePage = homePage;
exports.aboutPage = aboutPage;
exports.bookingPage = bookingPage;