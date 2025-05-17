require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../../database/config/contactDb');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async function(accessToken, refreshToken, profile, done) {
    const account = profile._json;
    const email = profile.emails[0].value;
    console.log(account);

    try {
      let userByGoogleId = await pool.query(
        'SELECT * FROM users WHERE google_id = $1',
        [profile.id]
      );

      if (userByGoogleId.rows.length > 0) {
        return done(null, userByGoogleId.rows[0]);
      }

      const userByEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userByEmail.rows.length > 0) {
        const updatedUser = await pool.query(
          'UPDATE users SET google_id = $1 WHERE email = $2 RETURNING *',
          [profile.id, email]
        );
        return done(null, updatedUser.rows[0]);
      }

      const newUser = await pool.query(
        'INSERT INTO users (google_id, username, email) VALUES ($1, $2, $3) RETURNING *',
        [profile.id, profile.displayName, profile.emails[0].value]
      );

      return done(null, newUser.rows[0]);

    } catch (err) {
      console.error("Error in GoogleStrategy:", err);
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(new Error('User not found'), null);
    }
  } catch (err) {
    done(err, null);
  }
});