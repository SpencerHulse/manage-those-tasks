const express = require("express");
const app = express();
const tasksRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasksRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to the DB...");
    app.listen(PORT, () => {
      console.log("The server is listening on port 3001...");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
