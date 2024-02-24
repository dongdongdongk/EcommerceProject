import { addToCart, removeFromCart } from "./cartAction";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [] ,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 카트에 상품 추가
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload.cart;  // 업데이트된 카트 정보로 상태 갱신
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.error.message;  // 에러 발생 시 에러 메시지 저장
            })
            
            // 카트에서 상품 제거
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload.cart;  // 업데이트된 카트 정보로 상태 갱신
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.error.message;  // 에러 발생 시 에러 메시지 저장
            });
    },
});

export default cartSlice.reducer;