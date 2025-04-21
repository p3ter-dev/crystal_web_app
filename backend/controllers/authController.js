const bcrypt = require('bcrypt');
const pool = require('../../database/config/contactDb');
const { validationResult } = require('express-validator');

const signUpController = async (req, res,) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('validation error', { 
            title: 'validation errors',
            errors: errors.array()
        });
    }
    
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).render('errors/fields-required');
    }

    if (password != confirmPassword) {
        return res.status(400).render('errors/password-mismatch');
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).render('errors/email-exists');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        console.log("signed up users: ", { username, email, hashedPassword });
        res.render('pages/success', { title: 'success page' });
    } catch (error) {
        console.error("signup error: ", error);
        res.status(500).render('errors/500', { title: 'server error' });
    }
}

exports.signUpController = signUpController;