const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

// ================= DB =================
mongoose.connect("mongodb://127.0.0.1:27017/security-prac")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

// ================= SCHEMA =================
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\S+@\S+\.\S+$/.test(v)
    }
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

// ================= VULNERABLE API (for demo) =================
app.post("/login-vulnerable", async (req, res) => {
  const user = await User.findOne(req.body); // ❌ Injection possible

  if (user) {
    return res.send("Login success (INSECURE)");
  }

  res.send("Invalid credentials");
});

// ================= SECURE API =================
app.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).send("Invalid credentials");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).send("Invalid credentials");
      }

      res.send("Login successful ✅");

    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// ================= START =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});