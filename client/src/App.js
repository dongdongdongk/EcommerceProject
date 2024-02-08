import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";

const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

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
