import { createSlice } from "@reduxjs/toolkit";
import { loadSeller, clearErrors } from "./sellerAction";

const userSlice = createSlice({
  name: 'seller',
  initialState: {
    isSeller: false,
    loading: false,
    error: null,
    seller : null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSeller.pending, (state) => {
        state.loading = false;
      })
      .addCase(loadSeller.fulfilled, (state, action) => {
        state.isSeller = true;
        state.loading = true;
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