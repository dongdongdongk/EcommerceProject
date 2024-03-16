import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all orders of user
export const getAllOrdersOfUser = createAsyncThunk(
  "order/getAllOrdersOfUser",
  async (userId) => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL +`/order/get-all-orders/${userId}`);
      return data.orders;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

// get all orders of seller
export const getAllOrdersOfShop = createAsyncThunk(
  "order/getAllOrdersOfShop",
  async (shopId) => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL +`/order/get-seller-all-orders/${shopId}`);
      return data.orders;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

// get all orders of Admin
export const getAllOrdersOfAdmin = createAsyncThunk(
  "order/getAllOrdersOfAdmin",
  async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL +`/order/admin-all-orders`, {
        withCredentials: true,
      });
      return data.orders;
    } catch (error) {
      return error.response.data.message;
    }
  }
);