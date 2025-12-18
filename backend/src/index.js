const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

// اتصال به دیتابیس
connectDB();
app.use(cors());
app.use(express.json());
const todoRoutes = require("./routes/todoRoutes");

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
