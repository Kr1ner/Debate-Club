const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth0");
const userRoute = require("./routes/users");

dotenv.config();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Database connected"))
    .catch((err) => console.log(err));

app.use("/api/auth" , authRoute);
app.use("/api/users" , userRoute);

app.listen("5000" , () => {
    console.log("Lol Trol!")
})