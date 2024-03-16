import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL +`/user/activation`, {
          activation_token,
        });
        console.log("이거 맞나??", response);
      } catch (err) {
        setError(true);
      }
    };
  
    if (activation_token) {
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
        <p>토큰이 만료 되었습니다!</p>
      ) : (
        <p>계정이 성공적으로 생성되었습니다!</p>
      )}
    </div>
  );
};

export default ActivationPage;