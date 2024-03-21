import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import SUCCESS from "../Lottie/SUCCESS.json";
import FAIL from "../Lottie/FAIL.json";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(process.env.REACT_APP_BACKEND_URL + `/shop/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <div className="auth-banner flex flex-col items-center justify-center">
          <h5 className="text-center mb-14 text-[25px] text-[#000000a1] justify-center">
            <div className="flex flex-col items-center">
              <Lottie
                animationData={FAIL}
                style={{ width: "300px", height: "300px" }}
                loop={false}
                className="flex flex-col items-center"
              />
            </div>
            계정 인증에 실패하였습니다!!! 😫
          </h5>
          <br />
          <br />
        </div>
      ) : (
        <div className="auth-banner flex flex-col items-center justify-center">
          <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
            <div className="flex flex-col items-center">
              <Lottie
                animationData={SUCCESS}
                style={{ width: "300px", height: "300px" }}
                loop={false}
              />
            </div>
            계정이 성공적으로 인증되었습니다!!! 😍
          </h5>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default SellerActivationPage;
