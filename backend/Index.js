const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/UserRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");

//mas mapadali ang pag create natin ng REST API
const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

//connection to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log({error: err}));

//gingamit natin yung mga end points na ginawa natin as REST API
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);

//create a server
app.listen(PORT, ()=> console.log(`Listening at http://localhost:${PORT}`));

