const express = require("express");
const app = express();
const tasksRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

// middleware
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasksRoutes);

const PORT = process.env.PORT || 3001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to the DB...");
    app.listen(PORT, (req, res) => {
      console.log("The server is listening on port 3001...");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
