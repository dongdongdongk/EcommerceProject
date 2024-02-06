const express = require("express");
const ErrorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
app.use("/", express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: true }));




// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "server/config/.env",
    });
  }




  // 라우터 부분
const user = require("./controller/user")

app.use("/api/v2/user", user)

// 에러 핸들링 
app.use(ErrorHandler);

module.exports = app