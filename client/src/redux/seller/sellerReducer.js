import { createSlice } from "@reduxjs/toolkit";
import { loadSeller, clearErrors } from "./sellerAction";

const userSlice = createSlice({
  name: 'seller',
  initialState: {
    isSeller: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSeller.pending, (state) => {
        state.loading = false;
      })
      .addCase(loadSeller.fulfilled, (state, action) => {
        state.isSeller = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearErrors.fulfilled, (state) => {
        state.error = null;
      });
  },
});

export default userSlice.reducer;