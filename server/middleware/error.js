const ErrorHandler = require("../util/ErrorHandler")

// 에러 핸들러 미들웨어
module.exports = (err, req, res, next) => {
    // 기본적으로 서버 오류로 설정
    err.statusCode = err.statusCode || 500
    err.message = err.message || "서버 오류"

    // CastError: 잘못된 자료형으로 인한 오류 처리
    if (err.name === "CastError") {
        const message = `해당 ID의 리소스를 찾을 수 없습니다. 잘못된 ${err.path}`
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key error (MongoDB에서 고유 인덱스 위반)
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} 중복된 값이 이미 존재합니다.`
        err = new ErrorHandler(message, 400);
    }

    // JsonWebTokenError: 유효하지 않은 토큰 오류 처리
    if (err.name === "JsonWebTokenError") {
        const message = "유효하지 않은 토큰입니다."
        err = new ErrorHandler(message, 400);
    }

    // TokenExpiredError: 토큰 만료 오류 처리
    if (err.name === "TokenExpiredError") {
        const message = '토큰이 만료되었습니다.'
        err = new ErrorHandler(message, 400);
    }

    // 클라이언트에게 오류 응답 전송
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}
