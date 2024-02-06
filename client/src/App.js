import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const App = () => {

  useEffect(() => {
    axios.get('http://localhost:5000/api/v2/user/getuser',{withCredentials:true}).then((res) => {
      toast.success("로그인 성공!")
    })
    .catch((err) =>{
      toast.error("로그인 실패!");
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/sign-up" element={<SignupPage/>} />
        <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
      </Routes>
      <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
    </BrowserRouter>
  );
};

export default App;
