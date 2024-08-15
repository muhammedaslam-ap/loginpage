const express = require('express');
const user = express.Router();

// Mock credentials
const EMAIL = "admin@gmail.com";
const PASSWORD = "admin123";

// Route to handle the login page
user.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/home'); // Redirect to home if already logged in
    }
    const msg = req.session.passwordWrong ? "Invalid Credentials" : null;
    req.session.passwordWrong = false; // Clear the error flag after rendering the login page
    res.render('login', { msg }); 
});

// Route to handle login form submission
user.post('/verify', (req, res) => {
    const { email, password } = req.body;
    
    if (email === EMAIL && password === PASSWORD) {
        req.session.user = email;
        req.session.passwordWrong = false; // Clear the error flag
        return res.redirect('/home'); // Redirect to home page
    } else {
        req.session.passwordWrong = true; // Set error flag
        return res.redirect('/'); // Redirect back to login page
    }
});

// Route to handle home page
user.get('/home', (req, res) => {
    if (req.session.user) {
        return res.render('home'); // Render the home page if logged in
    }
    res.redirect('/'); // Redirect to login if not logged in
});

// Route to handle logout
user.get('/logout', (req, res) => {
    req.session.destroy()
        res.render('login', { msg2: "Logged Out" }); // Render the login page with a logout message
    });


module.exports = user;
