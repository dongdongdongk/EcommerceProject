import { createAsyncThunk } from "@reduxjs/toolkit";

// 위시 리스트 추가
export const addWishList = createAsyncThunk(
  "whishList/addWishList",
  async (newForm, { getState }) => {
    try {
      const currentState = getState();

      const existingWishList = currentState.wishList.wishList;

      const item = newForm;

      const isItemExist = existingWishList.find((i) => i._id === item._id);

      if (isItemExist) {
        const updatedWishList = existingWishList.map((i) =>
          i._id === isItemExist._id ? item : i
        );
        return {
          wishList: updatedWishList,
        };
      } else {
        const updatedWishList = [...existingWishList, item];

        localStorage.setItem("wishList", JSON.stringify(updatedWishList));

        return {
          wishList: updatedWishList,
        };
      }
    } catch (error) {
      throw error;
    }
  }
);
