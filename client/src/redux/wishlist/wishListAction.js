import { createAsyncThunk } from "@reduxjs/toolkit";

// 위시 리스트 추가
export const addToWishList = createAsyncThunk(
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

        localStorage.setItem("wishListItem", JSON.stringify(updatedWishList));

        return {
          wishList: updatedWishList,
        };
      }
    } catch (error) {
      throw error;
    }
  }
);


// 위시 리스트 삭제 
export const removeFromWishList = createAsyncThunk(
    "wishList/removeFromWishList",
    async ( data, { getState }) => {
        try {
            const filteredWishList = getState().wishList.wishList.filter(
                (item) => item._id !== data._id
            );

            localStorage.setItem("wishListItem", JSON.stringify(filteredWishList));

            return {
                wishList : filteredWishList,
            }

        } catch (error) {
            throw error;
        }
    }
)
