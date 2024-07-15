require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 8000;
const userRouter = require("./Routes/userRouter");

const taskRouter = require("./Routes/taskRouter");

// api json
app.use(express.json());

// cors connector
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/user/", userRouter);

app.use("/api/task/", taskRouter);

// database connector
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// server listener
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server started in port ${port}`);
});
