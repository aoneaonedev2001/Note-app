const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());

// Route #1
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/notes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
