const { connect } = require("mongoose");
const app = require("./index")
const dotenv = require('dotenv');
const connectDatabase = require("./db/Database");


// 알수없는 에러 
process.on("uncaughtException", (error) => {
    console.log(`ERROR :${error.message}`);
    console.log(`서버 다운, 알수없는 오류`)
});


// config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    const result = dotenv.config({
        path: './config/.env'
    });

    if (result.error) {
        throw result.error; // .env 파일을 로드하는 동안 에러가 발생하면 에러를 던집니다.
    }
}

// DB 연결
connectDatabase();



const server = app.listen(process.env.PORT, () => {
    console.log(`서버 실행 포트번호: ${process.env.PORT}`);
});


process.on("unhandledRejection", (error)=>{
    console.log(`서버가 다운 ${error.message}`)
    console.log('')

    server.close(()=>{
        process.exit(1)
    })
})