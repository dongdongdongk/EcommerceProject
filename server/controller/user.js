const express = require("express");
const path = require("path")
const router = express.Router();
const { upload } = require('../multer');
const User = require("../model/user");
const ErrorHandler = require("../util/ErrorHandler");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    const {name, email, password} = req.body
    console.log(req.body)
    const userEmail = await User.findOne({email})

    if(userEmail) {
        return next(new ErrorHandler('유저가 이미 존재합니다',400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    console.log(filename)
    console.log(fileUrl)

    const user = {
        name : name,
        email : email,
        password : password,
        avatar : fileUrl,
    };

    console.log(user);
})

module.exports = router;