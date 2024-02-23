// Redux Toolkit을 사용하여 동기 액션들을 처리하는 슬라이스 및 리듀서 생성

import { createSlice } from "@reduxjs/toolkit";
import { createProduct,getAllProductsShop,deleteProduct, getAllProducts } from "./productAction"
// 슬라이스 생성
const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: true,
    product: null,
    success: false,
    products: [],
    message: null,
    allProducts: [],
    error: null,
  },
  // 리듀서 및 비동기 액션 핸들링
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // createProduct 비동기 액션 핸들링
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.success = false;
      })
      // getAllProductsShop 비동기 액션 핸들링
      .addCase(getAllProductsShop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProductsShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // getAllProducts 
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) =>{
        state.isLoading = false
        state.error = action.error.message
      })
  },
});

export const { clearErrors } = productSlice.actions;

export default productSlice.reducer;
