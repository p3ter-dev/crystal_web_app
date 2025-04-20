const bcrypt = require('bcrypt');
const pool = require('../../database/config/contactDb');

const signUpController = async (req, res,) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).send("all fields are mandatory.");
    }

    if (password != confirmPassword) {
        return res.status(400).send("password do not match.");
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).send("Email is already in use.");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        console.log("signed up users: ", { username, email, hashedPassword });
        res.render('pages/success', { title: 'success page' });
    } catch (error) {
        console.error("signup error: ", error);
        res.status(500).send("something went wrong, please try again.");
    }
}

exports.signUpController = signUpController;