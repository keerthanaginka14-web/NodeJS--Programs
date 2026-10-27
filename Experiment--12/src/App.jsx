

import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("Home");
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function registerStudent(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage("Please enter name and email.");
      return;
    }

    setStudents([...students, { name, email }]);
    setMessage("Student registered successfully!");
    setName("");
    setEmail("");
  }

  return (
    <div className="app">
      <header>
        <h1>Student Management</h1>
        <nav>
          {["Home", "Register", "Contact", "About"].map((item) => (
            <button key={item} onClick={() => {
              setPage(item);
              setMessage("");
            }}>
              {item}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {page === "Home" && (
          <>
            <h2>Welcome</h2>
            <p>Student Management Application using React.</p>
            <h3>Registered Students</h3>
            {students.length === 0 ? (
              <p>No students registered yet.</p>
            ) : (
              <ul>
                {students.map((student, index) => (
                  <li key={index}>
                    {student.name} — {student.email}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {page === "Register" && (
          <>
            <h2>Student Registration</h2>
            <form onSubmit={registerStudent}>
              <input
                placeholder="Enter student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Register</button>
            </form>
            <p>{message}</p>
          </>
        )}

        {page === "Contact" && (
          <>
            <h2>Contact Us</h2>
            <p>Email: student@example.com</p>
          </>
        )}

        {page === "About" && (
          <>
            <h2>About</h2>
            <p>This app manages student registration using React.</p>
          </>
        )}
      </main>
    </div>
  );
}
