import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Hero = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL +`/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.replace("/login");
        //   navigate("/login");
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };


  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(${process.env.REACT_APP_BACKEND}/images/HeroImage.jpg)`, // process.env.REACT_APP_BACKEND 변수를 사용합니다.
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          당신만을 위한 특별한. <br /> 할인과 혜택이 가득한 종합 쇼핑몰
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba] tracking-wider leading-snug">
          우리 쇼핑몰은 당신의 쇼핑을 더 특별하게 만들어줄 다양한 혜택과 할인이
          가득합니다.
          <br />
          최신 트렌드를 반영한 다양한 제품들로 여러분의 스타일에 맞는 아이템을
          찾아보세요.
          <br /> 뷰티 제품부터 가전제품까지, 모든 카테고리에서 풍성한 제품
          라인업을 제공하고 있습니다.
          <br /> 회원 전용 할인, 무료 배송 등 다양한 이벤트로 여러분을 기다리고
          있습니다.
          <br /> 우리 쇼핑몰은 항상 여러분의 특별한 순간을 책임집니다. 지금 바로
          쇼핑의 즐거움을 경험해보세요!
        </p>
        {isAuthenticated ? (
          <button onClick={logoutHandler} className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              로그아웃
            </span>
          </button>
        ) : (
          <Link to="/login" className="inline-block">
            <div className={`${styles.button} mt-5`}>
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                회원 로그인
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
