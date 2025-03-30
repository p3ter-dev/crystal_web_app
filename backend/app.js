const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.use((req, res,) => {
    const error = new HttpError('sorry, could not find this route.', 404);
    return next(error);
})

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({
        message: error.message || "An unknown error has been occurred!"
    })
})

module.exports = app;