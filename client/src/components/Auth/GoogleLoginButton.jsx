import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${process.env.REACT_APP_BASE_URL}/authGoogle`
    );
    const scope = encodeURIComponent("email profile"); // 프로필 정보와 이메일을 요청한다는 뜻
    const responseType = "code";

    try {
      let url = "https://accounts.google.com/o/oauth2/v2/auth";
      url += `?client_id=${clientId}`;
      url += `&redirect_uri=${redirectUri}`;
      url += `&response_type=${responseType}`;
      url += `&scope=${scope}`;

      console.log(url)
      window.location.href = url;
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };


  return (
    <>
      <div className="row ">
      <button className="mt-5" onClick={handleGoogleLogin}>
        <img
          className="text-center"
          src={process.env.REACT_APP_BACKEND + `/images/google_login.png`}
          id="google-login"
          width="400px"
        />
      </button>
      </div>
    </>
  );
};

export default GoogleLoginButton;