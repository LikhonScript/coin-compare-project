const express = require("express");
const { spawn } = require("child_process");

const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var cors = require("cors");

// Use this after the variable declaration
//config
dotenv.config({ path: "backend/config/config.env" });
const port = process.env.PORT || 4000;
const router = require("./routes/productRoute");
const dbConnection = require("./database/db");
const userRouter = require("./routes/userRoute");
const adsrouter = require("./routes/adsRoute");
dbConnection();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "ran successfully",
  });
});
app.get("/Apecoin", async (req, res) => {
  try {
    const pythonProcess = spawn("python", ["Python/apecoin_test.py"]);
    var output = null;
    pythonProcess.stdout.on("data", (data) => {
      output = data;

      console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error executing Python script: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        res.send(output);
      } else {
        res.status(500).send("Error executing Python script");
      }
    });
  } catch (error) {
    console.error(`Error executing Python script: ${error}`);
    res.status(500).send("Error executing Python script");
  }
});
app.get("/bitcoin", async (req, res) => {
  try {
    const pythonProcess = spawn("python", ["Python/bitcoin_test.py"]);
    var output = null;
    pythonProcess.stdout.on("data", (data) => {
      output = data;

      console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error executing Python script: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        res.send(output);
      } else {
        res.status(500).send("Error executing Python script");
      }
    });
  } catch (error) {
    console.error(`Error executing Python script: ${error}`);
    res.status(500).send("Error executing Python script");
  }
});
app.get("/tether", async (req, res) => {
  try {
    const pythonProcess = spawn("python", ["Python/tether_test.py"]);
    var output = null;
    pythonProcess.stdout.on("data", (data) => {
      output = data;

      console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error executing Python script: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        res.send(output);
      } else {
        res.status(500).send("Error executing Python script");
      }
    });
  } catch (error) {
    console.error(`Error executing Python script: ${error}`);
    res.status(500).send("Error executing Python script");
  }
});

//routes
app.use("/api/v1", router);
app.use("/api/v1", userRouter);
app.use("/api/v1", adsrouter);

//creating server
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
