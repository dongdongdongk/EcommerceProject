import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import axios from "axios";

const AuthCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authorizationCode = urlParams.get("code");

    const sendDataToServer = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + `/auth/kakao`,
          { code: authorizationCode },
          { withCredentials: true }
        );
        console.log("받아온 유저 정보", response.data);
        toast.success("로그인 성공!");
        window.location.replace("/");
      } catch (error) {
        console.error(error);
      }
    };

    sendDataToServer(); // 함수 호출하여 서버로 데이터 전송
  }, [location.search]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default AuthCallback;
