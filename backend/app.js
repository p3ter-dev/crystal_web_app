require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const contactRoute = require('./routes/contact');
const authRoute = require('./routes/authRoutes');
const passportRoute = require('./routes/passportRoute');
const bookingRoute = require('./routes/bookingRoute');
const path = require('path');
const app = express();
const passport = require('passport');
require('./config/passportConfig');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

app.use(express.static(path.join(__dirname, "../public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// app.use(session({
//   store: new pgSession({
//     pool: pgPool,
//     tableName: 'session',
//   }),
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   }
// }));

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

app.use(bookingRoute);

app.use((req, res) => {
  res.status(404).render('pages/errors', {
    title: '404 Not Found',
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('errors/500', {
    title: 'server error',
  });
});

module.exports = app;