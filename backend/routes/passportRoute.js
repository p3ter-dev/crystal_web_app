// require('dotenv').config();
// const express = require('express');
// const passport = require('passport');
// require('../config/passportConfig');
// const router = express.Router();

// router.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     req.session.user = req.user;
//     res.redirect('/home');
//   }
// );

// module.exports = router;