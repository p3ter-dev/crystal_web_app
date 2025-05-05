require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/userRoutes');
const contactRoute = require('./routes/contact');
const authRoute = require('./routes/authRoutes');
const bookingRoute = require('./routes/bookingRoute');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use('/api', userRoutes);

app.use('/api/contact', contactRoute);

app.use('/api', authRoute);

app.use('/api', bookingRoute);

app.use((req, res) => {
    const error = new HttpError('sorry, could not find this route.', 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(404);
    res.render('pages/errors', {
        title: 'Error',
        message: 'Something went wrong.'
    });
});

module.exports = app;