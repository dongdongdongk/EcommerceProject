import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(http://localhost:5000/images/HeroImage.jpg)`, // 이미지 URL을 바로 넣어줍니다.
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          당신만을 위한 특별한. <br />  할인과 혜택이 가득한 종합 쇼핑몰
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          우리 쇼핑몰은 당신의 쇼핑을 더 특별하게 만들어줄 다양한 혜택과 할인이 가득합니다. 
          <br />최신 트렌드를 반영한 다양한 제품들로 여러분의 스타일에 맞는 아이템을 찾아보세요.
          <br /> 뷰티 제품부터 가전제품까지, 모든 카테고리에서 풍성한 제품 라인업을 제공하고 있습니다.
          <br /> 회원 전용 할인, 무료 배송 등 다양한 이벤트로 여러분을 기다리고 있어요. 
          <br /> 우리 쇼핑몰은 항상 여러분의 특별한 순간을 책임집니다. 지금 바로 쇼핑의 즐거움을 경험해보세요!
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    지금 쇼핑하기
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;