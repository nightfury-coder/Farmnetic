const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = 5000;

// Connect to DB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/officers", require("./routes/officers"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
