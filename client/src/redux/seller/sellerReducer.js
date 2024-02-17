import { createSlice } from "@reduxjs/toolkit";
import { loadSeller, clearErrors } from "./sellerAction";

const userSlice = createSlice({
  name: 'seller',
  initialState: {
    loading: true,
    isSeller: false,
    seller: null,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadSeller.fulfilled, (state, action) => {
        // console.log("Fulfilled", action.payload);
        state.isSeller = true;
        state.loading = false;
        state.seller = action.payload;
      })
      .addCase(loadSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSeller = false;
      })
      .addCase(clearErrors.fulfilled, (state) => {
        state.error = null;
      });
  },
});

export default userSlice.reducer;