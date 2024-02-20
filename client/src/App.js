import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser, clearErrors } from "./redux/user/userAction";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import ProductsPage from "./pages/ProductsPage";
import BestSellingPage from "./pages/BestSellingPage";
import FAQPage from "./pages/FAQPage";
import { useSelector } from "react-redux";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import CheckoutPage from "./pages/CheckoutPage";
import ShopCreatePage from "./pages/Shop/ShopCreate";
import { loadSeller } from "./redux/seller/sellerAction";
import { getAllProductsShop , createProduct } from "./redux/product/productAction";
import SellerActivationPage from "./pages/SellerActivationPage";
import ShopLoginPage from "./pages/Shop/ShopLoginPage";
import SellerProtectedRoute from "./Routes/SellerProtectedRoute";
import ShopHomePage from "./pages/Shop/ShopHomePage";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage";
import ShopCreateProduct from "./pages/Shop/ShopCreateProduct";

const App = () => {
  
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProductsShop());
    Store.dispatch(createProduct());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* 샵 라우터 */}
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
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
    </>
  );
};

export default App;
