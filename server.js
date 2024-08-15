const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const nocache = require('nocache');
const userRoute = require('./router/user');

const app = express();

// Middleware setup
app.use(express.static('public')); // Serve static files from the 'public' directory
app.set('view engine', 'hbs'); // Set Handlebars as the template engine
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Session configuration
app.use(session({
    secret: 'keyboard cat', // Secret for signing the session ID cookie
    resave: false, // Prevent session from being saved back to the session store if it wasn’t modified during the request
    saveUninitialized: true, // Force a session that is "uninitialized" to be saved to the store
    cookie: { maxAge: 60000 } // Set session expiry to 1 minute (optional)
}));

app.use(nocache()); // Prevent client-side caching

// Use the userRoute for handling routes
app.use('/', userRoute);

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
