import { addToWishList, removeFromWishList } from "../../redux/wishList/wishListAction";
import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name : "wishList",
    initialState : {
        wishList : localStorage.getItem("wishListItem") ? JSON.parse(localStorage.getItem("wishListItem")) : [] , error : null,
    },

    extraReducers : (builder) => {
        builder
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.wishList = action.payload.wishList;
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.error = action.error.message;
            })

            // 위시리스트 삭제 
            .addCase(removeFromWishList.fulfilled, (state, action) => {
                state.wishList = action.payload.wishList;
            })
            .addCase(removeFromWishList.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }

});

export default wishListSlice.reducer;