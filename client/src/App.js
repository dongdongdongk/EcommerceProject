import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loadUser, clearErrors } from "./redux/user/userAction";
import { loadSeller } from "./redux/seller/sellerAction";
import {
  getAllProductsShop,
  getAllProducts,
} from "./redux/product/productAction";
import { getAllEvents } from "./redux/event/eventAction";
import Store from "./redux/store";
import HomePage from "./pages/HomePage";
import SellerProtectedRoute from "./Routes/SellerProtectedRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Loader from "./components/Layout/Loader";
import AuthCallback from "./components/Auth/AuthCallback";
import AuthGoogleCallback from "./components/Auth/AuthGoogleCallback";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import ActivationPage from "./pages/ActivationPage";
// import HomePage from "./pages/HomePage";
// import EventsPage from "./pages/EventsPage";
// import ProductsPage from "./pages/ProductsPage";
// import BestSellingPage from "./pages/BestSellingPage";
// import FAQPage from "./pages/FAQPage";
// import ProductDetailsPage from "./pages/ProductDetailsPage";
// import ProfilePage from "./pages/ProfilePage";
// import CheckoutPage from "./pages/CheckoutPage";
// import ShopCreatePage from "./pages/Shop/ShopCreate";
// import SellerActivationPage from "./pages/SellerActivationPage";
// import ShopLoginPage from "./pages/Shop/ShopLoginPage";
// import ShopHomePage from "./pages/Shop/ShopHomePage";
// import ShopDashboardPage from "./pages/Shop/ShopDashboardPage";
// import ShopCreateProduct from "./pages/Shop/ShopCreateProduct";
// import ShopAllProducts from "./pages/Shop/ShopAllProducts";
// import ShopCreateEvents from "./pages/Shop/ShopCreateEvents";
// import ShopAllEvents from "./pages/Shop/ShopAllEvents";
// import ShopAllCoupons from "./pages/Shop/ShopAllCoupons";
// import PaymentPage from "./pages/PaymentPage";
// import OrderSuccessPage from "./pages/OrderSuccessPage";
// import ShopAllOrders from "./pages/Shop/ShopAllOrders";
// import ShopOrderDetails from "./pages/Shop/ShopOrderDetails";
// import OrderDetailsPage from "./pages/OrderDetailsPage";
// import TrackOrderPage from "./pages/TrackOrderPage";
// import ShopAllRefunds from "./pages/Shop/ShopAllRefunds";
// import ShopSettingsPage from "./pages/Shop/ShopSettingsPage";
// import ShopWithDrawMoneyPage from "./pages/Shop/ShopWithdrawMoney";
// import ShopInboxPage from "./pages/Shop/ShopInboxPage";
// import UserInbox from "./components/UserInbox";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ActivationPage = lazy(() => import("./pages/ActivationPage"));
// const HomePage = lazy(() => import("./pages/HomePage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const BestSellingPage = lazy(() => import("./pages/BestSellingPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ShopCreatePage = lazy(() => import("./pages/Shop/ShopCreate"));
const SellerActivationPage = lazy(() => import("./pages/SellerActivationPage"));
const ShopLoginPage = lazy(() => import("./pages/Shop/ShopLoginPage"));
const ShopHomePage = lazy(() => import("./pages/Shop/ShopHomePage"));
const ShopDashboardPage = lazy(() => import("./pages/Shop/ShopDashboardPage"));
const ShopCreateProduct = lazy(() => import("./pages/Shop/ShopCreateProduct"));
const ShopAllProducts = lazy(() => import("./pages/Shop/ShopAllProducts"));
const ShopCreateEvents = lazy(() => import("./pages/Shop/ShopCreateEvents"));
const ShopAllEvents = lazy(() => import("./pages/Shop/ShopAllEvents"));
const ShopAllCoupons = lazy(() => import("./pages/Shop/ShopAllCoupons"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const ShopAllOrders = lazy(() => import("./pages/Shop/ShopAllOrders"));
const ShopOrderDetails = lazy(() => import("./pages/Shop/ShopOrderDetails"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const TrackOrderPage = lazy(() => import("./pages/TrackOrderPage"));
const ShopAllRefunds = lazy(() => import("./pages/Shop/ShopAllRefunds"));
const ShopSettingsPage = lazy(() => import("./pages/Shop/ShopSettingsPage"));
const ShopWithDrawMoneyPage = lazy(() =>
  import("./pages/Shop/ShopWithdrawMoney")
);
const ShopInboxPage = lazy(() => import("./pages/Shop/ShopInboxPage"));
const UserInbox = lazy(() => import("./components/UserInbox"));

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);

  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div><Loader /></div>}>
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
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* 샵 라우터 */}
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
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
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <UserInbox />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthCallback />} />
          <Route path='/authGoogle' element={<AuthGoogleCallback/>}/>
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
        </Routes>
        </Suspense>
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
