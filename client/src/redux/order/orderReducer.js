import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrdersOfUser,
  getAllOrdersOfShop,
  getAllOrdersOfAdmin,
} from "./orderAction";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: true,
    orders: [],
    adminOrderLoading: true,
    adminOrders: [],
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // get all orders of user
    builder
      .addCase(getAllOrdersOfUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get all orders of shop
      .addCase(getAllOrdersOfShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersOfShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // get all orders for admin
      .addCase(getAllOrdersOfAdmin.pending, (state) => {
        state.adminOrderLoading = true;
      })
      .addCase(getAllOrdersOfAdmin.fulfilled, (state, action) => {
        state.adminOrderLoading = false;
        state.adminOrders = action.payload;
      })
      .addCase(getAllOrdersOfAdmin.rejected, (state, action) => {
        state.adminOrderLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = orderSlice.actions;

export default orderSlice.reducer;
