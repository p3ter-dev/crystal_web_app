const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).send("Sorry, All fields are required!");
    }

    console.log("feedback received: ", { name, email, message});
    res.render('pages/thank-you.ejs', { title: 'thank you' });
});

module.exports = router;