const express = require("express");
const app = express();
const PORT = 6969;

app.get("/api/name", (req, res) => {
  res.json({
    name: "Shubham Krishan",
    version: "sopho/2.0",
    purpose: "Wants to work with TSG tech team",
    contact: "shubhamkrishan999@gmail.com",
    application: "Secretary Web",
    Department: "Mathematics",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:`);
});
