
# Experiment 10: Student REST API

## Aim
To develop an Express web application that performs CRUD
operations on student data using a REST API.

## Technologies
- Node.js
- Express.js
- Postman

## API Endpoints

| Method | Endpoint | Operation |
|---|---|---|
| GET | /students | View all students |
| GET | /students/1 | View one student |
| POST | /students | Add a student |
| PUT | /students/1 | Update a student |
| DELETE | /students/1 | Delete a student |

## How to Run
1. Install Node.js.
2. Open a terminal in this folder.
3. Run: npm install
4. Run: npm start
5. Test the endpoints using Postman at localhost:3000.

## Result
A REST API demonstrates student CRUD operations.

## Note
This example stores data in memory. Records reset when
the server restarts.
