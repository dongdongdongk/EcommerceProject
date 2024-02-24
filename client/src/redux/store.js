import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./user/userReducer";
import sellerReducer from "./seller/sellerReducer";
import productReducer from "./product/productReducer";
import eventReducer from "./event/eventReducer";
import cartReducer from "./cart/cartReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller : sellerReducer,
    product : productReducer,
    event : eventReducer,
    cart : cartReducer,
  },
});


export default Store;
