
# Experiment 11: JWT Authentication

## Aim
To implement authorized endpoints using JSON Web Tokens (JWT).

## Requirements
- Node.js
- Express
- jsonwebtoken
- Postman

## Installation
npm install

## Run
npm start

## Demo Login
POST http://localhost:3000/login

Body (JSON):
{
  "username": "student",
  "password": "12345"
}

## Protected Endpoint
GET http://localhost:3000/profile

Add this header:
Authorization: Bearer YOUR_TOKEN

## Result
JWT authentication and protected endpoint are implemented successfully.
