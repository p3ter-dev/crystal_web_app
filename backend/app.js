require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/userRoutes');
const contactRoute = require('./routes/contact');
const authRoute = require('./routes/authRoutes');
const passportRoute = require('./routes/passportRoute');
const bookingRoute = require('./routes/bookingRoute');
require('./config/passportConfig');
const path = require('path');
const app = express();
const passport = require('passport');

app.use(express.static(path.join(__dirname, "../public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(userRoutes);

app.use(contactRoute);

app.use(authRoute);

app.use(passportRoute);

module.exports = app;