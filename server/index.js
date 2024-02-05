const express = require("express");
const ErrorHandler = require("./util/ErrorHandler")
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({useTempFiles:true}));


// 에러 핸들링 
app.use(ErrorHandler);

module.exports = app