import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "lottie-react";
import SUCCESS from "../Lottie/SUCCESS.json";


const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  return (
    <div className="auth-banner flex flex-col items-center justify-center">
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        <Lottie
                animationData={SUCCESS}
                style={{ width: "300px", height: "300px" }}
                loop={false}
              />
        상품 주문 성공!!! 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;