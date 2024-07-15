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
    origin: "https://taskmanagerapp-client.onrender.com",
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN); // Specify the origin(s) that you want to allow
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// server listener
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server started in port ${port}`);
});
