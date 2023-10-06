const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/UserRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");


const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log({error: err}));
  
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);

app.listen(PORT, ()=> console.log(`Listening at http://localhost:${PORT}`));

