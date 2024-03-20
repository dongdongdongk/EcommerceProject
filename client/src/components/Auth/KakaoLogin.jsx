const KakaoLogin = () => {
  const Rest_api_key = "965a71a94f58405c10e1712ce59b83bd"; //REST API KEY
  const redirect_uri = process.env.REACT_APP_BASE_URL + "/auth"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <div className="row">
      <button className="mt-5" onClick={handleLogin}>
        <img
          className="text-center"
          src={process.env.REACT_APP_BACKEND + `/images/kakao_login.png`}
          id="kakao-login-btn"
          width="500px"
        />
      </button>
      </div>
    </>
  );
};

export default KakaoLogin;

