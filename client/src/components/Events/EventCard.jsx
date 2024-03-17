import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cartAction";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("상품이 이미 장바구니에 존재합니다!");
    } else {
      if (data.stock < 1) {
        toast.error("제품 재고를 초과하였습니다!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("상품을 장바구니에 추가하였습니다!");
      }
    }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src={process.env.REACT_APP_BACKEND + `/${data?.images[0]}`}
          alt=""
          className={data?.status === "end" ? "grayscale filter blur-sm" : ""}
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        {/* <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2> */}
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out} 판매
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          {data?.status !== "end" ? (
            <Link to={`/product/${data?._id}?isEvent=true`}>
              <div className={`${styles.button} text-[#fff]`}>상세 보기</div>
            </Link>
          ) : (
            <div
              className={`${styles.button} text-[#fff] opacity-50 cursor-not-allowed`}
            >
              상세 보기
            </div>
          )}
          <div
            className={`${styles.button} text-[#fff] ml-5 ${
              data?.status === "end" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              data?.status !== "end" ? addToCartHandler(data) : null
            }
          >
            장바구니에 추가
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
