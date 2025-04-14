const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).send("Sorry, All fields are required!");
    }

    console.log("feedback received: ", { name, email, message});
    res.send("<h1>Thank you for contacting us!</h1>");
});

module.exports = router;