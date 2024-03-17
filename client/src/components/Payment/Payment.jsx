import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../styles/styles";
import KakaoPayment from "./KakaoPayment";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
    setShippingAddress(shippingAddress);
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8 bg-white p-5 rounded-md">
          
          <KakaoPayment /> <h4 className="mt-4 font-bold">카카오 페이로 결제하기</h4>
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = () => {
  const [orderData, setOrderData] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
    setShippingAddress(shippingAddress);
  }, []);

  const paymentHandler = (e) => {
    e.preventDefault();
    navigate("/order/success/fdbxf9848");
  };

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <CartData orderData={orderData}/>
    </div>
  );
};
const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  console.log(shipping);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">소계:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.subTotalPrice} 원</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">배송비:</h3>
        <h5 className="text-[18px] font-[600]">{Math.floor(shipping)} 원</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">할인:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? "원" + orderData.discountPrice : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        {Math.floor(orderData?.totalPrice)} 원
      </h5>
      <br />
    </div>
  );
};

export default Payment;
