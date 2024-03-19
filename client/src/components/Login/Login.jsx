import React, { useState, useEffect, useRef  } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/styles.js";
import axios from "axios";
import KakaoLogin from "../Auth/KakaoLogin.jsx";
import GoogleLoginButton from "../Auth/GoogleLoginButton.jsx";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const loginRef = useRef(null); // useRef로 ref 생성


  useEffect(() => {
    // 페이지에 들어왔을 때 로그인 컴포넌트로 스크롤 이동
    loginRef.current.scrollIntoView({ behavior: "smooth" }); // ref로 해당 컴포넌트로 스크롤 이동
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        process.env.REACT_APP_BACKEND_URL +`/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        window.location.replace("/");
        toast.success("로그인 성공!");
        // navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div ref={loginRef} className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  아이디
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  비밀번호
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              {/* <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-50 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href=".forgot-password"
                    className="font-medium yellow-600 hover:text-yellow-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div> */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 mt-12"
                >
                  로그인
                </button>
              </div>
              {/* <div className={`${styles.noramlFlex} w-full`}>
                    <h4>홈으로 돌아가기</h4>
                    <Link to="/" className="text-yellow-600 pl-2">
                    홈으로
                    </Link>
                  </div> */}
            </form>
                  <KakaoLogin />
                  <GoogleLoginButton  />
                  <div className={`${styles.noramlFlex} w-full`}>
                        <h4>회원이 아니십니까?</h4>
                        <Link to="/sign-up" className="text-yellow-600 pl-2">
                            회원가입
                        </Link>
                  </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
