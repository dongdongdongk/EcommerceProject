import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./user/userReducer";
import sellerReducer from "./seller/sellerReducer";
import productReducer from "./product/productReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller : sellerReducer,
    product : productReducer
  },
});


export default Store;
