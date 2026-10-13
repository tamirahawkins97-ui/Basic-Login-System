# Basic Login System

A simple Node.js authentication API for user registration and login using Express, MongoDB, Mongoose, JWT, and bcrypt.

## Overview

This project provides a lightweight backend for managing users in a MongoDB database. It supports:

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- MongoDB connection setup with environment variables

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt
- jsonwebtoken
- dotenv

## Project Structure

```text
Basic-Login-System/
├── db/
│   └── connection.js
├── models/
│   └── User.js
├── routes/
│   └── UserRoutes.js
├── .env
├── package.json
├── server.js
└── README.md
```

## Features

- Secure password storage using bcrypt hashing
- JWT generation for authenticated sessions
- Email uniqueness validation during registration
- Basic error handling for duplicate users and invalid login attempts
- Environment-based MongoDB and JWT configuration

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or later recommended)
- MongoDB running locally or a MongoDB connection string

## Installation

1. Clone the repository:

```bash
git clone https://github.com/tamirahawkins97-ui/Basic-Login-System.git
cd Basic-Login-System
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add the following variables:

```env
PORT=3409
MONGO_URI=mongodb://localhost:27017/login-system
JWT_SECRET=your_jwt_secret_here
```

If you use a different MongoDB URI variable name, the project also supports `MONGO_URI2`.

## Running the Application

Start the server with:

```bash
node server.js
```

Or use nodemon for automatic restarts during development:

```bash
npx nodemon server.js
```

The API will run at:

```text
http://localhost:3409
```

## API Endpoints

### Register a user

```http
POST /api/users/register
```

Request body:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login a user

```http
POST /api/users/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Successful login response:

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

## Authentication Behavior

- Passwords are hashed before being stored in MongoDB.
- Login compares the submitted password to the stored hash using bcrypt.
- A JWT is returned on successful login and includes the user ID and username.

## Notes

- The default database name is `login-system`.
- The server uses `process.env.PORT || 3409` and `process.env.JWT_SECRET || 'dev-secret'` as fallbacks.
- No automated test script is currently configured in `package.json`.

## License

This project is licensed under the ISC License.
