import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./user/userReducer";
import sellerReducer from "./seller/sellerReducer";
import productReducer from "./product/productReducer";
import eventReducer from "./event/eventReducer";
import cartReducer from "./cart/cartReducer";
import wishListReducer from "./wishList/wishListReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller : sellerReducer,
    product : productReducer,
    event : eventReducer,
    cart : cartReducer,
    wishList : wishListReducer
  },
});


export default Store;
