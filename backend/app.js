const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const HttpError = require('./models/http-error');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRoutes);

app.use((req, res, next) => {
    const error = new HttpError('sorry, could not find this route.', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({
        message: error.message || "An unknown error has been occurred!"
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})