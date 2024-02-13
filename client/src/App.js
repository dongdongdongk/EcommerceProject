import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Store from "./redux/store";
import { loadUser, clearErrors } from "./redux/user/userAction";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import ProductsPage from "./pages/ProductsPage";
import BestSellingPage from "./pages/BestSellingPage";
import FAQPage from "./pages/FAQPage";
import { useSelector } from "react-redux";

const App = () => {
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(loadUser());
    // Store.dispatch(clearErrors());
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50vh" }}>로딩 중...</div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/faq" element={<FAQPage />} />
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
      )}
    </>
  );
};

export default App;
