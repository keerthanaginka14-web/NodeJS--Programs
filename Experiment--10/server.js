
const express = require("express");

const app = express();
app.use(express.json());

let students = [
    { id: 1, name: "Ravi", age: 20 },
    { id: 2, name: "Sita", age: 21 }
];

// GET: View all students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET: View one student
app.get("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// POST: Add a student
app.post("/students", (req, res) => {
    const { id, name, age } = req.body;

    if (id == null || !name || age == null) {
        return res.status(400).json({
            message: "Please provide id, name and age"
        });
    }

    if (students.some(s => s.id === Number(id))) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const student = { id: Number(id), name, age: Number(age) };
    students.push(student);

    res.status(201).json(student);
});

// PUT: Update a student
app.put("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, age } = req.body;

    if (name !== undefined) student.name = name;
    if (age !== undefined) student.age = Number(age);

    res.json(student);
});

// DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1)[0];
    res.json({
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
