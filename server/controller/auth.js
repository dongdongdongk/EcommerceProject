const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../model/user");
const sendToken = require("../util/jwtToken");

// 카카오 토큰 요청 및 사용자 정보 조회 핸들러
router.post("/kakao", async (req, res, next) => {
  const { code } = req.body; // 프론트엔드에서 받은 인가 코드
  const restApiKey = "965a71a94f58405c10e1712ce59b83bd"; // 카카오 앱의 REST API 키

  const data = {
    grant_type: "authorization_code",
    client_id: restApiKey,
    code,
  };

  // 헤더 설정
  const header = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    Authorization: "Bearer ",
  };

  // grant_type=authorization_code&client_id=your_client_id&code=authorization_code_here
  // 위와 같이 문자열 형태로 구성하기 위해
  const queryString = Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

  try {
    const kakaoToken = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryString,
      { headers: header }
    );

    // 카카오 토큰을 사용하여 사용자 정보 조회
    const getUserInfo = async (accessToken) => {
      const header = {
        Authorization: `Bearer ${accessToken}`,
      };

      const get = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: header,
      });
      const result = get.data;
      console.log("카카오 사용자 정보 결과", result);

      return {
        id: result.id,
        nickname: result.kakao_account.profile.nickname,
        email: result.kakao_account.email,
        avatar: result.kakao_account.profile.profile_image_url,
      };
    };

    // 임시 비밀번호 생성 함수
    function generateRandomPassword() {
      const length = 10; // 비밀번호 길이
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 사용할 문자셋
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    }

    // 토큰 정보와 사용자 정보를 합쳐서 클라이언트에게 응답
    const userInfo = await getUserInfo(kakaoToken.data.access_token);

    // 사용자 이메일을 통해 데이터베이스에서 사용자 조회
    let user = await User.findOne({ email: userInfo.email });

    // 사용자가 데이터베이스에 존재하지 않으면 새로운 사용자로 저장
    if (!user) {
      user = new User({
        name: userInfo.nickname,
        email: userInfo.email,
        password: generateRandomPassword(),
      });
      await user.save();
    }

    // 클라이언트에게 응답 ( 토큰 발급해주기 )
    sendToken(user, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" }); // 에러 발생 시 클라이언트에게 에러 전송
  }
});

module.exports = router;
