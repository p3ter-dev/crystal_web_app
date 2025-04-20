const bcrypt = require('bcrypt');
const pool = require('../../database/config/contactDb');
const HttpError = require('../models/http-error');

const signUpController = async (req, res,) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        throw new HttpError('all fields are mandatory', 422);
    }

    if (password != confirmPassword) {
        return res.status(400).send("password do not match.");
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            throw new HttpError('user already exists, please login', 422);
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        console.log("signed up users: ", { username, email, hashedPassword });
        res.render('pages/success', { title: 'success page' });
    } catch (error) {
        console.error("signup error: ", error);
        throw new HttpError('something went wrong, please try again', 500);
    }
}

exports.signUpController = signUpController;