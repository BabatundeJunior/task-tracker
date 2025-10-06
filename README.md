Task Tracker API

This project is a Node.js + Express API with MongoDB that supports CRUD operations on tasks and users, with OAuth 2.0 (Google) authentication and JWT-based authorization. Swagger is included for interactive documentation.


Live Links

Render Deployment: https://task-tracker-kl7r.onrender.com/api-docs
Render to login to get JWT Token: https://task-tracker-kl7r.onrender.com/auth/google/callback

GitHub Repository: 


--Features

Task CRUD (Create, Read, Update, Delete)

User CRUD (Create, Read, Update, Delete)

OAuth 2.0 authentication with Google

JWT authorization for protected routes

Swagger UI API documentation

MongoDB Atlas integration

-- Authentication

Visit https://task-tracker-kl7r.onrender.com/auth/google/callback to log in with Google.

Copy the returned JWT token.

Use the token in the Swagger “Authorize” popup to access protected routes.

 Endpoints
--Tasks Collection

GET /tasks → Get all tasks

GET /tasks/{id} → Get a task by ID

POST /tasks → Create a task (requires JWT)

PUT /tasks/{id} → Update a task (requires JWT)

DELETE /tasks/{id} → Delete a task (requires JWT)

--Users Collection.

GET /users → Get all users (requires JWT)

GET /users/{id} → Get a user by ID (requires JWT)

POST /users → Create a user (requires JWT)

PUT /users/{id} → Update a user (requires JWT)

DELETE /users/{id} → Delete a user (requires JWT)

 --Tech Stack

Node.js

Express.js

MongoDB Atlas

Passport.js (Google OAuth)

JSON Web Token (JWT)

Swagger (OpenAPI 3.0)
