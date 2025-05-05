const bcrypt = require("bcrypt");
const pool = require("../../database/config/contactDb");

const bookingController = async (req, res) => {
    const {name, email, password, carModel, date, service} = req.body;
    if (!name || !email || !password || !carModel || !date || !service) {
        return res.status(400).render("errors/fields-required", { title: "fields required" });
    }

    try {

    } catch(error) {
        console.error("booking error: ", error);
        res.status(500).render("errors/500", { title: "server error" });
    }
}

exports.bookingController = bookingController;