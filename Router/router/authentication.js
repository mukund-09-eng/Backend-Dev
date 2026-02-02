import express from "express";
const app = express();

function authorize(req, res, next) {
  const token = req.query.token;

  if (token === "admin123") {
    next();
  } else {
    res.status(401).json({
      error: "Unauthorized access"
    });
  }
}

app.get("/profile", authorize, (req, res) => {
  res.json({
    message: "Welcome to profile page"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
