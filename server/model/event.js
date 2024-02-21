const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"이벤트 상품명을 입력해주세요!"],
    },
    description:{
        type: String,
        required:[true,"이벤트 상품 설명을 입력해주세요!"],
    },
    category:{
        type: String,
        required:[true,"이벤트 상품 카테고리를 입력하세요!"],
    },
    start_Date: {
        type: Date,
        required: true,
      },
      Finish_Date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        default: "Running",
      },
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        required: [true,"이벤트 상품 가격을 입력하세요!"],
    },
    stock:{
        type: Number,
        required: [true,"이벤트 제품 재고를 입력하세요!"],
    },
    images:[
        {
            type: String,
        },
    ],
    shopId:{
        type: String,
        required: true,
    },
    shop:{
        type: Object,
        required: true,
    },
    sold_out:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Event", eventSchema);