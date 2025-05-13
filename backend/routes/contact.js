const express = require('express');
const router = express.Router();
const pool = require('../../database/config/contactDb');

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).send("sorry, All fields are required!");
    }

    try {
        await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
            [name, email, message]
        );
        console.log("feedback received: ", { name, email, message});
        res.render('pages/thank-you.ejs', { title: 'thank you' });
    }

    catch (error) {
        console.error("Error inserting feedback: ", error);
        res.status(500).send("sorry, something went wrong try again later.");
    }
});

module.exports = router;