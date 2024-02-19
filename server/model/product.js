const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"제품명을 입력해주세요!"],
    },
    description:{
        type: String,
        required:[true,"제품 설명을 입력하세요!"],
    },
    category:{
        type: String,
        required:[true,"제품 카테고리를 입력하세요!"],
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        required: [true,"제품 가격을 입력하세요!"],
    },
    stock:{
        type: Number,
        required: [true,"제품 재고를 입력하세요!"],
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

module.exports = mongoose.model("Product", productSchema);