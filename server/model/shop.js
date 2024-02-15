const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "판매처 이름을 입력해 주세요!"],
  },
  email: {
    type: String,
    required: [true, "판매처 email을 입력해 주세요!"],
  },
  password: {
    type: String,
    required: [true, "비밀번호는 필수입니다!"],
    minLength: [6, "6자리 이상의 비밀번호를 입력해 주세요"],
    select: false,
  },
  description:{
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "Seller",
  },
  avatar: {
    type: String,
    required: true,
  },
  zipCode:{
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password
shopSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

  // jwt token
  shopSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

  // comapre password
  shopSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };



module.exports = mongoose.model("Shop", shopSchema)