require("dotenv").config();
const express = require("express");
const ngrok = require("ngrok");
const app = express();
const connect = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 8080;

console.log(process.env.PORT, "PORT");

// Parsing JSON
app.use(express.json());

// CORS
app.use(cors());

// Controllers
const userRouter = require("./controller/user.controller");
const bikeRouter = require("./controller/bike.controller");
const locationRouter = require("./controller/location.controller");
const rentalRouter = require("./controller/rental.controller");
const monthRouter = require("./controller/month.controller");

// Routes
app.use("/", userRouter);
app.use("/", bikeRouter);
app.use("/", locationRouter);
app.use("/", rentalRouter);
app.use("/", monthRouter);

app.get("/", async (req, res) => {
  res.send("Welcome to the server");
});

async function start() {
  await connect();
  app.listen(port, async () => {
    console.log(`Listening on port ${port}`);

    // Start ngrok and get the public URL
    const url = await ngrok.connect(port);
    console.log(`ngrok URL: ${url}`);
  });
}

start();
