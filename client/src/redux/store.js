import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./user/userReducer";
import sellerReducer from "./seller/sellerReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller : sellerReducer,
  },
});


export default Store;
