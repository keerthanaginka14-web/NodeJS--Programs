
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Demo secret for lab practice only
const JWT_SECRET = process.env.JWT_SECRET || "change-this-demo-secret";

app.get("/", (req, res) => {
  res.send("JWT Authentication API is running");
});

// Demo login credentials
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "student" && password === "12345") {
    const token = jwt.sign(
      { username: username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token: token
    });
  }

  res.status(401).json({ message: "Invalid username or password" });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. Token required."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Protected endpoint
app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Authorized access granted",
    user: req.user
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
