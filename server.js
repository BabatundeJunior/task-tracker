const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
const db = require('./db/connect');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Session setup for Passport (needed for OAuth flow)
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

// Initialize Passport
require('./auth/passport'); // your passport GoogleStrategy file
app.use(passport.initialize());
app.use(passport.session());

// Routes
const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Auth routes (Google OAuth login + callback)
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Connect DB and start server
db.initDb((err) => {
  if (err) console.error(err);
  else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
