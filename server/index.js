const express = require("express");
const ErrorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
app.use("/", express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static('images'));


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "server/config/.env",
    });
  }




  // 라우터 부분
const user = require("./controller/user")
const shop = require("./controller/shop")
const product = require("./controller/product")
const event = require("./controller/event");
const coupon = require("./controller/couponCode");
const order = require("./controller/order");

app.use("/api/v2/user", user)
app.use("/api/v2/shop", shop)
app.use("/api/v2/product", product)
app.use("/api/v2/event", event)
app.use("/api/v2/coupon", coupon)
app.use("/api/v2/order", order);

// 에러 핸들링 
app.use(ErrorHandler);

module.exports = app