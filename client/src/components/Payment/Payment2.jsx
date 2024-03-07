import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Payment2 = (effect, deps) => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
    setShippingAddress(shippingAddress)
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp38821552"); // 결제 데이터 정의
    const data = {
      pg: "kakaopay", // PG사 (필수항목)
      pay_method: "card", // 결제수단 (필수항목)
      merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
      name: "퀵딜 마켓 상품결제", // 주문명 (필수항목)
      amount: orderData?.subTotalPrice, // 금액 (필수항목)
      custom_data: { name: "부가정보", desc: "세부 부가정보" },
      buyer_name: user.name, // 구매자 이름
      buyer_tel: "01080055113", // 구매자 전화번호 (필수항목)
      buyer_email: user.email, // 구매자 이메일
      buyer_addr: shippingAddress?.address1,
      buyer_postalcode: shippingAddress?.zipCode,
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;
    if (success) {
      toast.success("상품결제를 성공하였습니다!")
      navigate("/");
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
};

export default Payment2;