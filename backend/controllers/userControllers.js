const homePage = (req, res) => {
    const user = req.session.user;
    res.render('pages/home', { title: "car wash home page", user });
}

const aboutPage = (req, res) => {
    res.render('pages/about', { title: "about page" });
}

const bookingPage = (req, res) => {
    res.render('pages/booking', { title: "book a car wash" });
}

const loginPage = (req, res) => {
    res.render('pages/login', { title: "login page" });
}

const signupPage = (req, res) => {
    res.render('pages/signup', { title: "signup page" });
}

const servicePage = (req, res) => {
    res.render('pages/service', { title: "services we provide" });
}

const contactPage = (req, res) => {
    res.render('pages/contact', { title: "contact us" });
}

const profilePage = (req, res) => {
    const { username, email } = req.session.user;
    if (!req.session.user) {
        return res.redirect('/api/login');
    }
    res.render('pages/profile', { title: "user profile", username, email });
}

exports.homePage = homePage;
exports.aboutPage = aboutPage;
exports.bookingPage = bookingPage;
exports.loginPage = loginPage;
exports.signupPage = signupPage;
exports.servicePage = servicePage;
exports.contactPage = contactPage;
exports.profilePage = profilePage;