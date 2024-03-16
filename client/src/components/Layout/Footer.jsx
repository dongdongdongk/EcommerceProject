import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import styles from "../../styles/styles";

const Footer = () => {
  return (
    <div className="bg-[#fff] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#e3bb8b] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
           뉴스, 이벤트 및{" "}
          <br />
          <span className="text-[#000000]">특별 혜택</span>{" "}을 받으려면 구독하세요.
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="이메일을 입력하세요..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className={`${styles.button}bg-[#000000] hover:bg-zinc-600 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full`}>
            구독
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center text-gray-500">
          <img
            src={`http://localhost:5000/images/MainFix.png`}
            alt=""
            style={{width:"180px", objectFit:"contain"}}
          />
          <br />
          <p>최신 트렌드와 다양한 상품으로 여러분을 기다립니다.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer text-gray-400" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
              className="text-gray-400"
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
              className="text-gray-400"
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
              className="text-gray-400"
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-gray-500">Company</h1>
          {footerProductLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-gray-500">Shop</h1>
          {footercompanyLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-gray-500">Support</h1>
          {footerSupportLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2020 Becodemy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;