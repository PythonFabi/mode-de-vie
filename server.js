// Import the required modules
const express = require("express");
const exphbs = require("express-handlebars");

const path = require('path');
const routes = require('./controllers');  //imports the routes from the ./controllers


const session = require('express-session');     // imports 'express-session' middleware. It is used for amanaging user sessions. Sessions store specific data to a user
const sequelize = require('./config/connection');   //imports a instance of sequelize that connection.js sets up and exports, and is connected to the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);     //imports 'connect-session-sequelize' module and calls it with 'session.Store'. It is used to store express session data to sql database, that can save sessions on server restart.

// Create an instance of Express
const app = express();
const port = 3000; // Set the port you want the server to listen on

const hbs = exphbs.create({});  //creates a new instance of express handlebars

<<<<<<< HEAD
=======
const { User } = require("./models");

// Should be controlled by a Auth check function
// If true, the user will be directed to the homepage route "/"
// If false, the user will be directed to the login route "/login"
const isAuthenticated = true;

// Middleware function to check if the user is logged in
function checkLoggedIn(req, res, next) {
  // Create local variables to hide static layout elements on the login page. (navbar, sidebar, etc.)
  res.locals.showNavbar = isAuthenticated;
  res.locals.showSidebar = isAuthenticated;

  if (isAuthenticated) {
    // User is logged in, proceed to the next middleware or route handler
    next();
  } else {
    // User is not logged in, redirect to the login page
    res.redirect("/login");
  }
};

>>>>>>> 50e12ed6041d4e9abbc7af065623f7cbc52c2b74
const sess = {
  secret: 'Super secret secret',
  cookie: {   //cookie setting;
    maxAge: 30000000,   //the max time (is ms) until the cookie expires
    httpOnly: true,   //
    secure: false,    //set to false, so cookie will not be sent over HTTPS
    sameSite: 'strict',   //a measure to mitigate cross-site request forgery. set to strict, so 
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));     //adds the configured session as middleware to the express app.


// Set up the Handlebars view engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    extname: ".handlebars", // You can use ".hbs" as the extension if preferred
  })
);
app.set("view engine", "handlebars");

// Set up the public directory to serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));    //middleware to allow bootstrap to be accessible to public

<<<<<<< HEAD
=======
// Define the base route, runs login check before rendering
app.get("/", checkLoggedIn, (req, res) => {
  res.render("homepage");
});

// Define the login route
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/user/:username", checkLoggedIn, async (req, res) => {
  try {
    const user = await User.findByUsername(req.params.username);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    // Render the user profile template and pass the user data as context
    res.render("userprofile", { user: userData, layout: "main" });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
});


>>>>>>> 50e12ed6041d4e9abbc7af065623f7cbc52c2b74
app.use(routes);

// Start the server
sequelize.sync({ force: false}).then(() => {    //syncs sequelize to the database. {force: false} means that Sequelize won't make any changes to the tables if they already exist.
  //if true, it will drop and recreate the tables.
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
