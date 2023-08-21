const express = require("express");
const app = express();

// Define routes and middleware here
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
