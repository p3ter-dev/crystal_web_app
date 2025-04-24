const bcrypt = require('bcrypt');
const pool = require('../../database/config/contactDb');

const signUpController = async (req, res,) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).render('errors/fields-required', { title: 'fields required' });
    }

    if (password != confirmPassword) {
        return res.status(400).render('errors/password-mismatch', { title: 'password mismatch' });
    }

    try {
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (existingUser.rows.length > 0) {
            return res.status(400).render('errors/email-exists', { title: 'email exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email', 
            [username, email, hashedPassword]
        );

        const newUser = result.rows[0];
        req.session.user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };

        console.log("signed up users: ", req.session.user);
        res.status(200).render('pages/success', { title: 'success page' });
    } catch (error) {
        console.error("signup error: ", error);
        res.status(500).render('errors/500', { title: 'server error' });
    }
};

const logInController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).render('errors/fields-required', { title: 'fields required' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(400).render('errors/user-not-found', { title: 'invalid credentials' });
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('errors/user-not-found', { title: 'invalid credentials' });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        console.log("logged in users: ", req.session.user);
        res.redirect('/api/home');
    } catch(error) {
        console.error("login error: ", error);
        res.status(500).render('errors/500', { title: 'server error' });
    }
}

const logOutController = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("logout error: ", error);
            return res.status(500).render('errors/500', { title: 'server error' });
        }
        res.redirect('/api/home');
    });
};

exports.signUpController = signUpController;
exports.logInController = logInController;
exports.logOutController = logOutController;