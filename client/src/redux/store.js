import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./user/userReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});


export default Store;
