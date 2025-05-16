const pool = require("../../database/config/contactDb");

const bookingController = async (req, res) => {
    let {name, email, carModel, date, serviceType} = req.body;
    email = email.trim().toLowerCase();
    if (!name || !email || !carModel || !date || !serviceType) {
        return res.status(400).render("errors/fields-required", { title: "fields required" });
    }

    try {
        const existingUser = await pool.query(
            'SELECT * FROM bookings WHERE email = $1 AND preferred_date = $2',
            [email, date]
        )
        if (existingUser.rows.length > 0) {
            return res.status(400).render('errors/email-exists', { title: 'Booking already exists' });
        }

        const result = await pool.query(
            'INSERT INTO bookings (name, email, car_model, preferred_date, service_type) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, car_model, preferred_date, service_type',
            [name, email, carModel, date, serviceType]
        );
        const newBooking = result.rows[0];
        req.session.booking = {
            id: newBooking.id,
            username: newBooking.name,
            email: newBooking.email,
            carModel: newBooking.car_model,
            date: newBooking.preferred_date,
            service: newBooking.service_type,
        };
        console.log("Bookings: ", req.session.booking);
        res.status(200).render('pages/success', { title: 'Booking Success' });

    } catch(error) {
        console.error("booking error: ", error);
        res.status(500).render("errors/500", { title: "server error" });
    }
}

exports.bookingController = bookingController;