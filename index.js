//IMPORTS
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

const notesHandler = require("./routes/notes.route");
const connectDB = require("./config/db");

//MIDDLEWARE
app.use(cors());
app.use(express.json());
dotenv.config();

//DATABASE CONNECT
connectDB();

app.get("/", (req, res) => {
  res.send("my-notes is running");
});

app.use("/api/v1/notes", notesHandler);

//LISTENER
app.listen(port, () => {});
