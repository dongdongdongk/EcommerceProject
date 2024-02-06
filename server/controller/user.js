const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const fs = require("fs");
const ErrorHandler = require("../util/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../util/sendMail");
const sendToken = require('../util/jwtToken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "계정 활성화",
        message: `안녕하세요 ${user.name}님, 계정을 활성화하려면 다음 링크를 클릭해주세요: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `이메일(${user.email})을 확인하여 계정을 활성화해주세요!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
    "/activation",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
        const newUser = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  
        if (!newUser) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar } = newUser;
  
        let user = await User.findOne({ email });
  
        if (user) {
          return next(new ErrorHandler("User already exists", 400));
        }
        user = await User.create({
          name,
          email,
          avatar,
          password,
        });
  
        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

module.exports = router;
