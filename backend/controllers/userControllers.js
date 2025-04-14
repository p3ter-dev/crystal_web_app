const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const homePage = (req, res) => {
    res.render('pages/home', { title: "car wash home page", session: req.session });
}

const aboutPage = (req, res) => {
    res.render('pages/about', { title: "about page" });
}

const bookingPage = (req, res) => {
    res.render('pages/booking', { title: "book a car wash" });
}

const loginPage = (req, res) => {
    res.render('pages/login', { title: "login page" });
}

const signupPage = (req, res) => {
    res.render('pages/signup', { title: "signup page" });
}

const servicePage = (req, res) => {
    res.render('pages/service', { title: "services we provide" });
}

const contactPage = (req, res) => {
    res.render('pages/contact', { title: "contact us" });
}
exports.homePage = homePage;
exports.aboutPage = aboutPage;
exports.bookingPage = bookingPage;
exports.loginPage = loginPage;
exports.signupPage = signupPage;
exports.servicePage = servicePage;
exports.contactPage = contactPage;