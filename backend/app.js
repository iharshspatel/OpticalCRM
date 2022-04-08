const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const errorMiddleware = require('./middleware/error')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

const cors = require('cors');
const path = require("path")
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_ENV!=="PRODUCTION"){
  dotenv.config({ path: "backend/config/config.env" });
}
const port = process.env.PORT || 3000;


mongoose.connect(process.env.DBPATH, { useNewUrlParser: true }).then(()=>{
  console.log(`Database is Connected at ${process.env.DBPATH} `)
});

//Routes
const customer = require("./Routes/customerRoute")
const order = require("./Routes/orderRoute")
const client = require("./Routes/ClientRoute")
app.use("/api", customer);
app.use("/api", order);
app.use("/api", client);
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});



const server = app.listen(process.env.PORT, function (Req, res) {
  console.log(`server started at port ${process.env.PORT}.`)
})
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
