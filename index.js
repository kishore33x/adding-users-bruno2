const express = require("express");
const bcrypt = require("bcrypt");
const users = require("./users"); // importing dummy users

const app = express();
app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if both fields are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if user exists
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ error: "Incorrect password." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
